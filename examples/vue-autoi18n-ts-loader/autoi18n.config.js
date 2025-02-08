module.exports = {
  language: ["zh", "en"],
  modules: "es6",
  entry: ["./src/components"],
  localePath: "./src/locales",
  localeFileExt: ".json",
  extensions: [],
  exclude: [
    "./src/i18n/*.*",
    "./src/locales/*.{js,ts,json}",
    "./src/router/**",
    "./src/store/**",
    "./src/shims-*.*",
  ],
  ignoreMethods: ["i18n.t", "$t"],
  ignoreTagAttr: ["class", "style", "src", "href", "width", "height"],
  i18nObjectMethod: "i18n.t",
  i18nMethod: "$t",
  setMessageKey: false,
  i18nInstance: "import i18n from '@/i18n';",
  prettier: {
    singleQuote: true,
    quoteProps: "preserve", // 保留对象键的引号
    trailingComma: "es5",
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "ignore", // HTML 空白敏感度
  },
  /**
   * 自定义astEnter节点处理函数
   * @param path ast 处理节点路径
   * @param node 当前节点
   * @param file 文件对象
   * @param filePath 文件路径
   * @param baseUtils 基础工具类
   * @return {boolean} true 跳过该节点及子节点的处理
   */
  astEnter({ path, node, file, filePath, baseUtils }) {
    if (baseUtils.isPathEndsWith(filePath, "src/components/HelloWorld.vue")) {
      if (
        node.type === "ClassProperty" &&
        node.key.name === "ignoreConfigList"
      ) {
        return true;
      }
    }
  },
  /**
   * 自定义astObject属性节点处理函数
   * @param path ast 处理节点路径
   * @param node 当前节点
   * @param key 属性key
   * @param value 属性值
   * @param keyName 属性key值
   * @param valueValue 属性值值
   * @param file 文件对象
   * @param filePath 文件路径
   * @param baseUtils 基础工具类
   * @return {boolean} true 跳过该节点及子节点的处理
   */
  astObjectProperty: ({
    path,
    node,
    key,
    value,
    keyName,
    valueValue,
    file,
    filePath,
    baseUtils,
  }) => {
    if (baseUtils.isPathEndsWith(filePath, "src/components/HelloWorld.vue")) {
      if (keyName === "prop" && valueValue === "美食之都") {
        return true;
      }
    }
  },
  translateLanguage: "en",
  translateLimit: 20,
};
