# 1-模块与组件、模块化与组件化

## 模块与组件

模块：向外提供特定功能的js程序，一般一个模块就是一个js文件

组件：实现应用中的局部功能代码和资源的集合

## 模块化与组件化

当应用中的js都是以模块来编写，就是模块化，该应用就是模块化应用。

当应用中的功能都是以多组件方式来编写，就是组件化，该应用就是组件化应用。

# 2-非单文件组件

非单文件组件就是一个文件中包含N个组件。

与之对应的是单文件组件，就是一个文件中只包含一个组件。

## 组件的基本使用

Vue中使用组件分三大步：

（1）定义组件（创建组件）

（2）注册组件

（3）使用组件（写组件标签）

### 定义组件

使用`Vue.extend(options)`创建组件，其中options和new Vue(options)时传入的options几乎一样，但不能写el，data必须写成函数式。

- 最终所有的组件都要经过一个vm管理，由vm中的el决定服务于哪个容器
- data写成函数式可以避免组件复用时，数据存在引用关系
- 使用template配置项可以配置组件结构

```vue
  // 创建组件
  const company = Vue.extend({
    template: `
      <div>
      <p>公司名称：{{ companyName }}</p>
      <p>公司地址：{{ address }}</p>
      <button @click="showInfo">点我提示信息</button>
      </div>
    `,
    data() {
      return {
        companyName: '虹软科技有限公司',
        address: '虹软科技园'
      }
    },
    methods: {
      showInfo() {
        alert(this.companyName)
      }
    }
  })
```

### 注册组件

局部注册：在new Vue时传入`components`选项

全局注册：`Vue.component(‘组件名’,组件)`

```vue
// 注册全局组件
  Vue.component('hello', hello)
```

```vue
 new Vue({
    el: '#app',
    // 局部注册组件
    components: {
      company
    }
  })
```

### 使用组件

把注册好的组件名写成标签就行

```vue
  <!--使用组件-->
  <company></company>
```

## 组件的一些注意事项

（1）关于组件名

一个单词组成：

- 写法1：首字母小写 company
- 写法2：首字母大写 Company

多个单词组成：

- 写法1：kebab-case命名，my-company
- 写法2：CamelCase命名，MyCompany（需要Vue脚手架支持）

>组件名要尽可能回避html标签中已有的元素名
>
>可以使用name配置项指定组件在开发者工具中呈现的名字

（2）关于组件标签

写法1：双标签 `<company></company>`

写法2：单标签 `<company />`

>不使用脚手架时，单标签形式会导致后续组件不能渲染

（3）一个简写方式

`const company = Vue.extend(options)`可以简写成`const company = options`

```vue
<div id="app">
  <Company></Company>
</div>
<script src="../../lib/vue.js"></script>
<script>
  const Company = {
    name:'Company',
    template: `
      <div>
       <p>公司名称：{{ companyName }}</p>
       <p>公司地址：{{ address }}</p>
      </div>
    `,
    data() {
      return {
        companyName: '虹软科技有限公司',
        address: '虹软科技园'
      }
    }
  }

  new Vue({
    el: '#app',
    components: {
      Company
    }
  })
</script>
```

## 组件嵌套

在标准化开发中，会创造一个根组件用于管理所以得组件，一般会命名为app。

组件嵌套很常用，理解了组件的使用，嵌套也就不难。

```vue
<div id="app"></div>
<script src="../../lib/vue.js"></script>
<script>
  const Employee ={
    name: 'Employee',
    template: `
      <div>
      <p>员工职位：{{ position }}</p>
      <p>员工姓名：{{ name }}</p>
      </div>
    `,
    data() {
      return {
        position: '前端开发工程师',
        name: 'YuHuo'
      }
    }
  }
  
  const Company = {
    name: 'Company',
    template: `
      <div>
      <p>公司名称：{{ companyName }}</p>
      <p>公司地址：{{ address }}</p>
      <Employee></Employee>
      </div>
    `,
    data() {
      return {
        companyName: '虹软科技有限公司',
        address: '虹软科技园'
      }
    },
    components: {
      Employee
    }
  }
  
  const app = {
    name: 'APP',
    template: `
      <Company></Company>
    `,
    components: {
      Company
    }
  }

  new Vue({
    el: '#app',
    template: '<app></app>',
    components: {
      app
    }
  })
</script>
```

## VueComponent

组件本质是一个名为`VueComponent`的构造函数，并且不是自定义的，而是`Vue.extend`生成的。

只要在模板中使用了组件，Vue解析时会创建组件的实例对象，即Vue会执行：`new VueComponent(options)`。

>**每一次调用Vue.extend返回的都是一个全新的VueComponent**

关于this指向：

（1）组件配置中，data函数、methods中的函数、watch中的函数、computed中的函数，它们的this指向都是VueComponent。

（2）new Vue()配置中，data函数、methods中的函数、watch中的函数、computed中的函数，它们的this指向都是Vue的实例对象。

VueComponent的实例对象一般简称vc（组件实例对象）。

Vue的实例对象一般都简称vm。

## 一组重要关系

`VueComponent.prototype.__proto__ === Vue.prototype`

这个关系让组件实例对象vc可以访问到Vue原型上的属性、方法

# 3-单文件组件

单文件组件在浏览器中不能直接运行，需要借助脚手架。

组件的形式是一样的，具体的参考脚手架部分。

```vue
<template>
  <!--模板-->
</template>

<script>
// 交互代码
</script>

<style scoped>
/*样式*/
</style>
```

