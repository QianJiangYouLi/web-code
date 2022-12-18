import fs from 'fs'
import thenFs from 'then-fs'

/*
// 比较两种方式的返回值
console.log(fs.readFile('./txt/a.txt','utf8', () => {

})) // undefined
console.log(thenFs.readFile('./txt/a.txt','utf8')) // Promise
 */

// 解决回调地狱
thenFs.readFile('./txt/a.txt', 'utf8').then(res => {
  console.log(res)
  return thenFs.readFile('./txt/b.txt', 'utf8')
}).then(res => {
  console.log(res)
  return thenFs.readFile('./txt/c.txt', 'utf8')
}).then(res => {
  console.log(res)
})