// 引入文件系统模块fs
const fs = require('fs')

/**
 *  readFile读取文件信息（异步方法）
 *  Node遵循错误优先，错误对象要往前放
 *  普通文本最好设置编码，图片、音视频不需要设置编码集
 *  读取文件出错，err是错误对象，有name和message两个属性
 *  读取文件成功，err为null，data就是文件内容
 */
fs.readFile('./txt/01.txt', 'utf8', (err, data) => {
	if (err !== null) {
		return console.log(err.message)
	}
	console.log(data)
})

/**
 * writeFile(路径，内容，回调)写入内容（异步方法）
 * 写入成功，err为null。写入失败，err是错误对象。
 * 文件没有内容，直接写入，有内容会覆盖
 * 文件不存在，会新增一个文件并写入内容
 * 文件夹不存在会报错
 *
 * 追加内容用appendFile方法
 */
const str = `
床前明月光，地上鞋两双。
床上狗男女，其中就有你！
`
fs.writeFile('./txt/01.txt', str, err =>{
	if(err) return console.log(err.message)
	console.log('写入成功')
})