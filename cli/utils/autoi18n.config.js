module.exports = {
  /**
   * 需要国际化的语言种类
   */
  language: ["zh-cn", "en-us"],
  /**
   * 国际化资源文件应用的 模块模式 根据这个模式 使用 module.exports 或者 export default
   * 如果localeFileExt 配置为json时 此配置不起效
   */
  modules: "es6",
  /**
   * 需要国际化的目录
   */
  entry: ["./src"],
  /**
   * 国际化资源文件输出目录
   */
  localePath: "./src/locales",
  /**
   * 国际化文件类型 默认 为 .json文件 支持.js和.json
   */
  localeFileExt: ".json",
  /**
   * 需要处理国际化的文件后缀
   */
  extensions: [],
  /**
   * 需要排除国际化的文件 glob模式数组
   */
  exclude: [],
  /**
   * 要忽略做国际化的方法
   */
  ignoreMethods: ["i18n.t", "$t"],
  /**
   * 要忽略做标签属性
   */
  ignoreTagAttr: ["class", "style", "src", "href", "width", "height"],
  /**
   * 国际化对象方法，可以自定义使用方法返回 注意：如果改变国际化方法记得把该方法加到ignoreMethods忽略列表里面
   */
  i18nObjectMethod: "i18n.t",
  /**
   * 国际化方法简写模式，可以自定使用方法返回 注意：如果改变国际化方法记得把该方法加到ignoreMethods忽略列表里面
   */
  i18nMethod: "$t",
  /**
   * 如果不喜欢又臭又长的key 可以自定义国际化配置文件的key
   * 默认为 false 不自定义
   */
  setMessageKey: false,
  /**
   * 生成md5的key长度 true: 32位字符 false: 16位字符
   */
  maxLenKey: false,
  /**
   * 国际化要注入到js里面的实例 会在js文件第一行注入
   */
  i18nInstance: "import i18n from '@/i18n';",
  /**
   * 格式化文件配置
   */
  prettier: {
    singleQuote: true,
    trailingComma: "es5",
    endOfLine: "lf",
  },
  /**
   * 自定义astEnter节点处理函数
   * @param path ast 处理节点路径
   * @param node 当前节点
   * @param file 文件对象
   * @param filePath 当前文件路径
   * @param baseUtils 基础工具类
   * @return {boolean} true 跳过该节点及子节点的处理
   */
  astEnter({ path, node, file, filePath, baseUtils }) {
    // if (baseUtils.isPathEndsWith(filePath, "src/components/HelloWorld.vue")) {
    //   if (
    //       node.type === "ClassProperty" &&
    //       node.key.name === "ignoreConfigList"
    //   ) {
    //     return true;
    //   }
    // }
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
   * @param filePath 当前文件路径
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
    // if (baseUtils.isPathEndsWith(filePath,'src/components/HelloWorld.vue')) {
    //   if (keyName === 'prop' && valueValue === '美食之都') {
    //     return true;
    //   }
    // }
  },
  /**
   * 处理vue template时 prettier.format handleAst 会调用此函数
   * 1. 如果不想内部处理 ast,返回 true ,使用者拿到 ast 自行处理
   * @param ast vue template
   * @param file 当前文件信息
   * @param filePath 当前文件路径
   * @param baseUtils 工具类
   * @return {boolean} true 跳过该 ast 的处理
   */
  vueAst: ({ ast, file, filePath, baseUtils }) => {},
  /**
   * 遍历每一个节点
   * 1. 如果不想内部处理这个基点的 attrs ，返回true，使用者拿到 node 自行处理
   * @param node ast节点
   * @param file 当前文件信息
   * @param filePath 当前文件路径
   * @param baseUtils 工具类
   * @return {boolean} true 不处理节点的attrs
   */
  vueAstNode: ({ node, file, filePath, baseUtils }) => {},
  /**
   * 遍历element节点的每一个attr节点
   * @param node element 节点
   * @param attrNode 属性节点
   * @param file 当前文件信息
   * @param filePath 当前文件路径
   * @param baseUtils 工具类
   * @return {boolean} true 不处理attr节点
   */
  vueAstNodeAttr: ({ node, attrNode, file, filePath, baseUtils }) => {},
  /**
   * 遍历每一个 text 节点
   * @param node text 节点
   * @param file 当前文件信息
   * @param filePath 当前文件路径
   * @param baseUtils 工具类
   * @return {boolean} true 不处理 text 节点内容
   */
  vueAstNodeText: ({ node, file, filePath, baseUtils }) => {},
  translateLanguage: "en", // 翻译语言文件 en.json 里面内容
  translateLimit: 20, // 翻译数量并发限制
  translateOrderWords: 2, // 取词顺序
};
