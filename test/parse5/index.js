const prettier = require("prettier");
const fs = require("fs");
const path = require("path");
const parse5 = require("parse5");
const treeAdapter = require("parse5-htmlparser2-tree-adapter");
const baseUtils = require("../../core/utils/baseUtils");

const filePath = path.join(__dirname, "./HelloWorld.vue");
const filePath2 = path.join(__dirname, "./HelloWorld-new.vue");

let code = fs.readFileSync(filePath, { encoding: "utf-8" });

const matchTagContent = (code) => {
  const customTreeAdapter = {
    ...parse5.defaultTreeAdapter,
    // ...treeAdapter.adapter
  };
  console.log(treeAdapter);
  let index = 1000;
  let commentIndex = 0;
  const cache = {};

  code = code.replace(/<!--([\s\S]*?)-->/gm, (math) => {
    const key = `<plachodercomment${commentIndex++}>`;
    cache[key] = math;
    return key;
  });

  code = code.replace(
    /<\/?[^\s>]+(?:\s+[^\s=]+(?:(?::[^\s=]+)|=(?:"[^"]*"|'[^']*'|[^\s>]*)))*\s*\/?>/gm,
    (math, p1, p2, p3) => {
      let key = `<%%${index}%%start%%>`;
      let placeholder = key;
      if (index > 1000) {
        placeholder = `<%%${index - 1}%%end%%>${key}`;
      }
      cache[key] = math;
      index++;
      return placeholder;
    }
  );

  code = code.replace(
    /(<%%\d+%%start%%>)([\s\S]*?)(<%%\d+%%end%%>)/gm,
    (math, start, value, end) => {
      if (baseUtils.isChinese(value)) {
        return `${start}i18n.tc('${value.trim()}')${end}`;
      }
      return math;
    }
  );

  code = code.replace(/(<%%(\d+)%%(start|end)%%>)/gm, (math, p1, p2) => {
    return cache[math] || "";
  });

  code = code.replace(/<plachodercomment(\d+)>/gm, (math, p1, p2) => {
    return cache[math] || "";
  });

  console.log(code);
  return code;
};
code = matchTagContent(code);

code = prettier.format(code, {
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
  filepath: filePath,
});
fs.writeFileSync(filePath2, code, { encoding: "utf-8" });
