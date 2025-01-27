const mergeIi8nConfig = require('../utils/mergeIi8nConfig')
const log = require('../utils/log')
const LocaleFile = require('../utils/localeFile')
const translate = require('../../core/utils/translate').translate;
const request = require('../../core/utils/translate').request;
const baseUtils = require('../../core/utils/baseUtils');
const _ = require('lodash');
const path = require('path');
const pLimit = require('p-limit')


async function query(key, value, sign) {
    return new Promise((resolve) => {
        Promise.all([translate(value, sign), request(value)]).then((posts) => {
            log.info('---- 翻译中 ----------------------------------------------------------------');
            log.info(`key: ${key}`);
            log.info(`value: ${value}`);
            const [r1, r2] = posts;
            const result = {key, value, tran: r1 || r2 || ''};
            log.info(`tran: ${result.tran}`);
            resolve(result);
        });
    })
}

async function run(messages, options) {
    const startTime = Date.now();
    const translateMessages = [];
    for (const [key, value] of Object.entries(messages)) {
        if (baseUtils.isChinese(value)) {
            translateMessages.push({key, value})
        }
    }
    if (translateMessages.length <= 0) {
        return Promise.resolve(messages);
    }

    const limit = pLimit(options.translateLimit || 20);
    const promises = translateMessages.map(item => {
        return limit(() => query(item.key, item.value, options.sign))
    })

    return new Promise(async (resolve) => {
        const results = await Promise.all(promises);
        results.forEach((item) => {
            messages[item.key] = item.tran;
        })
        const endTime = Date.now();
        log.success(`---- 翻译${results.length}条文本，耗时：${(endTime - startTime) / 1000}s -------------`);
        resolve(messages);
    })
}

/**
 * 同步国际化配置文件并替换为对应的国际化字段
 * @param {*} programOption 命令行参数
 */
module.exports = async function (programOption) {
    // 合并配置文件
    const options = mergeIi8nConfig(programOption);
    if (!options.translateLanguage && !programOption.file) {
        log.error('没有配置 translateLanguage 或者 传入翻译文件');
        process.exit(2);
    }

    // 创建生成国际化文件对象
    const localeFile = new LocaleFile(options.localePath);
    let messages = {};
    let translateFilePath = '';
    if (options.translateLanguage) {
        translateFilePath = localeFile.getConfigFilePath(options.translateLanguage, options, programOption.file);
        messages = localeFile.getConf(options.translateLanguage, options, programOption.file);
    } else {
        translateFilePath = localeFile.getConfigFilePath('', options, programOption.file);
        messages = localeFile.getConf('', options, programOption.file);
    }
    let translateFileName = path.basename(translateFilePath, path.extname(translateFilePath));
    const fanyiAfterMessages = await run(messages, options);
    if (programOption.as) {
        translateFileName = programOption.as;
    }
    localeFile.createConf(fanyiAfterMessages, translateFileName, options).then((translateFilePath) => {
        log.success('翻译完成');
        log.success(translateFilePath);
    }).catch(() => {
        log.error('翻译失败')
        log.error(translateFilePath);
    });
}