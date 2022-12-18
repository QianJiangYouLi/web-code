import express from 'express'
import cors from 'cors'
import utils from './utils.js'

const app = express()
// 处理参数问题
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// cors处理跨域，要写在所有接口之前
app.use(cors())

// 获取图书列表
app.get('/api/getbooks', async (req, res) => {
  // 调用获取图书列表方法
  let arr = await utils.getData()
  // // 设置头信息，允许跨域，比较繁琐
  // res.set({ 'Access-Control-Allow-Origin': '*' })
  res.send({
    code: 200,
    msg: '获取图书列表成功',
    data: arr
  })
})
// 添加图书
app.post('/api/addbook', async (req, res) => {
  // 参数校验
  if (!req.body.bookname) return res.send({
    code: 401,
    msg: '图书名称不能为空'
  })
  if (!req.body.author) return res.send({ code: 401, msg: '作者名称不能为空' })
  if (!req.body.publisher) return res.send({ code: 401, msg: '出版设不能为空' })
  // 调用添加图书方法
  let str = await utils.addData(req.body)
  if (str == '添加成功') {
    res.send({ code: 201, msg: '添加图书成功' })
  } else {
    res.send({ code: 501, msg: '添加图书失败' })
  }
})
// 删除图书
app.delete('/api/delbook', async (req, res) => {
  console.log(req.query)
  if (!req.query.id) return res.send({ code: 401, msg: 'id不能为空' })
  if (req.query.id <= 3) return res.send({
    code: 401,
    msg: '您没有权限删除id为1,2,3的图书'
  })
  let str = await utils.delData(req.query.id)
  if (str == '删除成功') {
    res.send({ code: 200, msg: '删除图书成功' })
  } else {
    res.send({ code: 201, msg: '删除图书失败' })
  }
})
app.listen(3006, () => console.log('服务器启动成功，请访问 http://localhost:3006'))