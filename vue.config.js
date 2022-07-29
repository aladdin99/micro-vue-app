const { name } = require('./package');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/micro-vue-app/'
    : '/',
  devServer: {
    port: 3011,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      "^/juejin": {
        target: "https://api.juejin.cn/", //
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/juejin': '/' }
      },
      "^/weibo-service": {
        target: "https://weibo.com/", //
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/weibo-service': '/' }
      },
      "^/aladdin99.github.io/weibo-service": {
        target: "https://weibo.com/", //
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/aladdin99.github.io/weibo-service': '/' }
      },
      "^/aladdin99.github.io/juejin": {
        target: "https://api.juejin.cn/", //
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/aladdin99.github.io/juejin': '/' }
      },
    }
  },
  configureWebpack: {
    name,
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};