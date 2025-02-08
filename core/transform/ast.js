const babel = require("@babel/core");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const presetTypescript = require("@babel/preset-typescript").default;
const t = require("@babel/types");
const _ = require("lodash");

const pluginSyntaxJSX = require("@babel/plugin-syntax-jsx");
const pluginSyntaxProposalOptionalChaining = require("@babel/plugin-proposal-optional-chaining");
const pluginSyntaxClassProperties = require("@babel/plugin-syntax-class-properties");
const pluginSyntaxDecorators = require("@babel/plugin-syntax-decorators");
const pluginSyntaxObjectRestSpread = require("@babel/plugin-syntax-object-rest-spread");
const pluginSyntaxAsyncGenerators = require("@babel/plugin-syntax-async-generators");
const pluginSyntaxDoExpressions = require("@babel/plugin-syntax-do-expressions");
const pluginSyntaxDynamicImport = require("@babel/plugin-syntax-dynamic-import");
const pluginSyntaxExportExtensions = require("@babel/plugin-syntax-export-extensions");
const pluginSyntaxFunctionBind = require("@babel/plugin-syntax-function-bind");

const baseUtils = require("../utils/baseUtils");
const { replaceStatement } = require("./transform");
const log = require("../../cli/utils/log");

const makeNodeSkip = (item) => {
  traverse(
    item,
    {
      enter(path) {
        const { node } = path;
        node._skipI18n = true;
      },
    },
    item
  );
};

const checkSkip = (item) => {
  const leadingComments = _.get(item, "leadingComments", []);
  const hasSkipStart = leadingComments.some(
    (item) =>
      item.type === "CommentBlock" && item.value.includes("skip-i18n-start")
  );
  const hasLeadingSkipEnd = leadingComments.some(
    (item) =>
      item.type === "CommentBlock" && item.value.includes("skip-i18n-end")
  );
  const hasSkipNextLine = leadingComments.some(
    (item) =>
      item.type === "CommentLine" && item.value.includes("skip-i18n-next-line")
  );

  const trailingComments = _.get(item, "trailingComments", []);
  const hasSkipEnd = trailingComments.some(
    (item) =>
      item.type === "CommentBlock" && item.value.includes("skip-i18n-end")
  );
  return { hasSkipStart, hasLeadingSkipEnd, hasSkipNextLine, hasSkipEnd };
};

/**
 * 返回处理ast对象
 * @param {*}
 * @returns
 */
const makeVisitor = ({ options, messages, file, ext, codeType }) => {
  const astEnter = options.astEnter;
  const astObjectProperty = options.astObjectProperty;
  // 生成字符对象
  const StringLiteral = (value) => {
    return Object.assign(t.StringLiteral(value), {
      extra: { raw: `'${value}'`, rawValue: value },
    });
  };
  let isMakeSkip = false;
  // 返回处理ast的对象
  return {
    enter(path) {
      const { node } = path;
      const { hasSkipStart, hasSkipEnd, hasSkipNextLine, hasLeadingSkipEnd } =
        checkSkip(node);
      if (hasLeadingSkipEnd) {
        isMakeSkip = false;
      }
      // 节点前有 /*skip-i18n-start*/
      // 节点后有 /*skip-i18n-end*/
      if (hasSkipStart) {
        isMakeSkip = true;
      }
      if (isMakeSkip || hasSkipNextLine) {
        path.skip();
      }
      if (hasSkipEnd) {
        isMakeSkip = false;
      }
      if (
        astEnter &&
        astEnter({ path, node, file, filePath: file.filePath, baseUtils })
      ) {
        path.skip();
      }
    },
    /**
     *
     * @param path
     * @constructor
     */
    ObjectProperty(path) {
      const { node } = path;
      const { key, value } = node;
      key._skipI18n = true;
      const { hasSkipNextLine } = checkSkip(node);
      if (hasSkipNextLine) {
        path.skip();
      }
      // 处理对象属性
      if (
        astObjectProperty &&
        key.type === "Identifier" &&
        value.type === "StringLiteral"
      ) {
        if (
          astObjectProperty({
            path,
            node,
            key,
            value,
            keyName: key.name,
            valueValue: value.value,
            file,
            filePath: file.filePath,
            baseUtils,
          })
        ) {
          path.skip();
        }
      }
    },
    /**
     * 处理模板字符串
     * @param path
     */
    TemplateLiteral(path) {
      const { node } = path;
      // 字符串模板内容
      node.quasis = (node.quasis || []).map((item) => {
        if (item.type === "TemplateElement") {
          if (baseUtils.isChinese(item.value.raw)) {
            item.value.raw = `\${${replaceStatement({
              value: item.value.raw,
              options,
              messages,
              ext,
              codeType,
            })}}`;
          }
        }
        return item;
      });
      // 字符串模板占位符内容 占位符内容可以不用做处理
      node.expressions = (node.expressions || []).map((item) => {
        if (item.type === "StringLiteral") {
          if (baseUtils.isChinese(item.value)) {
            // item.extra.raw = `${item.value}`
          }
        }
        return item;
      });
    },
    /**
     * 处理字符串字面量
     * @param {*} path
     */
    StringLiteral(path) {
      const { node, parent } = path;
      if (!node._skipI18n && baseUtils.isChinese(node.value)) {
        switch (parent.type) {
          case "JSXAttribute":
            // 过滤掉这些属性不处理
            if (!options.ignoreTagAttr.includes(node.parent.name.name)) {
              node.extra.raw = replaceStatement({
                value: node.value,
                options,
                messages,
                ext,
                codeType,
              });
            }
            break;
          case "BinaryExpression":
          case "TSEnumMember":
            break;
          default:
            if (
              parent.type === "CallExpression" &&
              _.get(parent, "callee.object.name") === "console"
            ) {
              // 不处理console
            } else {
              node.extra.raw = replaceStatement({
                value: node.value,
                options,
                messages,
                ext,
                codeType,
              });
            }
            break;
        }
      }
      path.skip(); // 跳过子节点
    },
    /**
     * 处理 指令字符串字面量 'asdf'
     * @param {*} path
     */
    DirectiveLiteral(path) {
      const { node } = path;
      if (baseUtils.isChinese(node.value)) {
        node.extra.raw = replaceStatement({
          value: node.value,
          options,
          messages,
          ext,
          codeType,
        });
      }
    },
    /**
     * jsx 静态文本
     * @param {*} path
     */
    JSXText(path) {
      const { node } = path;
      if (baseUtils.isChinese(node.value)) {
        path.replaceWith(t.JSXExpressionContainer(StringLiteral(node.value)));
      }
      // path.skip() // 跳过子节点
    },
    /**
     * jsx 属性
     * @param {*} path
     */
    JSXAttribute(path) {
      const { node } = path;
      // 如果属性是静态属性
      if (node.value && node.value.type === "StringLiteral") {
        // 值是否包含中文
        if (baseUtils.isChinese(node.value.value)) {
          // 过滤特殊属性
          if (!options.ignoreTagAttr.includes(node.name.name)) {
            // 改为动态属性
            node.value = t.JSXExpressionContainer(
              StringLiteral(node.value.value)
            );
          }
        }
      }
      // path.skip() // 跳过子节点
    },

    ClassDeclaration(path) {
      //
    },

    Decorator(path) {
      const expression = path.get("expression");
      if (expression.isCallExpression()) {
        const callee = expression.get("callee");
        if (callee.isIdentifier({ name: "Component" })) {
          const argumentsPath = expression.get("arguments")[0];
          if (argumentsPath.isObjectExpression()) {
            for (const prop of argumentsPath.get("properties")) {
              try {
                if (prop.node.key.name === "i18n") {
                  prop.node.value.properties.forEach((p) => {
                    if (p.key.name === "messages") {
                      p.value.properties.forEach((p2) => {
                        p2.value.properties.forEach((p3) => {
                          p3.value._skipI18n = true;
                        });
                      });
                    }
                  });
                }
              } catch (e) {
                console.log("@Component error", e);
              }
            }
          }
        }
      }
    },
  };
};

module.exports = function ({
  code,
  file,
  options,
  messages,
  ext,
  codeType,
  lang = "js",
}) {
  // 生成ast配置
  const transformOptions = {
    sourceType: "module", // 是否使用模块解析文件
    ast: true, // 是否生成ast树
    configFile: false, // 是否应用babel配置文件配置
    presets:
      lang === "ts"
        ? [[presetTypescript, { isTSX: true, allExtensions: true }]]
        : [],
    comments: true,
    plugins: [
      pluginSyntaxJSX,
      pluginSyntaxProposalOptionalChaining,
      pluginSyntaxClassProperties,
      [pluginSyntaxDecorators, { decoratorsBeforeExport: true }],
      pluginSyntaxObjectRestSpread,
      pluginSyntaxAsyncGenerators,
      pluginSyntaxDoExpressions,
      pluginSyntaxDynamicImport,
      pluginSyntaxExportExtensions,
      pluginSyntaxFunctionBind,
    ],
  };
  // 生成ast树
  let ast = null;
  try {
    ast = babel.parseSync(code, transformOptions);
  } catch (error) {
    log.error(`文件${file.filePath} babel ast解析失败`);
    console.log(code);
  }

  // 返回转换对象
  const visitor = makeVisitor({ code, options, messages, file, ext, codeType });
  // 开始转换
  traverse(ast, visitor);
  // 转换完成生成新的代码
  const output = generate(
    ast,
    {
      compact: false,
      minified: false,
      retainFunctionParens: true,
      retainLines: true, // 保留行
      decoratorsBeforeExport: true, // 将true设置为在输出中导出之前打印装饰器
      jsescOption: {
        minimal: true, // 防止转为Unicode
      },
    },
    code
  );
  code = output.code.replace(/;*$/, ""); // 清空最后的分号
  return code;
};
