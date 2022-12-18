# 01-认识express

Express是基于 Node.js 平台，快速、开放、极简的 Web 开发框架。

Express的作用和 Node.js 内置的 http 模块类似，是专门用来创建 Web 服务器的。

**Express的本质**:就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。

Express的中文官网: http://www.expressjs.com.cn/

对于前端程序员来说，最常见的两种服务器，分别是:

- Web 网站服务器:专门对外提供 Web 网页资源的服务器。

- API 接口服务器:专门对外提供 API 接口的服务器。

使用 Express，可以方便、快速的创建 Web 网站的服务器或 API 接口的服务器。

# 02-Express的基本使用

## 安装

```bash
npm i express@4.17.1
```

## 基本使用

### 创建基本web服务器

```js
// 导入express模块
const express = require('express')
// 创建express服务器
const app = express()
// 监听服务器端口，启动服务器
app.listen(80, () => console.log('express server running at http://127.0.0.1'))
```

### 监听GET请求和监听POST请求并响应内容

通过 `app.get()` 方法，可以监听客户端的 GET 请求

通过 `app.post(`) 方法，可以监听客户端的 POST 请求

通过` res.send()` 方法，可以把处理好的内容，发送给客户端

```js
/**
 * app.get()监听get请求，app.post()监听post请求
 * 参数1：url地址
 * 参数2：请求对应的回调函数
 *    req：请求对象，包含了与请求相关的属性和方法
 *    res：响应对象，包含了与响应相关的属性和方法
 */
app.get('/user', (req, res) => {
  // res.send()向客户端响应数据
  res.send({name: 'YuHuo', age: 24, gender: 'male'})
})
app.post('/user', (req, res) => {
  res.send('请求成功')
})

```

### 获取URL中携带的查询参数

通过 `req.query` 对象，可以访问到客户端通过`查询字符串`的形式，发送到服务器的参数

默认情况下，req.query是空对象。

```js
app.get('/', (req, res) => {
  console.log(req.query)
  res.send(req.query)
})
```

### 获取URL中的动态参数

通过 `req.params` 对象，可以访问到 URL 中，通过`:`匹配到的动态参数

```js
app.get('/user/:id', (req, res) => {
  // req.params是动态匹配到的URL参数，默认是空对象
  console.log(req.params)
  res.send(req.params)
})
```

## 托管静态资源

express提供了`express.static()`方法用于托管静态资源。通过它，可以非常方便地创建一个静态资源服务器。

>**注意:**Express在指定的静态目录中查找文件，并对外提供资源的访问路径。因此，存放静态文件的目录名不会出现在 URL 中。

如果要托管多个静态资源目录，请多次调用express.static() 函数

```js
// 托管静态资源
app.use(express.static('./clock'))
app.use(express.static('./files'))
```

如果希望在托管的静态资源访问路径之前，`挂载路径前缀`，则可以使用如下的方式:

```js
// 挂载路径前缀
app.use('/public', express.static('./files'))
```

# 03-Express路由

广义上来讲，路由就是映射关系。

在Express中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

Express中的路由分3部分组成，分别是`请求的类型、请求的URL地址、处理函数`

## 路由的匹配过程

每当一个请求到达服务器之后，``需要先经过路由的匹配``，只有匹配成功之后，才会调用对应的处理函数。

在匹配时，会按照路由的顺序进行匹配，如果`请求类型和请求的URL`同时匹配成功，则 Express 会将这次请求，转交给对应的函数进行处理。

路由匹配的注意点:

>1. 按照定义的先后顺序进行匹配
>2. 请求类型和请求的URL同时匹配成功，才会调用对应的处理函数

## 路由的使用

### 最简单的用法

在Express中使用路由最简单的方式，就是把路由挂载到app上。

```js
app.get('/user', (req, res) => res.send({name: 'YuHuo', age: 24, gender: 'male'}))
app.post('/user', (req, res) => res.send('请求成功'))
```

### 模块化路由

为了方便对路由进行模块化的管理，Express不建议将路由直接挂载到app上，而是推荐将路由抽离为单独的模块。

将路由抽离为单独模块的步骤如下:

1. 创建路由模块对应的 .js 文件
2. 调用`express.Router()` 函数创建路由对象
3. 向路由对象上挂载具体的路由
4. 使用`module.exports`向外共享路由对象
5. 使用`app.use()`函数注册路由模块

```js
// router.js
const express = require('express')
// 创建路由对象
const router = express.Router()
// 挂载具体路由
router.get('/user/list', (req, res) => {
  res.send('Get user list')
})
router.post('/user/add', (req, res) => {
  res.send('Add new user')
})
// 向外导出路由对象
module.exports = router
```

```js
// app.js


// 导入路由模块
const router = require('./router')
// 注册路由模块
app.use(router)
```

为路由模块添加前缀:

类似于托管静态资源时，为静态资源统一挂载访问前缀一样，路由模块也可以添加前缀。

```js
// 添加路由前缀
app.use('/api', router)
```

# 04-Express中间件



中间件(Middleware)，特指业务流程的中间处理环节。

Express中间件的调用流程:当一个请求到达 Express 的服务器之后，可以连续调用多个中间件，从而对这次请求进行`预处理`。

Express的中间件，本质上就是一个处理函数，Express中间件的格式如下:

```js
app.get('/',(req,res,next)=>{
  next()
})
```

注意：

>中间件函数的形参列表中，必须包含next参数。而路由处理函数中只包含req和res。

`next`函数是实现`多个中间件连续调用`的关键，它表示把流转关系`转交`给下一个`中间件或路由`。

中间件作用：多个中间件之间，`共享同一份req和res`。基于这样的特性，可以在上游的中间件中，统一为req或res对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

## 定义中间件函数

```js
const mw= (req,res,next) => {
  console.log('这是一个最简单的中间件')
  // 中间件流程处理完毕后必须调用next函数，把流转关系交给下个中间件或者路由
  next()
}
```

## 全局中间件

客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。

通过调用`app.use(中间件函数)`，即可定义一个全局生效的中间件

```js
// 全局生效中间件
app.use(mw)
```

简化全局中间件定义：

```js
app.use((req,res,next) => {
  console.log('这是一个最简单的中间件')
  next()
})
```

定义多个全局中间件：可以使用app.use()连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用。

## 局部中间件

不使用app.use() 定义的中间件，叫做局部生效的中间件。

```js
const mw1= (req,res,next) => {
  console.log('这是一个最简单的中间件')
  next()
}
app.get('/',nw1,(req,res)=>{
  res.send('/')
})
```

可以在路由中，通过如下两种等价的方式，使用多个局部中间件:

```js
app.get('/',mw1,mw2,(req,res)=>{res.send('/')})
app.get('/',[mw1,mw2],(req,res)=>{res.send('/')})
```

## 中间件的注意事项

(1) 一定要在路由之前注册中间件

(2) 客户端发送过来的请求，可以连续调用多个中间件进行处理

(3) 执行完中间件的业务代码之后，不要忘记调用 next() 函数

(4) 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码

(5) 连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象

## 中间件分类

Express官方把常见的中间件用法分成了5大类：

- 应用级别的中间件：通过app.use()或app.get()或app.post() ，`绑定到app实例上的中间件`，叫做应用级别的中间件
- 路由级别的中间件：`绑定到 express.Router() 实例上的中间件`，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到app实例上，路由级别中间件绑定到router实例上。
- 错误级别的中间件：
  - 专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题
  - **格式**:`错误级别中间件的处理函数中，必须有 4 个形参，形参顺序从前到后，分别是 (err, req, res, next)`
  - **`错误级别的中间件，必须注册在所有路由之后`**
- Express内置的中间件：自Express 4.16.0 版本开始，Express 内置了3个常用的中间件，极大的提高了Express项目的开发效率和体验
  - `express.static `快速托管静态资源的内置中间件，例如: HTML 文件、图片、CSS 样式等(无兼容性)
  - `express.json` 解析 JSON 格式的请求体数据(有兼容性，仅在 4.16.0+ 版本中可用)
  - `express.urlencoded` 解析 URL-encoded 格式的请求体数据(有兼容性，仅在 4.16.0+ 版本中可用)
- 第三方的中间件:非Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。
  - 在项目中，可以通过包管理工具按需下载并配置第三方中间件，从而提高项目的开发效率。

```js
// 配置内置中间件解析表单中的JSON格式数据
app.use(express.json())
// 配置内置中间件解析表单中的urlencoded格式数据
app.use(express.urlencoded({extended: false}))

app.post('/user', (req, res) => {
  // 服务器中使用req.body属性接收来自客户端请求体数据
  // 默认情况下，不配置解析表单数据的中间件req.body为undefined
  console.log(req.body)
  res.send('ok')
})
app.post('/book', (req, res) => {
  console.log(req.body)
  res.send('ok')
})
```

## 自定义中间件

自己手动模拟一个类似于 express.urlencoded 这样的中间件，来解析 POST 提交到服务器的表单数据。

实现步骤:

1. 定义中间件
2. 监听req的data事件
3. 监听req的end事件
4. 使用 querystring 模块解析请求体数据 
5. 将解析出来的数据对象挂载为 req.body
6. 将自定义中间件封装为模块

```js
// custom-boay-parser.js
const qs = require('querystring')
const customBodyParser = (req, res, next) => {
  // 监听req的data事件，data可能会触发多次，数据量过大会分批发送，需要手动拼接
  // str用来存储客户端发送过来的数据
  let str = ''
  req.on('data', (chunk) => {
    str += chunk
  })
  // 监听end事件，处理完整请求体数据
  req.on('end', () => {
    // 把字符串格式转换为对象格式
    const body = qs.parse(str)
    // 把body挂载到req
    req.body = body
    next()
  })
}
module.exports = customBodyParser
```

```js
// app.js

// 导入封装好的自定义中间件
const customBodyParser = require('./custom-body-parser')
// 注册为全局组件
app.use(customBodyParser)
```

# 05-基于Express写接口

## 创建基本服务器

```js
const express = require('express')
const app = express()
app.listen(80, () => console.log('express server running at http://127.0.0.1'))
```

## 创建API路由模块

```js
// apiRouters.js

const express = require('express')
const router = express.Router()

module.exports = router


// --------------------------
// app.js

// 配置表单解析中间件
app.use(express.urlencoded({extended: false}))

// 导入路由
const apiRouter = require('./apiRouters')
app.use('/api',apiRouter)
```

## 编写接口

```js
 // apiRouters.js

router.get('/get', (req, res) => {
  const query = req.query
  res.send({
    status: 0, // 0成功，1失败
    msg: 'GET请求成功', // 状态描述
    data: query // 响应数据
  })
})
router.post('/post', (req, res) => {
  const body = req.body
  res.send({
    status: 0,
    msg: 'POST请求成功',
    data: body
  })
})
```



## CORS跨域资源共享

CORS (Cross-Origin Resource Sharing，跨域资源共享)由一系列HTTP响应头组成，这些HTTP响应头决定浏览器是否阻止前端JS代码跨域获取资源。

浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了CORS相关的HTTP响应头，就可以解除浏览器端的跨域访问限制。

解决接口跨域问题的方案主要有两种：

- CORS(主流的解决方案，推荐使用)
- JSONP(有缺陷的解决方案:只支持 GET 请求)

cors是Express的一个第三方中间件。通过安装和配置cors中间件，可以很方便地解决跨域问题。 

使用步骤分为如下3步:

1. 运行 `npm install cors` 安装中间件
2. 使用`` const cors = require('cors')`` 导入中间件
3. 在路由之前调用 `app.use(cors()) `配置中间件

注意：

>CORS主要在服务器端进行配置，客户端浏览器无须做任何额外的配置，即可请求开启了 CORS 的接口。
>
>CORS在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口(例如:IE10+、Chrome4+、FireFox3.5+)

### CORS响应头部

（1）如果指定了 Access-Control-Allow-Origin 字段的值为通配符 *****，表示允许来自任何域的请求。

```js
res.setHeader(' Access-Control-Allow-Origin','*')
```

(2) Access-Control-Allow-Headers，默认情况下，CORS仅支持客户端向服务器发送如下的 9 个请求头:

Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、 Content-Type (值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一)

如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败!

```js
// 允许客户端额外发送Content-Type和X-custom-Header请求头
res.setHeader(' Access-Control-Allow-Headers','Content-Type,X-custom-Header')
```

（3）Access-Control-Allow-Methods，默认情况下，CORS仅支持客户端发起 GET、POST、HEAD 请求。

如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 Access-Control-Alow-Methods 来指明实际请求所允许使用的 HTTP 方法。

```js
// 只允许GET、POST、HEAD、DELETE请求方式
res.setHeader(' Access-Control-Allow-Methods','GET、POST、HEAD、DELETE')
// 允许所有HTTP请求方式
res.setHeader(' Access-Control-Allow-Methods','*')
```

### CORS请求的分类

客户端在请求 CORS 接口时，根据请求方式和请求头的不同，可以将 CORS 的请求分为两大类: 

1. 简单请求：同时满足以下两大条件的请求，就属于简单请求
   1. 请求方式:GET、POST、HEAD 三者之一
   2. HTTP头部信息不超过以下几种字段:无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、 Downlink、Save-Data、Viewport-Width、Width 、Content-Type(只有三个值application/x-www-form- urlencoded、multipart/form-data、text/plain)
2. 预检请求：只要符合以下任何一个条件的请求，都需要进行预检请求：
   1. 请求方式为 GET、POST、HEAD 之外的请求 Method 类型
   2. 请求头中包含自定义头部字段
   3. 向服务器发送了 application/json 格式的数据

在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTION 请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据。

简单请求的特点:客户端与服务器之间只会发生一次请求。

预检请求的特点:客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求。

### JSONP

概念:浏览器端通过`<script> `标签的`src`属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据

的方式叫做JSONP。

特点:

1. JSONP 不属于真正的 Ajax 请求，因为它没有使用 XMLHttpRequest 这个对象。 
2. JSONP 仅支持 GET 请求，不支持 POST、PUT、DELETE 等请求。

如果项目中已经配置了 CORS 跨域资源共享，为了**防止冲突**，必须在配置 CORS 中间件之前声明 JSONP 的接口。否则 JSONP 接口会被处理成开启了 CORS 的接口。

实现JSONP接口的步骤:

1. 获取客户端发送过来的回调函数的名字
2. 得到要通过 JSONP 形式发送给客户端的数据
3. 根据前两步得到的数据，拼接出一个函数调用的字符串
4. 把上一步拼接得到的字符串，响应给客户端的 <script> 标签进行解析执行

# 06-项目中使用MySQL数据库

项目中使用MySQL的基本步骤：

（1）安装操作MySQL数据库的第三方模块（mysql）

（2）通过mysql模块连接到MySQL数据库

（3)通过mysql模块执行SQL语句

## 连接数据库

安装第三方模块：

```bash
npm i mysql
```

连接：

```js
// 导入mysql模块
const mysql = require('mysql')
// 建立与MySQL数据库的连接关系
const db = mysql.createPool({
  host: '127.0.0.1', // 要连接的数据库ip地址
  user: '', // 账号
  password: '', // 密码
  database: 'hiolabsDB' // 要使用的数据库
})
// 测试连接是否成功
db.query('select 1', (err, result) => {
  // 连接失败
  if (err) return console.log(err.message)
  // 连接成功
  console.log(result) // 打印[ RowDataPacket { '1': 1 } ]表示成功
})
```

## 查询数据

```js
// 查询数据
const sqlStr = 'select * from test_user'
db.query(sqlStr, (err, data) => {
  if (err) return console.log(err.message)
  // select语句的执行结果是数组
  console.log(data)
})
```

## 插入数据

```js
// 插入数据
const user = {username: '李俊豪', password: '456789', gender: '男'}
// 要执行的插入语句，？表示占位
const insertSql = 'insert into test_user(username,password,gender) values(?,?,?)'
db.query(insertSql, [user.username, user.password, user.gender], (err, data) => {
  if (err) return console.log(err.message)
  if (data.affectedRows === 1) console.log('数据插入成功')
})
```

向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应,可以快捷插入：

```js
// 数据一一对应，可以便捷插入
const user = {username: '张子义', password: '567890', gender: '男'}
const insertSql = 'insert into test_user set ?'
db.query(insertSql, user, (err, data) => {
  if (err) return console.log(err.message)
  if (data.affectedRows === 1) console.log('数据插入成功')
})
```

## 更新数据

```js
const user = {id: 5, username: '胡力', password: '123456'}
const updateSql = 'update test_user set username=?,password=? where id=?'
db.query(updateSql, [user.username, user.password, user.id], (err, data) => {
  if (err) return console.log(err.message)
  if (data.affectedRows === 1) console.log('数据更新成功')
})
```

更新表数据时，如果数据对象的每个属性和数据表的字段一一对应，可以快捷更新：

```js
const user = {id: 5, username: '胡大力', password: '023456'}
const updateSql = 'update test_user set ? where id=?'
db.query(updateSql, [user, user.id], (err, data) => {
  if (err) return console.log(err.message)
  if (data.affectedRows === 1) console.log('数据更新成功')
})
```

## 删除数据

在删除数据时，推荐根据 id 这样的唯一标识，来删除对应的数据。

```js
// 删除数据
const deleteSql = 'delete from test_user where id= ? '
// sql语句中只有一个占位符可以省略数组，有多个则必须用数组
db.query(deleteSql, 5, (err, data) => {
  if (err) return console.log(err.message)
  if (data.affectedRows === 1) console.log('数据删除成功')
})
```

使用 DELETE 语句，会把真正的把数据从表中删除掉。为了保险起见，**推荐使用**标记删除的形式，来**模拟删除的动作**。

所谓的标记删除，就是在表中设置类似于 **status** 这样的**状态字段**，来**标记**当前这条数据是否被删除。

当用户执行了删除的动作时，并没有执行 DELETE 语句把数据删除掉，而是执行了 UPDATE 语句，将这条数据对应的 status字段标记为删除即可。

```js
// 标记删除
db.query('update test_user set status=? where id=?', [1,4], (err, data) => {
  if (err) return console.log(err.message)
  if (data.affectedRows === 1) console.log('数据删除成功')
})
```

# 07-身份认证

## web开发模式

目前主流的Web开发模式有两种，分别是:

1. 基于服务端渲染的传统Web开发模式
   1. 服务端渲染的概念:服务器发送给客户端的HTML页面，是在服务器通过字符串的拼接，动态生成的。因此，客户端不 需要使用Ajax这样的技术额外请求页面的数据。
   2. 优点：前端耗时少。因为服务器端负责动态生成 HTML 内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电；有利于SEO。因为服务器端响应的是完整的HTML页面内容，所以爬虫更容易爬取获得信息，更有利于SEO。
   3. 缺点：占用服务器端资源。即服务器端完成 HTML 页面内容的拼接，如果请求较多，会对服务器造成一定的访问压力。不利于前后端分离，开发效率低。使用服务器端渲染，则无法进行分工合作，尤其对于前端复杂度高的项目，不利于项目高效开发。
2. 基于前后端分离的新型Web开发模式
   1. 前后端分离的概念:前后端分离的开发模式，依赖于Ajax技术的广泛应用。简而言之，前后端分离的Web开发模式， 就是后端只负责提供API接口，前端使用Ajax调用接口的开发模式。
   2. 优点:**开发体验好**。前端专注于UI页面的开发，后端专注于api的开发，且前端有更多的选择性；**用户体验好**。Ajax技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新;**减轻了服务器端的渲染压力。**因为页面最终是在每个用户的浏览器中生成的。
   3. 缺点：**不利于SEO**。因为完整的 HTML 页面需要在客户端动态拼接完成，所以爬虫对无法爬取页面的有效信息。(解决方案:利用 Vue、React 等前端框架的SSR(server side render)技术能够很好的解决 SEO 问题!)

不谈业务场景而盲目选择使用何种开发模式都是耍流氓。

比如企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的SEO，则这时就需要使用服务器端渲染;

而类似后台管理项目，交互性比较强，不需要考虑SEO，那么就可以使用前后端分离的开发模式。

另外，具体使用何种开发模式并不是绝对的，为了**同时兼顾**了**首页的渲染速度**和**前后端分离的开发效率**，一些网站采用了首屏服务器端渲染 + 其他页面前后端分离的开发模式。

## 身份认证

**身份认证**(Authentication)又称“身份验证”、“鉴权”，是指通过一定的手段，完成对用户身份的确认。

在 Web 开发中，也涉及到用户身份的认证，例如:各大网站的手机验证码登录、邮箱密码登录、二维码登录等。

身份认证的目的，是为了确认当前所声称为某种身份的用户，确实是所声称的用户。

对于服务端渲染和前后端分离这两种开发模式来说，分别有着不同的身份认证方案: 

1. 服务端渲染推荐使用Session认证机制
   
2. 前后端分离推荐使用 JWT认证机制

###  Session 认证机制

Cookie 是存储在用户浏览器中的一段不超过4 KB的字符串。它由一个名称(Name)、一个值(Value)和其它几个用于控制 Cookie 有效期、安全性、使用范围的可选属性组成。
 不同域名下的 Cookie 各自独立，每当客户端发起请求时，会自动把当前域名下所有未过期的Cookie 一同发送到服务器。

Cookie的几大特性:自动发送、域名独立、过期时限、4KB限制

客户端第一次请求服务器的时候，服务器通过响应头的形式，向客户端发送一个身份认证的 Cookie，客户端会自动 将 Cookie 保存在浏览器中。

随后，当客户端浏览器每次请求服务器的时候，浏览器会自动将身份认证相关的 Cookie，**通过请求头的形式**发送给服务器，服务器即可验明客户端的身份。

由于 Cookie 是存储在浏览器中的，而且浏览器也提供了读写 Cookie 的 API，因此 Cookie很容易被伪造，不具有安全性。因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器。

注意：

>千万不要使用Cookie 存储重要且隐私的数据!比如用户的身份信息、密码等。

session工作原理：

![image-20221017175049798](https://pic1.imgdb.cn/item/634d25f616f2c2beb1103801.png)

### express使用Session

在 Express 项目中，只需要安装 express-session 中间件，即可在项目中使用 Session 认证:

```bash
npm i express-session
```

配置：

```js
//导入并配置session
const session = require('express-session')
app.use(session({
  secret: 'YuHuo',//属性值为自定义任意字符串
  resave: false, // 固定写法
  saveUninitialized: true // 固定写法
}))
```

当 express-session 中间件配置成功后，即可通过 `req.session`来访问和使用 session 对象，从而存储用户的关键信息。

```js
app.post('/api/login', (req, res) => {
  if (req.body.username !== 'admin' || req.body.password !== '000000') return res.send({status: 1, msg: '登录失败'})
  // 将登录成功后的用户信息保存到session中
  // 只有成功配置session才能用
  req.session.user = req.body
  req.session.isLogin = true // 存储用户的登录状态
  res.send({status: 0, msg: '登录成功'})
})
```

读取session中的数据:

可以直接从 `req.session` 对象上获取之前存储的数据

```js
app.get('/api/username', (req, res) => {
  if (!req.session.isLogin) return res.send({status: 1, msg: 'fail'})
  res.send({status: 0, msg: 'succss', username: req.session.user.username})
})
```

清空session:

调用`req.session.destroy() ` 函数，即可清空服务器保存的 session 信息。

```js
// 退出登录
app.post('/api/logout', (req, res) => {
  // 清空当前用户session信息
  req.session.destroy()
  res.send({status: 0, mes: '退出登录成功'})
})
```

### JWT 认证机制

Session认证机制需要配合 Cookie 才能实现。由于 Cookie 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域 Session 认证。

>当前端请求后端接口不存在跨域问题的时候，推荐使用 Session 身份认证机制。
>
>当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制。

JWT(英文全称:JSON Web Token)是目前最流行的跨域认证解决方案。

------

JWT工作原理：

用户的信息通过 Token 字符串的形式，保存在客户端浏览器中。服务器通过还原 Token 字符串的形式来认证用户的身份。

![image-20221018174255184](https://pic1.imgdb.cn/item/634e759d16f2c2beb1ab0da4.png)

------

JWT 的组成部分：

JWT 通常由三部分组成，分别是 Header(头部)、Payload(有效荷载)、Signature(签名)。

三者之间使用英文的`.`分隔。

`Payload` 部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串。

Header 和 Signature 是**安全性相关**的部分，只是为了保证 Token 的安全性。

------

JWT 的使用方式:

客户端收到服务器返回的 JWT 之后，通常会将它储存在 localStorage 或 sessionStorage 中。

此后，客户端每次与服务器通信，都要带上这个 JWT 的字符串，从而进行身份认证。

推荐的做法是把 JWT 放在 `HTTP 请求头的 Authorization 字段`中，格式如下:

```
Authorization:Bearer <token>
```

### express中使用JWT

安装相关包：

```bash
npm i jsonwebtoken@5.3.1 express-jwt@5.3.3
```

`jsonwebtoken`生成jwt字符串

`express-jwt`将jwt字符串解析还原成JSON对象

使用：

（1）导入相关包

```js
// 导入jsonwebtoken、express-jwt
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
```

（2）定义secret密钥

为了保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个用于**加密**和**解密** 的 secret 密钥:

- 当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串
- 当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密

```js
// 定义secret密钥
const secretKey = 'YuHuo2020^_^'
```

（3）调用 **jsonwebtoken** 包提供的 `sign(用户信息对象，加密密钥，配置对象（token有效期）)` 方法，将用户的信息加密成 JWT 字符串，响应给客户端:

```js
// 登陆
app.post('/api/login', (req, res) => {
  // 将 req.body 请求体中的数据，转存为 userinfo 常量
  const userinfo = req.body
  // 登录失败
  if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
    return res.send({
      status: 400,
      message: '登录失败！'
    })
  }
  // 登录成功
  // 在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  // 参数1：用户的信息对象
  // 参数2：加密的秘钥
  // 参数3：配置对象，可以配置当前 token 的有效期
  // 千万不要把密码加密到 token 字符中
  const tokenStr = jwt.sign({username: userinfo.username}, secretKey, {expiresIn: '60s'})
  res.send({
    status: 200,
    message: '登录成功！',
    token: tokenStr // 要发送给客户端的 token 字符串
  })
})

```

>不要将密码加密到token中

（4）将JWT字符串还原JSON对象

客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的 Authorization 字段，将 Token 字符串发送到服务器进行身份认证。

此时，服务器可以通过 express-jwt 这个中间件，自动将客户端发送过来的 Token 解析还原成 JSON 对象。

```js
// 注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
app.use(expressJWT({secret: secretKey}).unless({path: [/^\/api\//]}))
```

（5）使用 req.user 获取用户信息

当 express-jwt 这个中间件配置成功之后，即可在那些有权限的接口中，使用 req.user 对象，来访问从 JWT 字符串中解析出来的用户信息了。

```js
// 这是一个有权限的 API 接口
app.get('/admin/getinfo', (req, res) => {
  // 使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user)
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.user // 要发送给客户端的用户信息
  })
})
```

（6）捕获解析 JWT 失败后产生的错误

当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串过期或不合法，会产生一个解析失败的错误，影响项目的正常运行。

可以通过 Express 的错误中间件，捕获这个错误并进行相关的处理

```js
app.use((err, req, res, next) => {
  // token解析失败
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token'
    })
  }
  res.send({
    status: 500,
    message: '未知错误'
  })
})
```

