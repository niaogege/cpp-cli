// 请求 log-symbols 库
const symbols = require('log-symbols')
// 请求 fs-extra 库
const fse = require('fs-extra')
// 引用 chalk 库，用于控制台字符样式
const chalk = require('chalk')
// 路径
const path = require('path')
// 请求config
const defConfig = require('./config')
// 拼接config.json完整路径
const cfgPath = path.resolve(__dirname, '../config.json');

async function setMirror(link) {
  // 判断 config.json 文件是否存在
  const exists = await fse.pathExists(cfgPath)
  if (exists) {
    // 存在时直接写入配置
    mirrorAction(link)
  } else {
    // 不存在时先初始化配置，然后再写入配置
    await defConfig()
    mirrorAction(link)
  }
}

async function mirrorAction(link) {
  try {
    // 读取 config.json 文件
    const jsonConfig = await fse.readJson(cfgPath);
    jsonConfig.mirror = link
    // 再写入 config.json 文件
    await fse.writeJson(cfgPath, jsonConfig)
    // 等待写入后再提示配置成功
    console.log(symbols.success, chalk.green(`Set the mirror successs. ${link}`))
  } catch(e) {
     // 如果出错，提示报错信息
     console.log(symbols.error, chalk.red(`Set the mirror failed. ${err}`))
     process.exit()
  }
}

module.exports = setMirror