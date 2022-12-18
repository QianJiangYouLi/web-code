import express from 'express'
// 创建express实例对象
const app = express()
//编写接口
app.get('/api/getbooks', (req, res) => {
  // res响应数据
  // end()方法是http模块的方法，只能传递字符串类型，不能识别中文
  res.end('获取图书列表成功')
})
app.post('/api/addbook', (req, res) => {
  res.end('添加图书成功')
})
// 启动服务
app.listen(8080, () => {
  console.log('服务器启动成功，请访问http://localhost:8080')
})