
## 综述
全局安装，*cpp-cli-test*脚手架，shell执行*npm i -g cpp-cli-test*即可，*cpp*即被注册到全局bin里。
本人开发的npm包地址*[cpp-cli-test](https://www.npmjs.com/package/cpp-cli-test)*

### 删除文件夹
`cpp rm <dir>` 删除文件夹命令

### 升级模板
`cpp upgrade`

### 设置自己镜像
`cpp mirror <template_mirror>`

这里的镜像地址，也就是模板的下载地址，比如: `https://github.com/mengdu/vue-element-admin-tpl/archive/master.zip`以zip为结尾的文件，执行命令行 `cpp mirror https://github.com/mengdu/vue-element-admin-tpl/archive/master.zip`就是把该模板下载下来.

需要先将自己的镜像写入本地的*config.json*文件中，代码逻辑就是根据输入的镜像写入到*config.json*。写入的时候判断有没有*config.json*，如果没有则初始化生成*config.json*，有的话，则先读取，然后设置
```js
    // 读取 config.json 文件
    const jsonConfig = await fse.readJson(cfgPath);
    jsonConfig.mirror = link
    // 再写入 config.json 文件
    await fse.writeJson(cfgPath, jsonConfig)
```

### 下载模板
`cpp template`

下载模板的时候，先判断当前根目录下是否存在*config.json*文件，如果不存在则去生成，存在的话，先删除模板文件夹，然后读取*config.json*文件中的`jsonConfig.mirror`,然后再根据设置好的路径去远程下载，放到*templateTemp*里，下载完还需要解压
核心代码
```js
    await download(
      jsonConfig.mirror, // 远程连接,就是前一步设置的镜像地址
      path.resolve(__dirname, '../templateTemp/'), // 模板存放位置
      {
        extract: true, // 解压模板
      }
    )
```
先下载到*templateTemp*到文件夹，然后开始一系列文件剪切操作，找到*templateTemp*里的文件夹，即从远程下载的文件夹，然后剪切到*template*里去。

### 项目初始化
`cpp init <project_name>`
最重要的部分, 通过[inquirer](https://www.npmjs.com/package/inquirer)来与控制台交互,获取用户所输的文件夹名和设置包名来初始化，主要还是文件夹的操作。
```js
  const multiFiles = `${targetPath}/package.json`
  // 用条件循环把模板字符替换到文件去
  try {
    // 等待读取文件
    const multiFilesContent = fse.readFileSync(multiFiles, 'utf8').toString()
    // 等待替换文件，handlebars.compile(原文件内容)(模板字符)
    const multiFilesResult = handlebars.compile(multiFilesContent)(multiMeta)
    console.log('multiFilesResult', multiFilesResult);
    // 等待输出文件
    await fse.outputFile(multiFiles, multiFilesResult)
  } catch (err) {
    // 如果出错，Spinner 就改变文字信息
    initSpinner.text = chalk.red(`Initialize project failed. ${err}`)
    // 终止等待动画并显示 X 标志
    initSpinner.fail()
    // 退出进程
    process.exit()
  }
```
> 其中有一个坑的地方就是*handlebars*库，用于替换模板字符的，这个比较坑的就是源文件夹里的属性，必须写成{{name}}这种样式才能替换模板
比如
```json
{
  "name": "{{name}}",
  "version": "8.8.8",
  "description": "{{description}}",
  "main": "./index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "{{author}}",
  "license": "ISC"
}
```
之前我以为会直接替代*package.json*里的包名和描述等等。
最高级的应该是用户按照所输入的名称、包名以及依赖名等汇总到*package.json*里

### 本地调试模块，不是项目哦
添加了bin命令之后，需要执行*npm link*将 npm 模块链接到对应的运行项目中去，方便地对模块进行调试和测试

### 接下来需要做的事
- 动态修改模板里的*package.json*里的name和作者
已经解决，
- 运用webpack搭建自己的需要的模板
- 完善*cpp-cli-test*脚手架里的命令行和帮助文档
- 涉及到的几个包，学习下基本的api
已经解决，还需要继续学习

### npm其他操作
全局删除当前的模块
- 使用命令
`npm uninstall -g 包名`

- 直接找到对应包删除
`C:\Users\自己用户的文件夹\AppData\Roaming\npm`
将对应的包删除即可

### node里的一些常用的api
#### 路径拼接
- *__dirname* // 返回当前文件所在的文件夹绝对路径，比如*D:\code\cpp-cli\lib*
- *path.resolve* // 拼接当前文件路径
- *__filename*: 指当前执行文件的带有完整绝对路径的文件名
- *process.cwd()*: 指当前执行node命令时候的文件夹目录名
./: 指文件所在目录
比如:
```js
const configPath = path.resolve(__dirname, '../config.json') // 返回路径
console.log(configPath) // configPath D:\code\cpp-cli\config.json

const foo = path.resolve('/foo/bar', '/tmp/file/');
console.log(foo) // /foo/bar/tmp/file
```

### 相关解析
*`#!/usr/bin/env node`*
使用过Linux或者Unix的开发者，对于Shebang应该不陌生，它是一个符号的名称，#！。这个符号通常在Unix系统的基本中第一行开头中出现，用于指明这个脚本文件的解释程序。了解了Shebang之后就可以理解，增加这一行是为了指定用node执行脚本文件。

当你输入一个命令的时候，npm是如何识别并执行对应的文件的呢？
具体的原理阮一峰大神已经在npm scripts 使用指南中介绍过。简单的理解:
就是输入命令后，会有在一个新建的shell中执行指定的脚本，在执行这个脚本的时候，我们需要来指定这个脚本的解释程序是node。

在一些情况下，即使你增加了这一行，但还是可能会碰到一下错误，这是为什么呢？
`No such file or directory`
为了解决这个问题，首先需要了解一下/usr/bin/env。我们已经知道，Shebang是为了指定脚本的解释程序，可是不同用户或者不同的脚本解释器有可能安装在不同的目录下，系统如何知道要去哪里找你的解释程序呢？

*/usr/bin/env*就是告诉系统可以在*PATH*目录中查找。
所以配置*`!/usr/bin/env node*, 就是解决了不同的用户*node路径*不同的问题，可以让系统动态的去查找node来执行你的脚本文件。
看到这里你应该理解，为什么会出现No such file or directory的错误？因为你的node安装路径没有添加到系统的PATH中。所以去进行node环境变量配置就可以了。

### NPM 执行脚本的原理
npm 脚本的原理非常简单。每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。
比较特别的是，npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。

### 发布npm包
- npm adduser
- npm publish
> 发布前注意改变npmb包的version版本号，不能跟现在的已有版本重复

### 参考链接
- [【工具流脚手架cli】用脚手架整合模板和配置](https://juejin.im/post/6874815221174075405)
- [一步一步搭建脚手架](https://juejin.im/post/6844903912080670734#heading-8)