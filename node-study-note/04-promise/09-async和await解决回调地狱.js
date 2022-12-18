import thenFs from 'then-fs'

async function read() {
  // 处理异常
  try {
    // 正常执行的代码
    console.log(await thenFs.readFile('./txt/a.txt', 'utf8'))
    console.log(await thenFs.readFile('./txt/b.txt', 'utf8'))
    console.log(await thenFs.readFile('./txt/c.txt', 'utf8'))
  } catch (e) {
    // 捕获到了异常，执行这里的代码
    console.log(e.message)
  } finally {
    // 无论是否有异常，都会执行的代码
    console.log('代码执行完毕')
  }
}

read()