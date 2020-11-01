const updateNotifier = require('update-notifier')
// chalk 控制台字符样式
const chalk = require('chalk')
const pkg = require('../package.json')

const notifier = updateNotifier({
  // package.json 获取name 和版本
  pkg,
  updateCheckInterval: 1000,
})
function updateCheck(params) {
  if (notifier.update) {
    console.log(`New version avaliable: ${notifier.update.latest}, it is recommend that you update before using`)
    notifier.notify()
  } else {
    console.log('you are the laste');
  }
}
module.exports = updateCheck