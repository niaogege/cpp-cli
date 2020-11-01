/**
 * @description: 设置资源镜像的
 * @param {*}
 * @return {json} 输出json文件
 */

const fse = require('fs-extra')
const path = require('path')

// 声明配置文件
const jsonConfig = {
  'name': 'cpp-cli-test',
  'mirror': 'https://www.npmjs.com/package/cpp-cli-test'
}

// 拼接 config.json 完整路径
const configPath = path.resolve(__dirname, '../config.json')

async function defConfig() {
  try {
    // fs封装方法 将jsonConfig保存成json文件
    await fse.outputJSON(configPath, jsonConfig)
  } catch (e) {
    console.log('e');
    process.exit()
  }
}
module.exports = defConfig