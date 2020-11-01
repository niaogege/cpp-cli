#!/usr/bin/env node

// commander 实现 NodeJS 命令行）
const program = require('commander')
const updateCheck = require('./../lib/update')
console.log('updateCheck', updateCheck);
// version
program.version(
  require('../package.json').version, '-v, --version'
)
// upgrate
program
    .command('upgrade')
    .description('check Cpp-cli version')
    .action(() => {
      updateCheck()
    })


// 解析命令行参数
program.parse(process.argv)