console.log(1)
//异步代码在所有同步代码执行完后才执行
setTimeout(function () {
  console.log(2)
}, 1000)
console.log(3)
// 结果：1，2，3