import fs from 'fs'

const p1 = new Promise((resolve) => {
          fs.readFile('./txt/a.txt', 'utf8', (err, data) => {
            resolve(data)
          })
        }
)
const p2 = new Promise((resolve) => {
          fs.readFile('./txt/b.txt', 'utf8', (err, data) => {
            resolve(data)
          })
        }
)
const p3 = new Promise((resolve) => {
          fs.readFile('./txt/c.txt', 'utf8', (err, data) => {
            resolve(data)
          })
        }
)
// 链式编程
p1.then(res => {
  console.log(res)
  return p2
}).then(res => { // 后一个then的调用者就是前一个then的返回值
  console.log(res)
  return p3
}).then(res => {
  console.log(res)
})