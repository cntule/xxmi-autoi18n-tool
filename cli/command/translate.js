const mergeIi8nConfig = require("../utils/mergeIi8nConfig");
const log = require("../utils/log");
const LocaleFile = require("../utils/localeFile");
const translate = require("../../core/utils/translate").translate;
const request = require("../../core/utils/translate").request;
const baseUtils = require("../../core/utils/baseUtils");
const _ = require("lodash");
const path = require("path");
const pLimit = require("p-limit");

async function query(key, value, options) {
  const order1 = options.translateOrderWords === 1;
  return new Promise((resolve) => {
    Promise.all([translate(value, options.sign), request(value)]).then(
      (posts) => {
        log.info(
          "---- 翻译中 ----------------------------------------------------------------"
        );
        log.info(`key: ${key}`);
        log.info(`value: ${value}`);
        const [r1, r2] = posts;
        const tran1 = r1 || r2 || "";
        const tran2 = r2 || r1 || "";
        const tran = order1 ? tran1 : tran2;
        const result = { key, value, tran };
        log.info(`tran: ${result.tran}`);
        resolve(result);
      }
    );
  });
}

async function run(translateMessages, options) {
  const startTime = Date.now();
  const limit = pLimit(options.translateLimit || 20);
  const promises = translateMessages.map((item) => {
    return limit(() => query(item.key, item.value, options));
  });

  return new Promise(async (resolve) => {
    const results = await Promise.all(promises);
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    resolve([[...results], duration]);
  });
}

/**
 * 同步国际化配置文件并替换为对应的国际化字段
 * @param {*} programOption 命令行参数
 */
module.exports = async function (programOption) {
  // 合并配置文件
  const options = mergeIi8nConfig(programOption);
  if (!options.translateLanguage && !programOption.file) {
    log.error("没有配置 translateLanguage 或者 传入翻译文件");
    process.exit(2);
  }

  // 创建生成国际化文件对象
  const localeFile = new LocaleFile(options.localePath);
  let messages = {};
  let translateFilePath = "";
  if (options.translateLanguage) {
    translateFilePath = localeFile.getConfigFilePath(
      options.translateLanguage,
      options,
      programOption.file
    );
    messages = localeFile.getConf(
      options.translateLanguage,
      options,
      programOption.file
    );
  } else {
    translateFilePath = localeFile.getConfigFilePath(
      "",
      options,
      programOption.file
    );
    messages = localeFile.getConf("", options, programOption.file);
  }
  let translateFileName = path.basename(
    translateFilePath,
    path.extname(translateFilePath)
  );

  const translateMessages = [];
  for (const [key, value] of Object.entries(messages)) {
    if (baseUtils.isChinese(value)) {
      translateMessages.push({ key, value });
    }
  }

  if (translateMessages.length <= 0) {
    log.success("没有需要翻译的文本");
    log.success(translateFilePath);
    return;
  }

  const [afterTranslateMessages, duration] = await run(
    translateMessages,
    options
  );
  for (const item of afterTranslateMessages) {
    messages[item.key] = item.tran;
  }
  if (programOption.as) {
    translateFileName = programOption.as;
  }

  localeFile
    .createConf(messages, translateFileName, options)
    .then((translateFilePath) => {
      log.success("翻译完成");
      log.success(translateFilePath);
      log.success(
        `翻译${afterTranslateMessages.length}条文本，耗时：${duration}s`
      );
      const failure = afterTranslateMessages.filter((item) => baseUtils.isChinese(item.tran));
      if (failure.length) {
        log.warning(`翻译失败${failure.length}条，请检查。`);
        console.table(failure);
      }
    })
    .catch(() => {
      log.error("翻译失败");
      log.error(translateFilePath);
    });
};
