const mergeIi8nConfig = require('../utils/mergeIi8nConfig')
const log = require('../utils/log')
const LocaleFile = require('../utils/localeFile')
const translate = require('../../core/utils/translate').translate;
const request = require('../../core/utils/translate').request;
const baseUtils = require('../../core/utils/baseUtils');
const _ = require('lodash');
const path = require('path');

async function run(messages, options) {
    const keys = Object.keys(messages);
    const translationFailure = [];

    return new Promise((resolve, reject) => {
        if (keys.length <= 0) {
            return messages;
        }
        const exec = (key, value) => {
            if (!key) {
                key = keys.shift();
                if (!key) {
                    if (translationFailure.length > 0) {
                        log.warning(`'-- 需要手动翻译的字段 --------------------------------------'`);
                        console.log(translationFailure);
                    }
                    resolve(messages);
                    return;
                }
                value = messages[key];
            }

            if (!value.trim() || !baseUtils.isChinese(value)) {
                exec();
                return;
            }

            log.info(`'-- 翻译中 ---------------------------------------------------------------'`);
            log.info(`key：${key}`);
            log.info(`content：${value}`);
            translate(`${value}`, options.sign).then(async (result) => {
                let tran = _.get(result, 'fanyi.tran', '');
                if (!tran) {
                    tran = _.get(result, 'ce.word.trs[0].#text', '');
                }
                if (!tran) {
                    tran = await request(value);
                }
                log.info(`tran：${tran}`);
                if (!tran) {
                    log.warning(`-- 翻车了，请手动翻译吧... -----------------------------`);
                    translationFailure.push({key, value})
                }
                if (tran) {
                    messages[key] = tran;
                }
                exec();
            }).catch((error) => {
                console.log(error);
                exec(key, value);
            });
        }
        exec();
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