const {merge} = require('webpack-merge');
const common = require('./webpack.common')
const path = require('path')
console.log('dev', path.join(__dirname, '../dist'));
module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 3000,
    hot: true,
    contentBase: path.join(__dirname, '../dist'),
    overlay: {
      errors: true,
      warnings: true
    }
  }
})