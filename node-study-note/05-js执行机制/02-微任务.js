// 异步-宏任务
setTimeout(() => {
  // 执行后，回调一个宏事件
  console.log(1)
}, 0)
// 同步
console.log(2)
// 同步
new Promise(resolve => {
  console.log(3)
  resolve()
}).then(() => { // then，异步，微任务
  console.log(4)
}).then(() => {
  console.log(5)
})
console.log(6)
// 结果 2，3，6，4，5，1
// 总结：JS先执行同步代码，然后是异步代码中的微任务，最后执行异步中宏任务