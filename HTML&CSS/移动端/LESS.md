# LESS

Less是一个CSS预处理器，后缀名是`.less`。

扩充了CSS语言，使CSS具备了一定的逻辑性、计算能力。

浏览器直接引入less有兼容问题，一般习惯还是引入编译后的css文件。

详情可见：https://less.bootcss.com/

## 一、在开发工具中使用less

### 1.1 vscode

在vscode中使用less很简单，通过在插件市场中搜索Easy Less，然后安装对应插件即可。

作用：保存less文件生成对应的css

### 1.2 webstorm

安装less：npm install -g less （全局安装less，具体参考文档）

在偏好设置中找到tools，找到里面的file watcher，新添加一个监视less，一般会默认配置好。

新建less后缀文件即可自动编译成css文件。

## 二、Less基础语法

### 2.1 注释

单行注释：//  单行注释只在less中有用，不会生成到编译后的css文件中

块注释：/**/

### 2.2 运算

加、减、乘法直接书写计算表达式

除法需要添加小括号或.，工作中多用小括号形式

注意：less4.0之前加减乘除都可以直接写，4.0后除法需要加小括号或点。

### 2.3 嵌套

嵌套的作用是快速生成后代选择器

语法：

```less
父选择器 {
  父选择器样式
  
  子选择器 {
    子选择器样式 
  }
}
```

注意：`&`不生成后代选择器，表示当前选择器，通常配合`伪类或者伪元素`使用。

### 2.4 变量

less支持变量，方便使用和修改。

如：把颜色存储在变量中，设置属性值为变量名。

语法：

- 定义变量：`@变量名：值；`
- 使用变量：`CSS属性：@变量名；`

### 2.5 导入其他less文件

现在有common.less 和base.less，如何在index.less中引入这些公共文件？

方法1:把生成的css文件通过link链接到网页中

方法2:less导入

语法：`@import "文件路径";`，导入文件一般放在文件开头。

如果导入的是less文件，可以省略后缀名。

可以导入多个文件，注意一定要加分号，import后要有空格。

### 2.6 导出css文件

默认情况下，less编译的css文件会和less一个文件夹，但实际工作中，css和less一般都是分开的。

1、配置EasyLess插件，实现所有less有相同的导出路径

​	设置 ——> 搜索EasyLess  ——> 在setting.json中添加如下代码

```json
"less.compile":{
  "out":"路径"
  "out":" ../css/"
}
```

2、在webstorm中可以在file watcher中的less监测中配置

<img src="https://cdn.jsdelivr.net/gh/yuhuo2022/pic-bed/web/pic202204122156242.png" alt="image-20220412215634254" style="zoom:50%;" />

3、某个文件单独导出到指定文件

在要导出的less文件开头添加：

```less
// out: 路径
如：// out:./abc/
```

注意：不要引号也不要加分号

在控制导出路径时也可以控制导出文件名

```less
// out:./abc/xx.css
```

4、在项目中，有时候是不需要导出css文件的，这种可以配置禁止导出

在less文件第一行添加：

```less
// out:false
```

比如公共样式、初始化样式等。