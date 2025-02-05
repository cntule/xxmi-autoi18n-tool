const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 配置自动国际化loader 无侵入式
    config.module
        .rule('xxmi-autoi18n-tool')
        .test(/\.(vue|(j|t)sx?)$/)
        .pre() // 这个必须加上 优先执行的loader 顺序一定要在use方法前面 否则会报找不到pre方法
        .use('xxmi-autoi18n-tool')
        .loader('xxmi-autoi18n-tool')
        .end()
  },
})
