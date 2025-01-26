const mergeIi8nConfig = require('../utils/mergeIi8nConfig')
const log = require('../utils/log')
const LocaleFile = require('../utils/localeFile')
const request = require('../../core/utils/translate').request;
const baseUtils = require('../../core/utils/baseUtils');
const _ = require('lodash');


module.exports = async function (programOption) {
    const tran = await request('是的');
    console.log(tran);
}