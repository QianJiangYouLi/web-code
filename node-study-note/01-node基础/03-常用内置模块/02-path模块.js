const fs = require('fs')
const path = require('path')

let url = 'https://www.baidu.com/index.html'

/**
 * path.extname() 获取后缀名
 * path.basename() 获取基础名
 */
let name1 = path.extname(url)
let name2 = path.basename(url)
let name3 = path.basename(url, name1)
console.log(name1) // .html
console.log(name2) // index.html
console.log(name3) // index

/**
 * node中的相对位置是基于文件执行的位置，不是文件所在的位置
 * 为了防止出现不必要的问题，一般使用绝对路径
 * __dirname 获取文件所在位置的目录（使用较多）
 * __filename 获取文件的位置
 * path.join()可以智能进行路径拼接
 */
url = path.join(__dirname, './txt/01.txt')
fs.readFile(url, 'utf8', (err, data) => {
	if (err) return console.log(err.message)
	console.log(data)
})