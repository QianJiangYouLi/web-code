const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 开启代理方式1
  // devServer: {
  //   proxy: 'http://localhost:3000'
  // }

  // 开启代理方式2
  /*devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': ''
        },
        ws: true, // 支持websocket
        changeOrigin: true // 用于控制请求头中的host值
      },
      '/demo': {
        target: 'http://localhost:3001',
        pathRewrite: {
          '^/demo': ''
        },
        ws: true,
        changeOrigin: true
      }
    }
  }*/
})
