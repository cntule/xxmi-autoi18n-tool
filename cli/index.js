const path = require('path')
const program = require('commander')
const initFileConf = require('./command/initFileConf')
const collect = require('./command/collect')
const package = require('../package')
const restore = require('./command/restore')
const translate = require('./command/translate')
const request = require('./command/request')

// 用法 版本说明
program
    .version(package.version) // 定义版本
    .usage('<command>') // 定义用法

// 初始化配置文件
program
    .command('init') // 定义命令
    .alias('i') // 命令别名
    .description('init locales conf') // 对命令参数的描述信息
    .action(function (options) {
        initFileConf(options)
    })
    .on('--help', function () {
        console.log('  Examples:')
        console.log('    $ autoi18n init')
    })

// 同步国际化配置文件并替换为对应的国际化字段
program
    .command('sync') // 定义命令
    .alias('s') // 命令别名
    .description('Synchronize the Chinese configuration to the internationalization profile') // 对命令参数的描述信息
    .option('-r, --replace', 'Replace Internationalization Fields') // 替换国际化字段 如果为true 会写入源文件 默认为false
    .option('-c, --config <path>', 'set config path. defaults to ./autoi18n.config.js') // 指定配置文件
    .action(function (options) {
        collect(options)
    })
    .on('--help', function () {
        console.log('  Examples:');
        console.log('    $ autoi18n sync')
    })

// 恢复国际化字段为对应文案
program
    .command('restore') // 定义命令
    .alias('r') // 命令别名
    .description('Restore the internationalized field to the corresponding text') // 对命令参数的描述信息
    .option('-c, --config <path>', 'set config path. defaults to ./autoi18n.config.js') // 指定配置文件
    .option('-f, --file <path>', 'Internationalization configuration file path') // 国际化配置文件路径 默认会获取 language的第一个文件配置数据
    .action(function (options) {
        restore(options)
    })
    .on('--help', function () {
        console.log('  Examples:')
        console.log('    $ autoi18n restore -f ./src/locales/zh-cn.ts')
    })

// 翻译
program
    .command('translate') // 定义命令
    .alias('s') // 命令别名
    .description('把中文翻译成英文') // 对命令参数的描述信息
    .option('-f, --file <path>', '读取文件')
    .option('-as, --as <name>', '另存文件')
    .action(function (options) {
        translate(options)
    })
    .on('--help', function () {
        console.log('  Examples:');
        console.log('    $ autoi18n translate -f ./src/locales/zh.json -as en')
    })

// 翻译
program
    .command('request') // 定义命令
    .action(function (options) {
        request(options)
    })
    .on('--help', function () {
    })

program.parse(process.argv)
