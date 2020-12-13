/*
 * @Author: your name
 * @Date: 2020-11-17 19:33:36
 * @LastEditTime: 2020-12-05 22:23:03
 * @LastEditors: cpp
 * @Description: In User Settings Edit
 * @FilePath: \plugin-cppd:\learn\webpack-learn\build\webpack.config.prod.js
 */
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(common, {
  bundleAnalyzerReport:  process.env.npm_config_report,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.l?css$/,
        use: [
             {loader:  miniCssExtractPlugin.loader},
             "css-loader", 
             "less-loader" 
            ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 打包之前删除dist目录
    new miniCssExtractPlugin({
      filename: "css/[name][chunkhash].css",
      chunkFilename: "css/[id][chunkhash].css"
    }),
    new BundleAnalyzerPlugin(
      {
         analyzerMode: 'server',
         analyzerHost: '127.0.0.1',
         analyzerPort: 8889,
         reportFilename: 'report.html',
         defaultSizes: 'parsed',
         openAnalyzer: true,
         generateStatsFile: false,
         statsFilename: 'stats.json',
         statsOptions: null,
         logLevel: 'info'
      }),
  ],
  externals: {
    'vue': 'Vue', // 大文件单独打包
  }
})