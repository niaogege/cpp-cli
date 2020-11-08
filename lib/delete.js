// 请求 fs-extra 库
const fse = require('fs-extra')

// 请求 log-symbols 库
const symbols = require('log-symbols')
// 引用 chalk 库，用于控制台字符样式
const chalk = require('chalk')
// 路径
const path = require('path')

async function deleteDir(link) {
  try {
    const tplPath = path.resolve(__dirname, `../${link}`)
    console.log('删除文件的完整路径:', tplPath);
    await fse.remove(tplPath)
    console.log(symbols.success, chalk.green(`删除文件 success. 删除的文件名是${link}`))
  } catch (e) {
    console.log(symbols.error, chalk.redBright(`删除文件 failed. ${link}`), e)
  }
}
module.exports = deleteDir
