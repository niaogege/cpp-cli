/*
 * @Author: your name
 * @Date: 2020-11-01 15:17:28
 * @LastEditTime: 2020-11-01 21:43:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \plugin-cppd:\code\cpp-cli\lib\init.js
 */
// 请求 fs-extra 库，用于文件操作
const fse = require('fs-extra')
// 请求 ora 库，用于初始化项目时等待动画
const ora = require('ora')
// 请求 chalk 库
const chalk = require('chalk')
// 请求 log-symbols 库
const symbols = require('log-symbols')
// 请求 inquirer 库，用于控制台交互
const inquirer = require('inquirer')
// 请求 handlebars 库，用于替换模板字符
const handlebars = require('handlebars')

const path = require('path')

// 请求 download.js 文件，模板不在本地时执行该操作
const dlTemplate = require('./download')

// 初始化项目
async function initProject(projectName) {
  try {
    const exist = await fse.pathExists(projectName)
    if (exist) {
      console.log(symbols.error, chalk.red('项目已存在'))
    } else {
      // 控制台交互
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'name',
            message: 'set a global name for 这个项目',
            default: 'Default'
          }
        ])
      .then(async (answers) => {
        const initSpinner = ora(chalk.cyan('项目初始化'))
        // 执行等待动画
        initSpinner.start()
        // 拼接文件夹路径
        const templatePath = path.resolve(__dirname, '../template/')
        // 返回当前工作目录
        const processPath = process.cwd()
        // 项目名小写
        const LCProjectName = projectName.toLowerCase()
        // 拼接项目完成路径
        const targetPath = `${processPath}/${LCProjectName}`
        // 判断模板路径是否存在
        const exists = await fse.pathExists(templatePath);
        if (!exists) {
          // 不存在时，就先等待下载模板，下载完再执行下面的语句
          await dlTemplate()
        }
        // 复制模板文件到对应的路径去
        try {
          await fse.copy(templatePath, targetPath)
        } catch (e) {
          console.log(symbols.error, chalk.red(`Copy template failed. ${err}复制模板失败`))
          process.exit()
        }

        // 把要替换的模板字符准备好
        const multiMeta = {
          project_name: LCProjectName,
          global_name: answers.name
        }
        // 把要替换的文件准备好
        const multiFiles = [
          `${targetPath}/package.json`,
          // `${targetPath}/gulpfile.js`,
          // `${targetPath}/test/index.html`,
          // `${targetPath}/src/index.js`
        ]
        // 用条件循环把模板字符替换到文件去
        for (var i = 0; i < multiFiles.length; i++) {
          // 这里记得 try {} catch {} 哦，以便出错时可以终止掉 Spinner
          try {
            // 等待读取文件
            const multiFilesContent = await fse.readFile(multiFiles[i], 'utf8')
            // 等待替换文件，handlebars.compile(原文件内容)(模板字符)
            const multiFilesResult = await handlebars.compile(multiFilesContent)(multiMeta)
            // 等待输出文件
            await fse.outputFile(multiFiles[i], multiFilesResult)
          } catch (err) {
            // 如果出错，Spinner 就改变文字信息
            initSpinner.text = chalk.red(`Initialize project failed. ${err}`)
            // 终止等待动画并显示 X 标志
            initSpinner.fail()
            // 退出进程
            process.exit()
          }
        }

        // const { projectDescription, projectAuthor } = await inquirer.prompt([
        //   { name: 'projectDescription', message: '请输入项目描述' },
        //   { name: 'projectAuthor', message: '请输入作者名字' }
        // ])

        // const meta = {
        //   projectAuthor,
        //   projectDescription,
        //   projectName
        // }
        
        // // 获取拷贝后的模板项目中的 `package.json`
        // const targetPackageFile = targetProjectPath + '/package.json'
        // if (fs.pathExistsSync(targetPackageFile)) {
        //   // 读取文件，并转换成字符串模板
        //   const content = fs.readFileSync(targetPackageFile).toString()
        //   // 利用 handlebars 将需要的内容写入到模板中
        //   const result = handlebars.compile(content)(meta)
        //   fs.writeFileSync(targetPackageFile, result)
        // } else {
        //   console.log('package.json 文件不存在：' + targetPackageFile)
        // }
        

        // 如果成功，Spinner 就改变文字信息
        initSpinner.text = 'Initialize project successful.'
        // 终止等待动画并显示 ✔ 标志
        initSpinner.succeed()
        console.log(`
          To get started:

            cd ${chalk.yellow(LCProjectName)}
            ${chalk.yellow('npm install')} or ${chalk.yellow('yarn install')}
            ${chalk.yellow('npm run dev')} or ${chalk.yellow('yarn run dev')}
        `)
      })
    }
  } catch (e) {
    console.log(symbols.error, chalk.red('e', e))
    process.exit()
  }
}
module.exports = initProject