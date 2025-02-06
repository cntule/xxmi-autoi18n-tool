const prettier = require("../../core/prettier/index.js");
const fs = require("fs");
const path = require("path");
const treeAdapter = require("parse5-htmlparser2-tree-adapter");
const baseUtils = require("../../core/utils/baseUtils");

const filePath = path.join(__dirname, "./HelloWorld.vue");
const filePath2 = path.join(__dirname, "./HelloWorld-new.vue");

let code = fs.readFileSync(filePath, { encoding: "utf-8" });


function handleAst(ast) {
  function modifyTextNodes(node) {
    if (node.children && node.children.length) {
      node.children.forEach((child) => {
        if (child.type === "text") {
          if (baseUtils.isChinese(child.value)) {
            child.value = `i18n.tc('${child.value.trim()}')`
          }
        } else {
          modifyTextNodes(child);
        }
      });
    }
  }

  modifyTextNodes(ast);
}
const formatCode = (code) => {
  code = prettier.format(code, {
    handleAst:(ast,text)=>{
      handleAst(ast);
    },
    parser: "vue",
    singleQuote: true,
    quoteProps: "preserve", // 保留对象键的引号
    trailingComma: "es5",
    endOfLine: "lf",
    /**
     * HTML 空白敏感度
     * 结束标签中不换行
     * <template>
     *     ....
     * </template
     * >
     */
    htmlWhitespaceSensitivity: "ignore",
    // filepath: filePath,
  });
  return code;
};

 code = formatCode(code);

fs.writeFileSync(filePath2, code, { encoding: "utf-8" });