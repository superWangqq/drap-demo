const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave:false,
  transpileDependencies: true,
   configureWebpack: {
    devtool: 'source-map', // 开发环境生成 Source Map
  },
    devServer: {
        proxy: {  //配置跨域
            '/api': {
                // target: 'http://10.188.57.112:80',
                target: 'https://sit.cjjy.com/api/',
                changOrigin: true,  //允许跨域
                pathRewrite: {
                    '^/api': '/api'
                }
            }
    
        }
    },
})

