module.exports = {
  publicPath: './',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://o2o-support-dev.cas-client.devgw.yonghui.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
      }, //
      }
    },
    port: '8080'
  },
}
          