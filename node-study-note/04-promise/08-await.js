// await只能出现在async修饰的函数中
// 定义async修饰的函数，用于获取一个promise对象
async function getPromise() {
  return 'getPromised()的返回值'
}
async function fn(){
  console.log(1)
  // await后面跟随的是一个promise对象;
 let result =  await getPromise()
  // await能停止代码执行，让后面的同步代码，先执行;
  console.log(result) // await返回的是: Promise对象中的then()中的回调函数中的参数res;
  console.log(2)
}

fn()
console.log('页面中最后一行代码')