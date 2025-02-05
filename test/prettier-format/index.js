const prettier = require("prettier");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./HelloWorld.vue");
const filePath2 = path.join(__dirname, "./HelloWorld-new.vue");

let code = fs.readFileSync(filePath, { encoding: "utf-8" });
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
