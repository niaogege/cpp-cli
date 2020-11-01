/*
 * @Author: your name
 * @Date: 2020-11-01 18:27:50
 * @LastEditTime: 2020-11-01 20:15:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \plugin-cppd:\code\cpp-cli\lib\download.js
 */
// 请求 download 库，用于下载模板
const download = require('download')
// 请求 ora 库，用于实现等待动画
const ora = require('ora')
// 请求 chalk 库，用于实现控制台字符样式
const chalk = require('chalk')
// 请求 fs-extra 库，用于文件操作
const fse = require('fs-extra')
const path = require('path')

// 请求 config.js 文件
const defConfig = require('./config')
// 拼接config.json路径
const cfgPath = path.resolve(__dirname, '../config.json')
// 拼接tpl模板文件夹完整路径
const tplPath = path.resolve(__dirname, '../template')
// 下载模板
async function dlTemplate() {
  const exists = await fse.pathExists(cfgPath);
  if (exists) {
    await dlAction()
  } else {
    await defConfig()
    // 同上
    await dlAction()
  }
}

async function dlAction() {
  // remove模板文件夹
  try {
    await fse.remove(tplPath)
  } catch (e) {
    console.log('e', e);
    process.exit()
  }
  // 读取配置 获取镜像链接
  const jsonConfig = await fse.readJSON(cfgPath)
  // Spinner 初始设置
  const dlSpinner = ora(chalk.cyan('Downloading template 远程模板...'))
  dlSpinner.start()
  try {
    await download(
      jsonConfig.mirror,
      path.resolve(__dirname, '../template/'),
      {
        extract: true, // 解压模板
      }
    )
  } catch (e) {
    // 下载失败时提示
    dlSpinner.text = chalk.red(`Download template failed. ${err}`)
    // 终止等待动画并显示 X 标志
    dlSpinner.fail()
    process.exit()
  }
  // 下载成功时提示
  dlSpinner.text = 'Download template successful.'
  // 终止等待动画并显示 ✔ 标志
  dlSpinner.succeed()
}
module.exports = dlTemplate