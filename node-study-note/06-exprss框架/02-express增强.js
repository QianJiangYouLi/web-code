import express from 'express'
// 创建express实例对象
const app = express()
//编写接口
app.get('/api/getbooks', (req, res) => {
  // send()方法是express新增的方法，任何数据都可以转为字符串类型，识别中文
  res.send({
    code:200,
    msg:'获取图书列表成功',
    data:['昭如日月','硬核快穿','吾命将休']
  })
})
app.post('/api/addbook', (req, res) => {
  res.send({
    code:200,
    msg:'添加图书成功'
  })
})
// 启动服务
app.listen(8080, () => {
  console.log('服务器启动成功，请访问http://localhost:8080')
})