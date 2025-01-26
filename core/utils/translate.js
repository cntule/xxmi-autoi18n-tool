const axios = require('axios');
const FormData = require('form-data');

exports.translate = async function (q, sign = '0c3bff94629d96d290c083e2d057881e') {

    return new Promise((resolve, reject) => {

        // 创建一个 FormData 实例
        const formData = new FormData();

        formData.append('q', q);
        formData.append('le', 'en');
        formData.append('t', '4');
        formData.append('client', 'web');
        formData.append('sign', sign);
        formData.append('keyfrom', 'webdict');
        // 发起 POST 请求
        axios({
            method: 'post',
            url: 'https://dict.youdao.com/jsonapi_s?doctype=json&jsonversion=4',
            data: formData,
            headers: formData.getHeaders() // 获取并设置头部信息
        })
            .then(function (response) {
                // 处理成功响应
                resolve(response.data);
            })
            .catch(function (error) {
                // 处理请求错误
                console.error(error);
                reject(error);
            });
    })
}

exports.request = async function (q) {
    return new Promise((resolve, reject) => {
        axios.get(`https://youdao.com/result?word=美丽中国。[=]${q}&lang=en`)
            .then(function (response) {
                // 处理成功情况
                const regex = /<p class="trans-content"[^>]*>([\s\S]*?)<\/p>/g;
                const m = regex.exec(response.data);
                const tran = m && m[1] ? m[1] : '[=]';
                resolve(tran.substring(tran.indexOf('[=]') + 3).trim());
            })
            .catch(function (error) {
                // 处理错误情况
                console.error(error);
                resolve('');
            });
    })
}