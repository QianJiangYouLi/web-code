import fs from 'fs'

/*
* 封装一个函数，获取一个Promise对象
*  */
function getPromise(url) {
  return new Promise((resolve) => {
            fs.readFile(url, 'utf8', (err, data) => {
              resolve(data)
            })
          }
  )
}

getPromise('./txt/a.txt').then(res => {
  console.log(res)
  return getPromise('./txt/b.txt')
}).then(res => {
  console.log(res)
  return getPromise('./txt/c.txt')
}).then(res => {
  console.log(res)
})