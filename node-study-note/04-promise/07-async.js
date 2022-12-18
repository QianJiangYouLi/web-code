/*
 async 用于修饰一个 function
 async 修饰的函数，总是返回一个 Promise 对象
 函数的返回值，将自动包装在 resolved 的 promise 中
*/
async function fn() {
  return 123
}

let a = fn()
console.log(a)
a.then(res => console.log(res))
// async本身是异步的意思，但不能让函数异步执行
console.log('end')