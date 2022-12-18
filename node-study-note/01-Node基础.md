# 1-Node、nvm、npm、nrm、npx、yarn

## Node

Node是Node.js的简称，是基于Chrome V8引擎的开源跨平台JavaScript运行时。简单理解就是JavaScript的服务器端运行环境。

Node的版本分为长期维护版（LTS）和最新尝鲜版，开发时建议使用长期维护版。

截止到2022年10月，长期维护版16.18.0，最新尝鲜版18.10.0

安装Node：

下载安装包：https://nodejs.org/zh-cn/download/

根据系统下载对应安装包，下载完成后直接安装就行，没有需要特别注意的地方。

注意，安装Node的时候会自动安装npm，截止到2022年10月，npm的版本为8.19.2

## nvm

nvm是Node的版本管理工具，方便在不同的Node版本中穿梭。

mac安装nvm：

直接克隆仓库到本地：https://github.com/nvm-sh/nvm

进入nvm目录把`install.sh`拖到终端回车执行

配置环境变量：.bash_profile

```bash
export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 

 # This loads nvm

[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# This loads nvm bash_completio
```

执行`source ~/.bash_profile`让环境变量生效

在终端输入`nvm --version`看是否有版本号输出，没有就重启终端后执行。

>网上很多提供curl或者wegt安装的，域名都被污染，容易报错，不如直接克隆仓库来的快

nvm的常用命令：

`nvm list` 查看当前安装的node版本

`nvm install node版本号` 安装指定版本node，注意不指定版本号则安装最新版本

`nvm use node版本号` 切换当前使用的node版本

`nvm alias default node版本` 设置打开终端时默认使用的node版本

## npm

npm是一种包管理工具

常用命令与参数:

初始化package.json:`npm init -y`

全局安装包：`npm install -g <package>`

全局卸载包：`npm uninstall -g <package>`

局部安装：`npm install <package>` 

局部卸载：`npm uninstall <package>`

安装指定版本：`npm i <package>@版本`    i是install的缩写

查看已安装的包：`npm list`

查看包的所有版本：`npm view <package> version`

清空包缓存：`npm cache clean --force`

`-g`,  --global 全局

`-D`，--save-dev 开发环境使用的包

`-S`，--save 生产环境使用的包

## nrm

nrm是一个npm下载源切换工具，可以很方便的切换npm的下载源。

安装：`npm install -g nrm`

常用命令：

`nrm ls` 查看可用镜像源，带星号表示当前源

`nrm use 源名` 切换源，如 nrm use taobao

`nrm test` 测试镜像源的速度

## npx

npm 从5.2版开始，增加了 npx 命令。可以避免全局安装模块。

特别是一些Vue、React的构建命令。

想让 npx 强制使用本地模块，不下载远程模块，可以使用`--no-install`参数。如果本地不存在该模块，就会报错。

如果忽略本地的同名模块，强制安装使用远程模块，可以使用`--ignore-existing`参数

```bash
npx --no-install http-server
npx --ignore-existing create-react-app my-react-app
```

## yarn

Yarn 是一个包管理器。

全局安装：`npm install -g yarn`

输入`yanr --version`查看是否安装成功

初始化项目：`yarn init`

安装包：

```bash
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

将依赖项添加到不同的依赖类别中:

```bash
yarn add [package] --dev  # dev dependencies
yarn add [package] --peer # peer dependencies
```

更新依赖：

```bash
yarn up [package]
yarn up [package]@[version]
yarn up [package]@[tag]
```

删除依赖：

```bash
yarn remove [package]
```

更换淘宝源：

```bash
yarn config set registry https://registry.npm.taobao.org/
```

# 2-模块化

## 模块化基础

模块化是指解决一个复杂问题时，==自顶向下逐层把系统划分成若干部分的过程==，对整个系统来说，==模块是可组合、分解和更换的单元==。

编程领域的模块化就是==遵循固定规则==，把一个`大文件拆分成独立并互相依赖的多个小文件`。

好处：

- 提高代码复用性
- 提高代码可维护性
- 可以实现按需加载

模块化规范：代码进行模块化的拆分与组合时遵循的规则。如用什么语法引入模块，向外暴露成员。

模块化规范好处：共同遵循模块化规范，可以降低沟通成本，方便各个模块之间的相互调用。

## Node中的模块

Node中根据模块来源，将模块分为三类：

- 内置模块，Node官方提供
- 自定义模块，用户创建打的每个js文件
- 第三方模块，非官方提供的模块，而是第三方开发的，使用前需要下载

模块加载：使用`reqire()`方法，加载需要的内置模块、自定义模块和第三方模块

>使用require方法加载其他模块时会执行被加载模块中的代码
>
>require方法加载模块可以省略后缀名

## 自定义模块

模块作用域：自定义模块中定义的变量、方法等成员只能在当前模块内被访问，好处是防止全局变量污染。

向外共享模块作用域中的成员：

每一个自定义模块都有一个`module`对象，里面存储了和当前模块有关的信息。

自定义模块中，使用`module.exports`对象将模块内的成员共享出去供外界使用。

在默认情况下，module.exports是一个空对象，外界通过require导入的也是这个空对象。外界想要使用导入模块中的内容，需要暴露出去。

![image-20221015191720927](https://pic1.imgdb.cn/item/634a973916f2c2beb17a0987.png)

由于module.exports写起来比较复杂，为了简化向外共享成员的代码，Node提供了`exports`对象，**默认情况下，exports和module.exports指向同一个对象**。最终的共享结果还是以module.exports为准。

```js
console.log(exports===module.exports) // => true
```



>使用require()方法导入模块时，导入的结果以**module.exports指向的对象为准**
>
>同一个模块中，不要同时使用module.exports和exports

## CommonJS模块化规范

Node遵循CommonJS规范，CommonJS规定了模块特性和各模块之间如何相互依赖：

（1）每个模块内部，module变量代表当前模块

（2）module变量是一个对象，它的exports属性（即module.exports）是对外接口

（3）加载某个模块，其实就是加载该模块的module.exports属性。require()方法用于加载模块。

## 模块的加载机制

（1）优先从缓存中加载。模块在第一次加载后会被缓存，意味着多次调用require不会导致模块代码执行多次，从而提高执行效率。

（2）内置模块由于是官方提供的，加载优先级最高。

（3）自定义模块加载时，必须有路径标识符，没有则会被当做内置模块或者第三方模块加载。使用require导入自定义模块时，省略后缀名，node会按顺序分别尝试加载以下文件：

- 按照确切的文件名加载
- 补全js扩展名进行加载
- 补全json扩展名进行加载
- 补全node扩展名进行加载
- 加载失败，报错

（4）require加载的模块标识符既不是内置模块，也没有路径标识符，则node会从当前父目录开始，尝试从node_modules文件夹中加载第三方模块。如果没有找到，就移动到上一层父目录中进行加载，直到文件系统根目录。

（5）目录作为模块标识符传递给require加载是，有三种加载方式：

​	1.在被加载的目录下查找package.json文件，并寻找main属性作为加载入口

​	2.目录中没有package.json文件，或者main入口不存在或无法解析，则node会试图加载目录下的index.js文件

​	3.上面两步都失败，终端打印模块缺失错误消息：Error:Cannot find module ‘xxx’

## 常用内置模块

### url

- url.parse()

```js
// 第三方日志处理模块
const log4js = require('log4js')
const url = require('url')

// 将日志输出到cheese.log文件中，日志级别为debug
log4js.configure({
  appenders: {cheese: {type: "file", filename: "cheese.log"}},
  categories: {default: {appenders: ["cheese"], level: "debug"}}
})
const logger = log4js.getLogger("cheese")
const urlObj = {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.wxyyjb99.com',
  port: null,
  hostname: 'www.wxyyjb99.com',
  hash: '#1234567',
  search: '?name=%22苏白%22/',
  query: 'name=%22苏白%22/',
  pathname: '/index.html',
  path: '/index.html?name=%22苏白%22/',
  href: 'http://www.wxyyjb99.com/index.html?name=%22苏白%22/#1234567'
}
const urlString = 'http://www.wxyyjb99.com/index.html?name="苏白"/#1234567'

// url.parse()将url路径字符串解析为对象
logger.debug(url.parse(urlString))

// url.format()将url对象格式化为url地址
logger.debug(url.format(urlObj))

// 获取URL中的参数
const urlParams = new URLSearchParams(url.parse(urlString).search)
logger.debug(urlParams.get('name'))
```

### querystring

querystring模块对查询字符串进行处理

- querystring.parse()
- querystring.stringify()

```js
const log4js = require('log4js')
// url地址查询参数处理模块
const querystring = require('querystring')

log4js.configure({
  appenders: {cheese: {type: "file", filename: "cheese.log"}},
  categories: {default: {appenders: ["cheese"], level: "debug"}}
})
const logger = log4js.getLogger("cheese")

const query = 'id=01&name=苏白&age=24'
const query2 = 'id=01/name=苏白/age=24'
const queryEscape = 'id%3D01%26name%3D%E8%8B%8F%E7%99%BD%26age%3D24'
const queryObj = {id: '01', name: '苏白', age: 24}

// querystring.parse() 将查询参数转为对象形式
logger.debug(querystring.parse(query))

// querystring.escape() 对 URL 查询字符串的特定要求进行了优化的方式对给定的 str 执行 URL 百分比编码。
logger.debug(querystring.escape(query))

// querystring.unescape() 方法在给定的 str 上执行 URL 百分比编码字符的解码
logger.debug(querystring.unescape(queryEscape))

// querystring.stringify() 方法通过迭代对象的自身属性从给定的 obj 生成 URL 查询字符串。
logger.debug(querystring.stringify(queryObj,':','/'))
// logger.debug(querystring.stringify(query2,'/',':'))
const newQuery = querystring.stringify(queryObj, null, null, {
  encodeURIComponent(string) {
    return querystring.unescape(string)
  }
})
logger.debug(newQuery)
```

### http

Node官方提供的用于创建web服务器的模块，通过http.createServer()方法可以很容易创建web服务器。

- http.createServer()

```js
const http = require('http')
// 创建服务器
const server = http.createServer()
// 为服务器绑定request事件,监听客户端请求
server.on('request', (req, res) => {
  // req 请求对象，包含了与客户端相关的数据和属性
  const url = req.url
  const method = req.method
  const str = `您的请求地址是 ${url},请求方法是 ${method}`
  // 根据不同的地址响应不同的内容
  let content = '<h1 style="color: #f00">404 Not found!</h1>'
  if (url === '/' || url === 'index.html') {
    content = '<h1 style="color:#ffa500;">首页</h1>'
  } else if (url === '/about.html') {
    content = '<h1 style="color: #fa8072">关于页面</h1>'
  }
  console.log(str)
  // res 响应对象 end()方法结束本次请求，返回数据
  // 设置响应头处理中文乱码等问题
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  res.end(content)
})
// 监听端口8080
server.listen(8080, () => {
  console.log('server running at http://127.0.0.1:8080')
})
```

### fs

fs是官方提供的文件处理模块，可以进行io读写操作。

- fs.readFile
- fs.writeFile，只能创建文件，不能创建目录

```js
const logger = require('../../utils/log')
// 导入文件操作模块fs
const fs = require('fs')

// 读取文件 fs.readFile（文件路径[,编码格式],回调函数）
// 文件读写的回调遵循错误先行原则，读取成功，data就是成功内容，读取失败，err是错误对象，data为undefined
fs.readFile('/Users/mac/code/web-projects/nodeProject/modular/built-in-module/04-fs/files/01.txt', 'utf-8', (err, data) => {
  if (err) return logger.debug(err.message)
  logger.debug(data)
})
// fs.writeFile(文件路径，要写入的内容[,编码格式]，回调函数)
// 文件写入成功，err为null，写入失败，err为错误对象
const str = '清明时节雨纷纷，路上行人欲断魂，借问酒家何处有，牧童遥指杏花村。'
fs.writeFile(__dirname+'./files/02.txt', str, 'utf-8', (err) => {
  if (err) return logger.debug(err.message)
  logger.debug('文件写入成功')
})

```

文件读写要注意路径问题，可以使用绝对路径代替相对路径，防止路径动态拼接问题。但这种方式移植性很差，也不容易维护。

最好还是使用`__dirname`动态拼接路径。

### path

path是用来处理路径的模块。

- path.join()把多个路径片段拼接成完整的路径字符串
- path.basename() 获取路径最后一部分，通常用于获取路径中的文件名
- path.extname() 获取路径中的扩展名部分

>凡是涉及路径动态拼接，都可以使用path.join()

```js
const fs = require('fs')
const path = require('path')
// 注意：../会抵消一级路径拼接
const pathStr = path.join('/a', '/b/c', '../', './d', 'e')
console.log(pathStr) // => /a/b/d/e
// 路径动态拼接的真正使用方式
fs.writeFile(path.join(__dirname, './files/01.txt'), '路径拼接', 'utf-8', (err) => {
  if (err) return console.log(err.message)
  console.log('文件写入成功')
})

const fpath = '/a/b/c/index.html'
const fullName = path.basename(fpath)
console.log(fullName) // => index.html
// 不带扩展名
const nameWithoutExt = path.basename(fpath, '.html')
console.log(nameWithoutExt) // => index

// 获取路径中的扩展名
const ext = path.extname(fpath)
console.log(ext) // => .html
```

