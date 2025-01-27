const axios = require('axios');
const FormData = require('form-data');
const _ = require('lodash');


function retry(fn) {
    return new Promise((resolve) => {
        let index = 1;
        const exec = () => {
            fn().then((response) => {
                resolve(response.data);
            }).catch(() => {
                if (index < 3) {
                    index++;
                    exec(resolve);
                } else {
                    resolve(null);
                }
            });
        }
        exec();
    })
}


exports.translate = async function (q, sign = '0c3bff94629d96d290c083e2d057881e') {
    // 创建一个 FormData 实例
    const formData = new FormData();

    formData.append('q', q);
    formData.append('le', 'en');
    formData.append('t', '4');
    formData.append('client', 'web');
    formData.append('sign', sign);
    formData.append('keyfrom', 'webdict');
    const headers = formData.getHeaders();

    return new Promise(async (resolve) => {
        const result = await retry(() => axios({
            method: 'post',
            url: 'https://dict.youdao.com/jsonapi_s?doctype=json&jsonversion=4',
            data: formData,
            headers
        }));
        let tran = _.get(result, 'fanyi.tran', '');
        if (!tran) {
            tran = _.get(result, 'ce.word.trs[0].#text', '');
        }
        resolve(tran);
    })
}

exports.request = async function (q) {
    return new Promise(async (resolve) => {
        const result = await retry(() => axios.get(`https://youdao.com/result?word=美丽中国。[=]${q}&lang=en`));
        // 处理成功情况
        const regex = /<p class="trans-content"[^>]*>([\s\S]*?)<\/p>/g;
        const m = regex.exec(result || '');
        const tran = m && m[1] ? m[1] : '[=]';
        resolve(tran.substring(tran.indexOf('[=]') + 3).trim());
    })
}