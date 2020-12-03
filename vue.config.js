


let path = require('path')
const resolve = dir => path.join(__dirname, dir)


module.exports = {
  lintOnSave: false,
  configureWebpack: config => {
    config.resolve.alias = {
      '@': resolve('src'),
    }
  }
}