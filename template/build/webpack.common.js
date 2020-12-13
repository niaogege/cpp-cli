/*
 * @Author: your name
 * @Date: 2020-11-17 19:31:22
 * @LastEditTime: 2020-12-05 21:59:57
 * @LastEditors: cpp
 * @Description: In User Settings Edit
 * @FilePath: \plugin-cppd:\learn\webpack-learn\build\webpack.common.js
 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin'); // 复制并压缩html
const VueLoaderPlugin = require('vue-loader/lib/plugin');
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[id].[hash].js'
    },
    module: {
      rules: [
        // 转换 ES6 代码，解决浏览器兼容问题
        {
          test: '/\.js$/',
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.less$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "less-loader" // compiles Less to CSS
          }]
        },
        // 编译css，自动添加前缀，抽取css到独立文件
        {  
          test: /\.css$/,  
          use:['style-loader','css-loader'],  
          include: path.resolve(__dirname + '/src/'),  
          exclude: /node_modules/
        },
        // 压缩html
        {
          test: '/\.html$/',
          use: [{
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }]
        },
        // 处理静态资源
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        },
        // 解析vue文件
        {
          test: /\.vue$/,
          use: {
            loader: 'vue-loader'
         }
        }
      ]
    },
    resolve: {
      alias: {
        // 'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, '../src')
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
      new VueLoaderPlugin(),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'), // 生成的文件名
        filename: 'index.html', // 生成html文件的名称
        inject: true, // 将js文件查到
        favicon: path.resolve(__dirname, '../public/avatar.png'),
        hash: true
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
    ]
  }

