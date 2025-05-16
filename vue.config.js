const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
   configureWebpack: {
    devtool: 'source-map', // 开发环境生成 Source Map
  },
})

