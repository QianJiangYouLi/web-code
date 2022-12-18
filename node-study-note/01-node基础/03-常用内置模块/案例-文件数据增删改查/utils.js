// 对文件数据进行增删改查模块
const fs = require('fs')
const path = require('path')

const url = path.join(__dirname, './data.json')

// 查询
function getData() {
	// 读取文件内容
	fs.readFile(url, 'utf8', (err, data) => {
		if (err) return console.log(err.message)
		// console.log(JSON.parse(data))
		// 处理空文件问题
		const arr = data === '' ? [] : JSON.parse(data)
		console.log(arr)
	})
}

// 添加 读取文件信息，添加到数组中，然后再写入文件
function addData(obj) {
	fs.readFile(url, 'utf8', (err, data) => {
		if (err) return console.log(err.message)
		const arr = data === '' ? [] : JSON.parse(data)
		// 传递的对象添加到数组
		obj.id = arr[arr.length - 1].id * 1 + 1 // 数组最后一项id加1
		arr.push(obj)
		// 写到文件中
		fs.writeFile(url, JSON.stringify(arr), err => {
			if (err) return console.log(err.message)
			console.log('添加成功')
		})
	})
}

// 删除 读取文件信息，删除指定内容，然后再写入文件
function delData(id) {
	fs.readFile(url, 'utf8', (err, data) => {
		if (err) return console.log(err.message)
		const arr = data === '' ? [] : JSON.parse(data)
		
		// filter过滤数组,传递的id不等于对象的id，存放到新数组中
		const newArr = arr.filter(item => item.id !== id)
		
		fs.writeFile(url, JSON.stringify(newArr), err => {
			if (err) return console.log(err.message)
			console.log('删除成功')
		})
	})
}

// 修改,读取文件信息，修改指定内容，然后再写入文件
function editData(obj) {
	fs.readFile(url, 'utf8', (err, data) => {
		if (err) return console.log(err.message)
		const arr = data === '' ? [] : JSON.parse(data)
		/**
		 * 修改数组内容 查找索引值，找到后用传入的obj覆盖原有属性（太繁琐）
		 * 修改数组内容 查找索引值，先删除，再添加(推荐)
		 */
						// 查找索引
		let index = arr.findIndex(item => item.id === obj.id)
		// 删除,再添加
		arr.splice(index, 1, obj)
		// 写到文件中
		fs.writeFile(url, JSON.stringify(arr), err => {
			if (err) return console.log(err.message)
			console.log('修改成功')
		})
	})
}

module.exports = {
	getData,
	addData,
	delData,
	editData
}