console.log(1)
new Promise((resolve) => {
  console.log(2)
  resolve('abc')
  console.log(3)
}).then(res => {
  console.log(4)
  console.log(res)
  console.log(5)
})
console.log(6)

// 结果：1，2，3，6，abc，4，5