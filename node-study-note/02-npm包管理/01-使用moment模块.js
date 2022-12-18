/**
 * 下载第三方moment模块：npm i moment@2.29.1
 * 在文件中引入moment模块：require('moment')
 * 使用moment提供的方法格式化日期
 */
const moment = require('moment')
// 格式化当前时间
console.log(moment().format())

// 格式化日期对象
console.log(moment(new Date('2222/2/22 22:22:22')).format('YYYY-MM-DD HH:mm:ss'))