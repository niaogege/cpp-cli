#!/usr/bin/env node

// commander 实现 NodeJS 命令行）
const program = require('commander')
const setMirror = require('../lib/mirror')
const updateChk = require('../lib/update')
// 请求 lib/download.js
const dlTemplate = require('../lib/download')
// 项目初始化
const initProject = require('../lib/init')

// 删除文件夹
const deleteDir = require('../lib/delete')
// version
program.version(
  require('../package.json').version, '-V, --version'
)
// 删除文件
program
  .command('rm <dir>')
  .option('-r, --recursive', 'Remove recursively')
  .action(function (dir) {
    deleteDir(dir)
  });

// 升级当前包名
program
    .command('upgrade')
    .option('-u, --upgrade', 'upgrade version')
    // 描述信息，在帮助信息时显示
    .description("Check the cpp-cli-test version.")
    .action(() => {
      // 执行 lib/update.js 里面的操作
      updateChk()
    })

// 设置模板镜像
program
    .command('mirror <template_mirror>')
    .description('设置自己的镜像模板')
    .action((tpl) => {
      console.log('tpl', tpl);
      setMirror(tpl)
    })

// 远程下载自己的模板
program
    .command('template')
    .description('Download template from mirror.')
    .action(() => {
      dlTemplate()
    })

// 项目初始化
program
    .name('cpp')
    .usage('<commands> [options]')
    .command('init <project_name>')
    .description('项目初始化')
    .action((project) => {
      initProject(project)
    })

// 解析命令行参数
program.parse(process.argv)