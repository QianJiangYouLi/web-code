import express from 'express'

const app = express()
app.get('/api/getbooks/:password', (req, res) => {
  /**
   * req.query 查询参数，在在路径最末尾，用？分隔 ?name=谭昭&age=24
   * req.params 路由参数（url参数），写在路径的？前面。设置 /api/getbooks/:password
   */
  console.log(req.query)
  console.log(req.params)
  res.send({
    code: 200,
    msg: '获取图书列表成功',
    data: [ '昭如日月', '硬核快穿', '吾命将休' ]
  })
})
/**
 * 请求体参数，需要设置:
 * 请求体接收application/x-www-form-urlencoded类型参数：设置app.use(express.urlencoded())
 * 请求体接收application/json类型参数：设置app.use(express.json())
 * 请求体接收application/form-data类型参数：要先下载mulyer第三方模块，设置app.use(upload.single('avatar'))
 */
app.use(express.urlencoded({ extended: false })) // 解码，接收数据，并转为对象类型
app.use(express.json())
import multer from 'multer'

const upload = multer({ dest: './uploads' }) // 设置文件存储路径
app.use(upload.single('avatar'))
app.post('/api/addbook', (req, res) => {
  console.log(req.body)
  console.log(req.file) // 文件参数
  res.send({
    code: 200,
    msg: '添加图书成功'
  })
})
app.listen(8080, () => {
  console.log('服务器启动成功，请访问http://localhost:8080')
})