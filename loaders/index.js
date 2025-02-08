// const loaderUtils = require("loader-utils");
const path = require("path");
const micromatch = require("micromatch");
const mergeIi8nConfig = require("../cli/utils/mergeIi8nConfig");
const { transform } = require("../core/index");
const baseUtils = require("../core/utils/baseUtils");
let messages = {};

module.exports = function (source) {
  // const options = loaderUtils.getOptions(this);
  const configOptions = mergeIi8nConfig();
  const exclude = [
    ...(configOptions.exclude || []),
    `${configOptions.localePath}/**/*.{js,ts,json}`,
    "**/node_modules/**",
  ].map((item) => {
    return baseUtils.normalizePath(path.resolve(process.cwd(), item));
  });
  let resourcePath = this.resourcePath; // 当前文件路径
  let targetFile = {
    ext: path.extname(resourcePath),
    filePath: resourcePath,
  };
  const normalizeResourcePath = baseUtils.normalizePath(resourcePath);
  if (!micromatch.isMatch(normalizeResourcePath, exclude)) {
    source = transform({
      code: source,
      targetFile,
      options: configOptions,
      messages,
    });
  }
  messages = {};
  return source;
};
