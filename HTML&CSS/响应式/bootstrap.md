## 一、媒体查询

学习媒体查询的目的：

1. 了解如何使用媒体查询做响应式页面。
2. 为学的 Bootstrap  做铺垫。

媒体查询会写如下代码即可：

~~~css
body {
    background-color: gray;
}

/* 大于等于768px 为粉色 */
@media (min-width: 768px) {
    body {
        background-color: pink;
    }
}

/* 大于等于992px 为蓝色 */
@media (min-width: 992px) {
    body {
        background-color: skyblue;
    }
}

/* 大于等于992px 为绿色 */
@media (min-width: 1200px) {
    body {
        background-color: green;
    }
}
~~~

### 媒体查询使用场景1

约束移动端不要超过规定大小

~~~css
body {
    max-width: 540px;
    margin: 0 auto;
}

/* 大于等于540px 则不允许  html文字大小再改动，强制定为 54px*/
@media (min-width: 540px) {
    html {
        font-size: 54px !important;
    }
}
~~~

### 媒体查询使用场景2

元素的显示和隐藏

~~~css
@media (max-width: 800px) {
    .box div:nth-child(2) {
        display: none;
    }

    .box div:last-child {
        width: 350px;
    }
}
~~~

### 媒体查询使用场景3

响应式原理

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
      width: 1000px;
      height: 150px;
      /* background-color: pink; */
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
    }

    .box div {
      width: 25%;
      background-color: skyblue;
      height: 150px;
      margin-bottom: 20px;
    }

    .box div:nth-child(even) {
      background-color: pink;
    }

    @media (max-width: 992px) {
      .box {
        width: 768px;
      }

      .box div {
        width: 50%;
      }
    }

    @media (max-width: 768px) {
      .box {
        width: 100%;
      }

      .box div {
        width: 100%;
      }
    }
  </style>
</head>

<body>
  <div class="box">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>
</body>

</html>
~~~



## 二、Bootstrap 

Bootstrap 是由 Twitter 公司开发维护的前端 **UI 框架**，它提供了大量编写好的 CSS 样式，允许开发者结合一定 HTML 结构及JavaScript，快速编写功能完善的网页及常见交互效果。

中文官网: <https://www.bootcss.com/>

下载安装包。

开发中，我们都是**按需导入**，简单理解，需要用到啥，我们复制那个文件，没有必要都放入，提高性能。

使用步骤：

1. 复制 css文件

    ![63837279259](https://cdn.jsdelivr.net/gh/yuhuo2022/pic-bed/web/pic202204130130132.png)

   并且引入到html文件中

   ~~~html
   <link rel="stylesheet" href="./css/bootstrap.min.css">
   ~~~

2. 复制字体图标文件夹

    ![63837284310](https://cdn.jsdelivr.net/gh/yuhuo2022/pic-bed/web/pic202204130130179.png)

3. 如果需要js，则复制js文件，并引入html文件中

   ~~~html
   <script src="./js/bootstrap.min.js"></script>
   ~~~

4. 使用内部预定义好的类即可。

   ~~~html
   <div class="container">我的内容</div>
   ~~~

## 三、栅格系统

栅格系统(gridsystems),也叫“网格系统，它就是通过一系列的行（row）与列（column）的组合创建页面布局。

简单说，栅格系统也是一种布局方式。 BootStrap 给咱们内置好了一套布局系统。

BootStrap3默认将网页分成**12等份**

|              |    超小屏     |       小屏        |     中等屏幕      |       大屏幕       |
| :----------: | :-----------: | :---------------: | :---------------: | :----------------: |
| **响应断点** | **小于768px** | **大于等于768px** | **大于等于992px** | **大于等于1200px** |
|     别名     |      xs       |        sm         |        md         |         lg         |
|   容器宽度   |     100%      |       750px       |       970px       |       1170px       |
|  **类前缀**  | **col-xs-***  |   **col-sm-***    |   **col-md-***    |    **col-lg-***    |
|     列数     |      12       |        12         |        12         |         12         |
|    列间隙    |     30px      |       30px        |       30px        |        30px        |

比如，超大屏幕下我们想要一个通栏的大盒子

~~~html
 <div class="container">
    <div class="col-lg-12">我自己独占一行</div>
  </div>
~~~

又比如，超大屏幕下，我们想要一行左右来分

~~~html
<div class="container">
    <div class="col-lg-6">我占左边6个</div>
    <div class="col-lg-6">我站右边6个</div>
</div>
~~~

![63837547481](https://cdn.jsdelivr.net/gh/yuhuo2022/pic-bed/web/pic202204130130130.png)

超大屏下，如果一行放4个，怎么做呢？

~~~css
 <div class="container">
    <div class="col-lg-3">我占左边3个</div>
    <div class="col-lg-3">我站右边3个</div>
    <div class="col-lg-3">我站右边3个</div>
    <div class="col-lg-3">我站右边3个</div>
  </div>
~~~

如果实现不同屏幕下，不同的显示个数，可以通过使用不同类名。

还是这4个盒子，如果在中等屏幕下放3个怎么做呢？

~~~css
 <div class="container">
    <div class="col-lg-3 col-md-4">盒子内容</div>
    <div class="col-lg-3 col-md-4">盒子内容</div>
    <div class="col-lg-3 col-md-4">盒子内容</div>
    <div class="col-lg-3 col-md-4">盒子内容</div>
  </div>
~~~



还是这4个盒子，如果在小屏幕下放2个怎么做呢？

~~~css
<div class="container">
    <div class="col-lg-3 col-md-4 col-sm-6">盒子内容</div>
    <div class="col-lg-3 col-md-4 col-sm-6">盒子内容</div>
    <div class="col-lg-3 col-md-4 col-sm-6">盒子内容</div>
    <div class="col-lg-3 col-md-4 col-sm-6">盒子内容</div>
  </div>
~~~



还是这4个盒子，如果在超小屏幕下放1个怎么做呢？

~~~css
 <div class="container">
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">盒子内容</div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">盒子内容</div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">盒子内容</div>
    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">盒子内容</div>
  </div>
~~~

### row 类

row 可以去掉container默认的内边距

## 列偏移

列偏移 通过  col-lg-offset-*  

让盒子往右侧走，左边有几份

比如：

~~~css
    .first div {
      height: 100px;
      background-color: pink;
    }

    .second div {
      background-color: purple;
      height: 100px;
    }

    .third div {
      height: 100px;
      background-color: skyblue;
    }

~~~

~~~html
  <div class="container">
    <div class="row first">
      <div class="col-lg-4">左侧</div>
      <div class="col-lg-4 col-lg-offset-4">右侧</div>
    </div>
    <div class="row second">
      <div class="col-lg-3 col-lg-offset-3">1侧</div>
      <div class="col-lg-3 col-lg-offset-3">2侧</div>
    </div>
    <div class="row third">
      <div class="col-lg-6 col-lg-offset-3"></div>
    </div>
  </div>

~~~

效果如下：

![63849848929](https://cdn.jsdelivr.net/gh/yuhuo2022/pic-bed/web/pic202204130131149.png)

## 列嵌套

一个盒子里面可以再嵌套其他的盒子，但是站在这个盒子的角度来看，他又分为了12份。

~~~css
.container .row div {
      height: 100px;
      background-color: pink;
    }
~~~

~~~html
<div class="container">
    <div class="row">
      <div class="col-lg-4">
        <p class="col-lg-6">登录</p>
        <p class="col-lg-6">注册</p>
      </div>
      <div class="col-lg-4">2</div>
      <div class="col-lg-4">3</div>
    </div>
  </div>
~~~

效果：

![63850012795](https://cdn.jsdelivr.net/gh/yuhuo2022/pic-bed/web/pic202204130131851.png)















