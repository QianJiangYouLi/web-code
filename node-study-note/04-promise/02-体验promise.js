import fs from 'fs'
// 实例化Promise对象,参数是函数，函数内是异步代码
const p = new Promise((resolve, reject) => {
  fs.readFile('./txt/a.txt', 'utf8', (err, data) => {
    if (err == null) {
      resolve(data) // 读取成功结果
    } else {
      reject(err) // 读取失败结果
    }
  })
})

// 处理Promise异步结果
// 方式1： then(成功回调,失败回调)
p.then(res => console.log(res), err => console.log(err.message))

// 方式2： then(成功回调).catch(失败回调)
p.then(res => console.log(res)).catch(err => console.log(err.message))