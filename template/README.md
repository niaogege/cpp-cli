<!--
 * @Author: cpp
 * @Date: 2020-12-05 22:09:26
 * @LastEditors: cpp
 * @LastEditTime: 2020-12-05 22:10:22
 * @FilePath: \plugin-cppd:\learn\webpack-learn\README.md
-->

学习如何用webpack搭建项目，成为模板，为后面的脚手架做准备，需要学习的有
- webpack
- node
- 学会手写自己的loader
- 手写plugin
- webpack的异步加载如何实现
- webpack的分包策略

### 什么是webpack？
官网是这么描述的: 
> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

先理解四个核心概念：
- 入口(entry)
- 输出(output)
- 加载器(loader)
- 插件(plugins)

### webpack搭建vue项目
#### 本地项目涉及的webpack版本
webpack版本众多，有时会被这些琐粹的玩意搞得头晕
```json
{
  "webpack": "^4.41.2",
  "webpack-cli": "^3.3.9",
  "webpack-dev-server": "^3.9.0",
  "webpack-merge": "^5.4.0"
}
```
#### 本项目文件结构

#### 引入babel
*npm i -D babel-core babel-loader*
复制代码由于在使用vue时会用到很多es6的语法，但是现在很多浏览器对es6的支持不是很好，所以在编译时需要将这些语法转换es5的语法，此时我们使用babel来进行编译。
babel的使用请阅读官网文档http://babeljs.cn/

#### html-webpack-plugin
这个插件可以自动为我们生成HTML并插入对应的js和css文件。这样子是很方便的，尤其是当文件名中包含了hash值，而这个hash值在webpack每次编译的时候都会发生改变的。下面我们就逐一来介绍HtmlWebpackPlugin的用法。
配置参数:
- filename
  filename表示生成html文件的名字，如果没有设置的话默认为index.html。

- template
　当webpack自动生成html文件的时候，会基于某个模板来进行。当然你也可以自定义自己的模板，如果没有定义webpack会使用默认的模板。但是需要指出的是，当你使用了其他模板类型（比如jade），那么你需要安装对应的loader。默认情况下webpack使用ejs模板。

- inject
inject主要是设置将js和css文件插入在html的哪个位置，由于js的加载时同步进行的，所以它的位置对网页的加载速度是有影响的。inject共有四个可选项：true、body、head和false。

- true：默认值，将js文件插入body的底部。注意这里是bool类型的true，并不是字符串。设置如下：
```js
new HtmlWebpackPlugin({
　　inject: true
}),
```

- body：和true的功能是一样的。需要设置为字符串body。设置如下：
```js
    new HtmlWebpackPlugin({
      inject: 'body'
    }),
```

- head：表示将js文件插入在head标签内，这里是字符串head。
- false：表示不插入生成的js文件，也不插入css文件。因为其他三个可选项css文件都是插入在head标签内的。
- [htmlWebpackPlugin](https://www.npmjs.com/package/html-webpack-plugin)


#### 本地项目运行
```js
  devServer: {
    port: 3000,
    hot: true,
    contentBase: path.join(__dirname, './dist'),
    overlay: {
      errors: true,
      warnings: true
    }
  }
```
- output的publicPath是用来给生成的静态资源路径添加前缀的；
- devServer中的publicPath是用来本地服务拦截带publicPath开头的请求的；
- contentBase是用来指定被访问html页面所在目录的；



### 参考链接
- [配置vue+webpack踩过的坑](http://ddrv.cn/a/314373)
- [weboack官网](https://www.webpackjs.com/concepts/)
- [webpack 搭建 vue 项目](https://juejin.cn/post/6844903541962702855)

