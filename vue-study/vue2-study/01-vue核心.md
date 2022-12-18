# 1-Vue起步

Vue是一套用于构建用户界面的渐进式框架。目前分为Vue2和Vue3。

Vue3使用TypeScript重写了Vue2，但一些基本语法还是差不多的。

vue初探：

想让Vue工作，需要创建Vue实例，传入配置对象。

容器中的代码要符合HTML规范，Vue只不过是添加了一些特殊的语法，组成了Vue的模板语法。

Vue的实例与容器要一一对应，真实开发中只有一个vue实例，并且会配合组件一起使用。

```vue
<!--Vue容器，里面的内容称为Vue模板-->
<div id="app">
  <h1>Hello Vue</h1>
</div>
<script src="../lib/vue.js"></script>
<script>
  // 阻止vue在启动时生成生产提示
  Vue.config.productionTip = false
  // 创建vue实例对象
  new Vue({
    el: '#app', // 挂载Vue容器，值通常是css选择器
    data: { // 存储数据，供el挂载的容器使用，有对象式和函数式两种写法
      msg: 'Hello Vue'
    }
  })
</script>
```

# 2-模板语法

## 插值语法

语法:`{{ }}`

作用：用于解析标签体内容

双花括号中可以写js表达式，并且数据是响应式的，可以读取的data中的所有属性。

注意：

>js表达式会产生值，是特殊的js代码。常见的js表达式：
>
>- a
>- a+b
>- demo(arg)
>- a > b ? ‘Yes’ : ’No’
>- ...
>
>js代码（语句）：一般用来控制程序执行。常见的js代码：
>
>- if(){}
>- for(){}
>- ...

```vue
<div id="app">
  <!-- 插值语法-->
  <h1>{{ msg }}</h1>
</div>
<script src="../lib/vue.js"></script>
<script>
  Vue.config.productionTip = false
  new Vue({
    el: '#app',
    data: {
      msg: 'Hello Vue'
    }
  })
</script>
```

## 指令语法

功能：用于解析标签，包括标签属性、标签体内容、绑定事件等。

Vue中定义了很多指令，形式都是`v-???`。

如：v-bind:href=“xxx”，xxx同样是js表达式，同样可以读取到data中的所有属性

```vue
<div id="app">
  <!--指令语法-->
  <div>
    <!--v-bind：动态绑定属性-->
    <a v-bind:href="url" v-bind:msg="msg">点我去Google</a>
  </div>
  <div>
    <!--v-bind简写成 : -->
    <a :href="url" :msg="msg">点我去Google</a>
  </div>
</div>
<script src="../lib/vue.js"></script>
<script>
  Vue.config.productionTip = false
  new Vue({
    el: '#app',
    data: {
      msg: '指令语法v-bind，动态绑定属性',
      url: 'https://www.google.com'
    }
  })
</script>
```

# 3-数据绑定

Vue中有两种数据绑定方式：

`v-bind`单向数据绑定，数据只能从data流向页面。

`v-model`双向数据绑定，数据可以实现data与页面双向流动。

>双向数据绑定一般都应用在表单类元素上，如input、select等。
>
>v-model可以简写成v-model，默认收集value值。

```vue
<div id="app">
  <p><label>单向数据绑定：<input type="text" v-bind:value="name"></label></p>
  <p><label>双向数据绑定：<input type="text" v-model:value="name"></label></p>
  <p><label>双向数据绑定简写：<input type="text" v-model="name"></label></p>
</div>
<script src="../../lib/vue.js"></script>
<script>
  Vue.config.productionTip = false
  new Vue({
    el: '#app',
    data: {
      name: 'YuHuo'
    }
  })
</script>
```

# 4-挂载容器与data的两种写法

## 挂载容器

方法1：通过创建实例时传入el配置项的方式挂载容器

```vue
<div id="app">
  <h1>{{msg}}</h1>
</div>
<script src="../../lib/vue.js"></script>
<script>
  Vue.config.productionTip = false
  // 作为配置对象写在Vue实例对象中
  new Vue({
    el: '#app',
    data: {msg: 'Hello Vue'}
  })
</script>
```

方法2：通过`$mount()`方法挂载容器，这种方式更灵活

```vue 
<div id="app">
  <h1>{{msg}}</h1>
</div>
<script src="../../lib/vue.js"></script>
<script>
  Vue.config.productionTip = false
  const vm = new Vue({
    data: {msg: 'Hello Vue'}
  })
  // 通过$mount()方法挂载容器
  vm.$mount('#app')
</script>
```

>挂载容器的两种写法没有什么区别，可以随意选择

## data的两种写法

写法1：对象形式

```vue
<script>
  // 写法1：data以对象形式写在Vue实例对象中
  new Vue({
    el: '#app',
    data: {msg: 'Hello Vue'}
  })
</script>
```

写法2：函数形式

```vue
<script>
  const vm = new Vue({
     // data函数式写法
    data() {
      return {
        msg: 'Hello Vue'
      }
    }
  })
  vm.$mount('#app')
</script>
```

>组件化编程中，data必须写成函数式，并且，由Vue直接管理的函数一定不能写成箭头函数。

# 5-Vue中的MVVM模型

M:模型，Model，对应data中的数据

V：视图，View，对应模板

VM：视图模型，ViewModel，对应Vue的实例对象

![vue的MVVM](https://pic1.imgdb.cn/item/635e55a716f2c2beb120d9ee.png)

>data中的所有属性最后都出现在vm上（数据代理）
>
>vm上的所有属性及原型上的所有属性在Vue模板中都能直接使用

# 6-数据代理

## Object.defineProperty

Vue中主要通过`Object.defineProperty`方法进行数据代理。

Object.defineProperty定义属性比较繁琐，但功能很强大。

```js
  let num = 24
  const person = {
    name: 'YuHuo',
    gender: 'male'
  }
  Object.defineProperty(person, 'age', {
    // value: 24,
    // enumerable: true, // 控制属性是否可枚举，默认false
    // writable: true, //  控制属性是否可被修改，默认false
    // configurable: true, // 控制属性是否可被删除，默认false
    get() { // 读取age时,getter被调用，返回值就是age的值
      return num
    },
    set(v) { // 当修改了age时，setter会被调用，且会收到修改的具体值
      num = v
    }
  })
  console.log(Object.keys(person))
  console.log(person)
```

## 数据代理

数据代理：通过一个对象代理另一个对象中属性的操作（读、写）

```js
  const objX = {x: 100}
  const objY = {y: 100}
  Object.defineProperty(objY, 'x', {
    get() {
      return objX.x
    },
    set(v) {
      objX.x = v
    }
  })
```

具体可以在控制台中查看。

## Vue中的数据代理

Vue中的数据代理通过vm对象来代理data对象中属性操作。

通过数据代理可以更加方便的操作data中的数据。

**基本原理：通过`Object.defineProperty()`把data对象中所有属性添加到vm上，为每一个添加到vm上的属性都指定一个getter/setter。在getter/setter内部去操作data中对应的属性。**

```vue
<div id="app">
  <p>姓名：{{name}}</p>
  <p>年龄：{{age}}</p>
</div>
<script src="../../lib/vue.js"></script>
<script>
  Vue.config.productionTip = false
  const vm = new Vue({
    el: '#app',
    data: {
      name: 'YuHuo',
      age: 24
    }
  })
  console.log(vm)
</script>
```

![image-20221030223647014](https://pic1.imgdb.cn/item/635e8c9016f2c2beb1e2fa0d.png)

![image-20221030223719489](https://pic1.imgdb.cn/item/635e8cb016f2c2beb1e365df.png)

![image-20221030224518364](https://pic1.imgdb.cn/item/635e8e8f16f2c2beb1eab202.png)

# 7-事件处理

## 事件的基本使用

使用v-on:事件名或者@事件名都可以绑定事件。

事件的回调函数配置在methods节点中，最终会在vm上。

methods中配置的函数不要使用箭头函数，这里的函数都被Vue直接管理，this的指向是vm或组件实例对象。

事件回调可以传参：

（1）不传递参数，不需要小括号，在回调函数中可以直接使用event；

（2）传递参数，需要小括号，并且回调中要使用event需要在传参时用$event占位。

```vue
<div id="app">
  <p>Hello {{name}},Welcome to hangzhou </p>
  <!--事件绑定 v-on:事件名="事件回调"-->
  <p><button v-on:click="showInfo1">clink this</button></p>
  <!--  事件绑定简写：@事件名="事件回调"-->
  <p><button @click="showInfo2(666,$event)">clink this</button></p>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      name: 'YuHuo'
    },
    methods: {
      showInfo1(event) {
        console.log(event)
        console.log('哈哈')
      },
      showInfo2(a, event) {
        console.log(event)
        console.log(a)
      }
    }
  })
</script>
```

## 事件修饰符

事件修饰符是由点开头的指令后缀，作用是实现一些简单功能，比如阻止冒泡、阻止事件默认行为等。

Vue提供了6个事件修饰符，常用的事件修饰符有3个：

（1）stop 阻止冒泡

（2）prevent 阻止默认事件

（3）once 事件只触发一次

更多的查询文档。

```vue
<div id="app">
  <!--  事件修饰符，prevent阻止事件默认行为-->
  <p><a href="https://www.google.com" @click.prevent="showInfo">点我提示信息</a></p>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {name: 'YuHuo'},
    methods: {
      showInfo(e) {
        // e.preventDefault() 阻止默认事件，在Vue中可以用事件修饰符实现
        alert(this.name)
      }
    }
  })
</script>
```

>修饰符可以连写，但顺序很重要；相应的代码会以同样的顺序产生。

## 按键修饰符

Vue提供了9个按键别名（按键修饰符），用于指定的按键触发事件：

（1）上下左右（up、down、left、right）

（2）回车换行（enter、tab） 注意：tab必须配合keydown使用

（3）空格删除退出（space、delete、esc） 注意：delete捕获删除与退格键

Vue没有提供别名的按键可以使用[`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) 绑定，但需要转为短横线命名。

使用`Vue.config.keyCodes.自定义键名=键码`定制按键别名。

keyCode事件用法已经废弃，不要再使用。

系统修饰键（ctrl、alt、shift、meta）用法特殊，配合keydown事件使用正常触发事件，配合keyup事件使用需要按下修饰键的同时按下其他键，随后释放其他键，事件才会被触发。

```vue
<div id="app">
  <label><input type="text" placeholder="按下回车键提示输入" @keyup.enter="showInfo"></label>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {name: 'YuHuo'},
    methods: {
      showInfo(e) {
        console.log(e.target.value)
      }
    }
  })
</script>
```

>Vue提供的键盘修饰符已经足够使用了，一般情况下不需要自己再去绑其他键了。

# 8-计算属性

## 计算属性基本使用

定义：要用的**属性**不存在，需要通过计算已有属性得来。

原理：底层借助Object.defineProperty方法提供的getter/setter。

get函数执行时机：

（1）初次读取时执行一次，然后缓存结果

（2）当依赖的数据发生变化时会再次执行

优势：与methods实现相比，内部有缓存机制，效率更高，调试方便

注意：

>计算属性最终会出现在vm上，直接使用就行
>
>计算属性要修改（不修改可以不写set），必须写set函数去响应，且set中要引起计算时依赖的数据发生变化

```vue
<div id="app">
  <p><label>姓：<input type="text" v-model="firstName"></label></p>
  <p><label>名：<input type="text" v-model="lastName"></label></p>
  <p>全名：<strong>{{fullName}}</strong></p>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      firstName: '',
      lastName: ''
    },
    computed: {
      fullName: {
        // 读取fullName时get调用，返回值就是fullName的值
        // 初次读取fullName时调用get，然后会缓存。
        // 所依赖的数据发生变化时，会再次调用get
        get() {
          return this.firstName + '-' + this.lastName
        },
        // 修改fullName时,set调用
        set(v) {
          const arr = v.split('-')
          this.firstName = arr[0]
          this.lastName = arr[1]
        }
      }
    }
  })
</script>
```

## 计算属性简写

当确定不需要修改计算属性时可以触发简写形式。

```vue
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      firstName: '',
      lastName: ''
    },
    computed: {
      fullName() {
        return this.firstName + '-' + this.lastName
      }
    }
  })
</script>
```

# 9-监视属性

## 监视属性基本使用

当被监视的属性变化时，回调函数自动调用，进行相关操作。

监视的属性必须存在，才能监视，可以是data中定义的属性，也可以是计算属性。

监视的两种写法：

（1）写法1：直接在vm实例中通过watch属性配置

```vue 
<div id="app">
  <p>今天的天气很<strong>{{ weather }}</strong></p>
  <button @click="changeWeather">切换天气</button>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {isHot: true},
    methods: {changeWeather() {this.isHot = !this.isHot}},
    computed: {weather() {return this.isHot ? '炎热' : '凉爽'}  },   
    watch: {
      isHot: {
        // 初始化时立即执行handler
        immediate: true,
        // 当isHot修改时会调用handler
        handler(newValue, oldValue) {
          console.log('天气被修改', newValue)
        }
      }
    }
  })
</script>
```

（2）学法2：通过`$watch()`方法配置

```vue
<script>
  const vm = new Vue({
    el: '#app',
    data: {isHot: true},
    methods: {changeWeather() {this.isHot = !this.isHot}},
    computed: {weather() {return this.isHot ? '炎热' : '凉爽'}}
  })
  vm.$watch('isHot', {
    immediate: true,
    handler(newValue, oldValue) {
      console.log('天气被修改', newValue)
    }
  })
</script>
```

## 深度监视

Vue中的watch默认不监视对象内部值的改变（一层）。

配置deep:true可以监测对象内部值改变（多层）。

>Vue自身是可以监测对象内部值的改变，但Vue提供的watch默认不行。
>
>使用watch时根据数据的具体结构决定是否开启深度监测。

```vue
<div id="app">
  <div>
    <p>a的值：{{numbers.a}}</p>
    <button @click="numbers.a++">a++</button>
  </div>
  <div>
    <p>b的值：{{numbers.b}}</p>
    <button @click="numbers.b++">b++</button>
  </div>
  <p><button @click="numbers={a:666,b:999}">替换numbers</button></p>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      numbers: {
        a: 1,
        b: 2
      }
    },
    watch: {
      // 监视多级结构中某个属性的变化
      /*'numbers.a': {
        handler() {
          console.log('a改变了')
        }
      }*/
      // 监视多级结构中所有属性的变化
      numbers:{
        deep:true,
        handler(){
          console.log('numbers改变了')
        }
      }
    }
  })
</script>
```

## 计算属性简写

当监视的属性只有handler时可以触发简写形式

```vue 
 watch: {
      isHot(newValue, oldValue) {
        console.log('天气被修改', newValue)
      }
    }
```

另一种写法

```vue
vm.$watch('isHot', function (newValue, oldValue) {
    console.log('天气被修改', newValue)
  })
```

>**不要用箭头函数！！！**

## 计算属性与监视属性对比

监视属性实现姓名案例：

```vue
<script>
  new Vue({
    el: '#app',
    data: {
      firstName: '',
      lastName: '',
      fullName: ''
    },
    watch: {
      firstName(newVal) {
        // 这里要写箭头函数
       setTimeout(() => {
          this.fullName = newVal + '-' + this.lastName
        },1000)
      },
      lastName(newVal) {
        this.fullName = this.firstName + '-' + newVal
      }
    }
  })
</script>
```

computed能实现的功能，watch都可以完成，但watch能实现的功能，computed不一定能实现。如监视属性可以进行异步操作，但计算属性不行。

重要原则：

>所有被Vue管理的函数最好写成普通函数，这样this的指向才是vm或者组件实例对象。
>
>所有不被Vue管理的函数（定时器回调、axja回调、promise的回调等）最好写成箭头函数，这样this的指向才是vm或者组件实例对象。

具体使用计算属性还是监视属性，需要根据具体情况分析。

# 10-样式绑定

## 绑定class样式

写法：class=“xxx”，xxx可以是字符串、数组、对象

字符串适用于类名不确定，要动态获取。

对象适用于要绑定多个样式，个数不确定，名字不确定。

数组适用于绑定多个样式，个数确定，名字确定，但不确定是否使用

## 绑定style样式

`:style=“{fontSize:xxx}”`，xxx是动态值

`:style=“[a,b]”`，a,b是样式对象

```vue
<style>
      .basic {
          width: 400px;
          height: 100px;
          border: 1px solid #000;
      }

      .happy {
          background-color: #ffa500;
      }

      .sad {
          background-color: #0f0;
      }

      .normal {
          background-color: #00bfff;
      }

      .style1 {
          color: #5F9EA0FF;
      }

      .style2 {
          border-radius: 10%;
      }

      .style3 {
          font-size: 20px;
      }
  </style>
<div id="app">
  <!--  绑定class样式字符串写法，适用于样式类名不确定，需要动态指定-->
  <div class="basic" :class="mood" @click="change">{{name}}</div>
  <br>
  <!--  绑定class样式数组写法，适用于样式个数不确定，名字也不确定-->
  <div class="basic" :class="classArr">{{name}}</div>
  <br>
  <!--  绑定class样式对象写法，适用于样式个数确定，名字也确定，但要动态决定是否使用-->
  <div class="basic" :class="classObj">{{name}}</div>
  <br>
  <!--  绑定style样式对象写法。也可以用数组写法，但几乎不用-->
  <div class="basic" :style="styleObj">{{name}}</div>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      name: 'YuHuo',
      mood: 'normal',
      classArr: ['style1', 'style2', 'style3'],
      classObj: {
        style1: false,
        style3: false
      },
      styleObj: {
        fontSize: '40px',
        color: '#f00',
        backgroundColor: '#0ff'
      }
    },
    methods: {
      change() {
        const arr = ['happy', 'sad', 'normal']
        this.mood = arr[Math.floor(Math.random() * 3)]
      }
    }
  })
</script>
```

# 11-条件渲染

## v-show

写法：v-show=“表达式”

适用于切换频率较高的场景。

使用v-show仅仅是样式隐藏，DOM元素没有被移除

```vue
<div id="app">
  <button @click="n++">a++</button>
  <div v-show="n===1">Angular</div>
  <div v-show="n===2">React</div>
  <div v-show="n===3">Vue</div>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
     n:0
    }
  })
</script>
```

## v-if

写法：

(1) v-if=“表达式”

(2) v-else-if=“表达式”

(3) v-else

适用于切换频率较低的场景。

不展示的DOM元素被移除。

v-if可以和v-else-if、v-else搭配使用，但结构不能被打断。

使用v-ifDOM节点可能获取不到，但v-show一定可以获取到DOM节点。

```vue
<div id="app">
  <button @click="n++">a++</button>
  <div v-if="n===1">Angular</div>
  <div v-else-if="n===2">React</div>
  <div v-else-if="n===3">Vue</div>
  <div v-else>条件不符合</div>

  <!--  v-if与template配合,template不会被渲染到页面中-->
  <template v-if="n===0">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </template>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      n: 0
    }
  })
</script>
```

# 12-列表渲染

## 列表的基本使用

v-for指令用于展示列表数据。

语法：v-for=“（item,index）in xxx” :key=“yyy”

可以遍历数组、对象、字符串（用的很少）和指定次数（用的很少）

```vue
<div id="app">
  <h2>遍历数组</h2>
  <ul>
    <li v-for="(person,index) in personList" :key="person.id">
      {{person.name}}----{{person.age}}----{{index}}
    </li>
  </ul>
  <h2>遍历对象</h2>
  <ul>
    <li v-for="(v,k) of car" :key="k">{{k}}----{{v}}</li>
  </ul>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      personList: [
        {id: '001', name: 'YuHuo', age: 24},
        {id: '002', name: 'SuBai', age: 22},
        {id: '003', name: 'QiuWen', age: 21}
      ],
      car: {
        name: '奥迪A6',
        price: '70w',
        color: '黑色'
      }
    }
  })
</script>
```

## key的原理与作用

虚拟DOM中key的作用：key是虚拟DOM对象标识，当数据发生变化时，Vue会根据新数据生成新的虚拟DOM。随后，Vue进行新虚拟DOM与旧虚拟DOM的差异比较。



比较规则：

（1）新旧虚拟DOM中有相同的key：

- 虚拟DOM内容没变，直接使用之前的真实DOM
- 虚拟DOM内容改变，生成新的真实DOM，替换页面之前的真实DOM

（2）新旧虚拟DOM中没有相同的key，创建新的真实DOM，渲染到页面



index作为key可能引发的问题：

（1）对数据进行逆序添加、逆序删除等破坏顺序操作，会产生没必要的真实DOM更新，界面效果没问题，但效率低。

（2）结构中有输入类DOM，会产生错误DOM更新，造成界面问题。



开发中如何选择key：

（1）最好使用每条数据的唯一标识作为key，如id、身份证号、时间戳等。

（2）如果不存在对数据的破坏顺序操作，仅用于展示数据，使用index没有什么大问题。



```vue
<div id="app">
  <h2>人员列表</h2>
  <ul>
    <!--<li v-for="(person,index) in personList" :key="index">-->
    <li v-for="(person,index) in personList" :key="person.id">
      {{person.name}}----{{person.age}}----<input type="text">
    </li>
  </ul>
  <button @click="add">添加人员</button>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      personList: [
        {id: '001', name: 'YuHuo', age: 24},
        {id: '002', name: 'SuBai', age: 22},
        {id: '003', name: 'QiuWen', age: 21}
      ]
    },
    methods: {
      add() {
        const person = {id: '004',name: 'CuiLuoHeng',age: 20}
        this.personList.unshift(person)
      }
    }
  })
</script>
```

## 列表过滤

### 计算属性实现

```vue
<div id="app">
  <input type="text" v-model="keyWords">
  <ul>
    <li v-for="person of filPersons" :key="person.id">
      {{person.name}}----{{person.age}}------{{person.gender}}
    </li>
  </ul>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      persons: [
        {id: '001', name: '马冬梅', age: 23, gender: '女'},
        {id: '002', name: '周冬雨', age: 24, gender: '女'},
        {id: '003', name: '周杰伦', age: 25, gender: '男'},
        {id: '004', name: '温兆伦', age: 26, gender: '男'}
      ],
      keyWords: ''
    },
    computed: {
      filPersons() {
        return this.persons.filter(person => {
          return person.name.indexOf(this.keyWords) !== -1
        })
      }
    }
  })
</script>
```

### 监视属性实现

```vue
<script>
  new Vue({
    el: '#app',
    data: {
      persons: [
        {id: '001', name: '马冬梅', age: 23, gender: '女'},
        {id: '002', name: '周冬雨', age: 24, gender: '女'},
        {id: '003', name: '周杰伦', age: 25, gender: '男'},
        {id: '004', name: '温兆伦', age: 26, gender: '男'}
      ],
      keyWords: '',
      filPersons: []
    },
    watch: {
      keyWords: {
        immediate: true,
        handler(val) {
          this.filPersons = this.persons.filter(person => {
            return person.name.indexOf(val) !== -1
          })
        }
      }
    }
  })
</script>
```

### 总结

能用监听属性实现的功能，计算属性都能实现，优先使用计算属性。

## 列表排序

排序是在过滤的基础上进行的。

```vue
<div id="app">
  <label><input type="text" v-model="keyWords"></label>
  <p>
    <button @click="sortType=1">年龄升序</button>
    <button @click="sortType=2">年龄降序</button>
    <button @click="sortType=0">默认顺序</button>
  </p>
  <ul>
    <li v-for="person of filPersons" :key="person.id">
      {{person.name}}----{{person.age}}------{{person.gender}}
    </li>
  </ul>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      persons: [
        {id: '001', name: '马冬梅', age: 23, gender: '女'},
        {id: '002', name: '周冬雨', age: 22, gender: '女'},
        {id: '003', name: '周杰伦', age: 27, gender: '男'},
        {id: '004', name: '温兆伦', age: 25, gender: '男'}
      ],
      keyWords: '',
      sortType: 0 // 0 原序 1 升序 2 降序
    },
    computed: {
      filPersons() {
        const arr = this.persons.filter(person => {
          return person.name.indexOf(this.keyWords) !== -1
        })
        // 判断是否需要排序
        if (this.sortType) {
          arr.sort((person1, person2) => {
            return this.sortType === 1 ? person1.age - person2.age : person2.age - person1.age
          })
        }
        return arr
      }
    }
  })
</script>
```

# 13-数据监测原理

## 更新时的一个小问题

```vue
<div id="app">
  <button @click="updateMei">更新马冬梅信息</button>
  <ul>
    <li v-for="person of persons" :key="person.id">
      {{person.name}}----{{person.age}}------{{person.gender}}
    </li>
  </ul>
</div>
<script src="../../lib/vue.js"></script>
<script>
  const vm = new Vue({
    el: '#app',
    data: {
      persons: [
        {id: '001', name: '马冬梅', age: 23, gender: '女'},
        {id: '002', name: '周冬雨', age: 22, gender: '女'},
        {id: '003', name: '周杰伦', age: 27, gender: '男'},
        {id: '004', name: '温兆伦', age: 25, gender: '男'}
      ]
    },
    methods: {
      updateMei() {
        // this.persons[0].name = '马老师'
        // 这一行代码要是先打开vue开发者工具，然后点击按钮更新信息将不会生效，Vue不承认
        // 先点击按钮更新信息，然后打开开发者工具时会生效
        // 这涉及到Vue的数据监测原理
        this.persons[0] = {id: '001', name: '马老师', age: 23, gender: '男'}
      }
    }
  })
</script>
```

## 简单模拟数据监测

```js
  let data = {
    name: 'YuHuo',
    age: 24
  }
  // 创建一个监视实例对象，用于监测data中属性变化
  const obs = new Observer(data)

  console.log(obs)

  const vm = {}
  vm._data = data = obs

  function Observer(obj) {
    // 汇总对象中所有属性形成一个数组
    const keys = Object.keys(obj)
    keys.forEach(k => {
      Object.defineProperty(this, k, {
        get() {
          return obj[k]
        },
        set(v) {
          console.log(`${k}被改了，重新解析模板，生成虚拟DOM，。。。`)
          obj[k] = v
        }
      })
    })
  }
```

## Vue监测数据的原理

Vue会监视data中所有层次的数据。

(1) 监测对象：

- 通过setter实现，且要在new Vue时就传入要监测的数据
- 对象中后追加的属性，默认是不做响应式处理
- 要给后添加的属性做响应式，需要用到Vue.set()/vm.$set()
  - `Vue.set(target,propertyName/index,value)`或
  - `vm.$set(target,propertyName/index,value)`

(2) 监测数组：

- 通过包装的数组更新元素方法实现，本质上做了两件事：
  - 调用原生对应方法对数组进行更新
  - 重新解析模板，更新页面

(3) Vue修改数组中某一个元素一定要用如下两种方式：

- push、pop、shift、unshift、splice、sort、reverse包装后的API
- Vue.set()或vm.$set()

>**Vue.set和vm.$set不能给vm或者vm的根数据对象添加属性。**

```vue
<div id="app">
  <h2>学生信息</h2>
  <button @click="student.age++">年龄+1</button>
  <button @click="addGender">添加性别，默认男性</button>
  <button @click="student.gender='未知'">修改性别</button>
  <button @click="addFriend">列表首位添加一个朋友</button>
  <button @click="updateFirstFriendName">修改第一个朋友名字为张三</button>
  <button @click="addHobby">添加一个爱好</button>
  <button @click="updateFirstHobby">修改第一个爱好为：阅读</button>
  <p>姓名：{{student.name}}</p>
  <p>年龄：{{student.age}}</p>
  <p v-if="student.gender">性别：{{student.gender}}</p>
  <p>爱好：</p>
  <ul>
    <li v-for="(h,index) in student.hobbies" :key="index">{{h}}</li>
  </ul>
  <p>朋友们：</p>
  <ul>
    <li v-for="(f,index) in student.friends" :key="index">
      {{f.name}}---{{f.age}}
    </li>
  </ul>
</div>
<script src="../../lib/vue.js"></script>
<script>
  const vm = new Vue({
    el: '#app',
    data: {
      student: {
        name: '苏白',
        age: 24,
        hobbies: ['吃饭', '睡觉', '打豆豆'],
        friends: [
          {name: 'Tom', age: 24},
          {name: 'Tony', age: 26}
        ]
      }
    },
    methods: {
      addGender() {
        Vue.set(this.student, 'gender', '男')
        // this.$set(this.student, 'gender', '男')
      },
      addFriend() {
        this.student.friends.unshift({name: '李四', age: 22})
      },
      updateFirstFriendName() {
        this.student.friends[0].name = '张三'
      },
      addHobby() {
        this.student.hobbies.push('贴贴')
      },
      updateFirstHobby() {
        // this.student.hobbies.splice(0, 1, '阅读')
        Vue.set(this.student.hobbies, 0, '阅读')
      }
    }
  })
</script>
```

# 14-收集表单数据

若：`input:text/password`等只有一个值的表单类型，则v-model收集的是value值，用户输入的就是value

若：`input:radio`，则v-model收集的是value值，并且要给标签配置value值

若：`input:checkbox`

- 没有配置value，那么收集的就是checked（布尔值）
- 配置了value
  - v-model初始值非数组，收集的就是checked（布尔值）
  - v-model初始值是数组，收集的就是value组成的数组

>v-model有三个修饰符：
>
>- lazy：失去焦点再收集数据
>- number：输入的字符串转为有效数字
>- trim：去除首尾空格

```vue
<div id="app">
  <form @submit.prevent="submitForm">
    <label>姓名：<input type="text" v-model.trim="userInfo.name"></label>
    <label>年龄：<input type="number" v-model.number="userInfo.age"></label>
    <label>
      性别：
      <input type="radio" name="gender" value="male" v-model="userInfo.gender"> 男
      <input type="radio" name="gender" value="female" v-model="userInfo.gender"> 女
    </label>
    <label>
      爱好：
      <input type="checkbox" value="eat" v-model="userInfo.hobbies"> 吃饭
      <input type="checkbox" value="sleep" v-model="userInfo.hobbies"> 睡觉
      <input type="checkbox" value="douDou" v-model="userInfo.hobbies"> 打豆豆
    </label>
    <label>
      地区：
      <select name="region" id="" v-model="userInfo.region">
        <option value="">请选择所在区域</option>
        <option value="bj">滨江区</option>
        <option value="sc">上城区</option>
        <option value="gs">拱墅区</option>
        <option value="xs">下沙区</option>
        <option value="xh">西湖区</option>
      </select>
    </label>
    <label>
      其它信息：<textarea v-model.lazy="userInfo.other"></textarea>
    </label>
    <label>
      <input type="checkbox" v-model="userInfo.agree"> 阅读并接受 <a href="https://www.wxyyjb99.com">《用户协议》</a>
    </label>
   <button>提交</button>
  </form>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      userInfo: {
        name: '',
        age: '',
        gender: 'male',
        hobbies: [],
        region: 'bj',
        other: '',
        agree: ''
      }
    },
    methods: {
      submitForm() {
        console.log(JSON.stringify(this.userInfo))
      }
    }
  })
</script>
```

# 15-过滤器

过滤器：对要显示的数据进行特定格式化后再显示，适用于一些简单逻辑处理。

语法：

（1）注册全局过滤器：`Vue.filter(name,callback)`

（2）注册局部过滤器：`new Vue(filters:{})`

（3）使用过滤器：`{{xxx | 过滤器名}}或者v-bind:属性=“xxx | 过滤器名”`

>过滤器可以接收额外参数，多个过滤器可以串联
>
>过滤器不会改变原本数据，是产生新的对应数据

```vue
<div id="app">
  <!--  过滤器实现 -->
  <p>显示格式化后的时间：<strong>{{time | timeFormater}}</strong></p>
  <!--  过滤器传参 -->
  <p>显示格式化后的时间：<strong>{{time | timeFormater('YYYY年MM月DD日')}}</strong></p>
  <!--  多个过滤器串联 -->
  <p>显示格式化后的时间：<strong>{{time | timeFormater('YYYY年MM月DD日') | mySlice}}</strong></p>
</div>
<script src="../../lib/vue.js"></script>
<script src="../../lib/day.js"></script>
<script>
  // 全局过滤器
  Vue.filter('mySlice',function (value) {
    return value.slice(0, 5)
  })
  new Vue({
    el: '#app',
    data: {
      time: Date.now()
    },
    // 局部过滤器
    filters: {
      timeFormater(value, str = 'YYYY年MM月DD日 HH:mm:ss') {
        return dayjs(this.time).format(str)
      }
    }
  })
</script>
```

# 16-其余内置指令与自定义指令

## 其余内置指令

除了之前用到的v-for、v-bind等内置指令，Vue还提供了很多的内置指令（具体的用法看官网文档）：

- `v-text`，向其所在节点渲染文本内容，（会替换掉节点中内容）
- `v-html`，向其所在节点解析标签内容，有安全性问题（XSS攻击），慎用
- `v-cloak`，没有值，本质是提个特殊属性，Vue接管容器后会删除该属性，配合css可以解决网速过慢页面展示插值原型的问题。
- `v-once`，所在节点初次动态渲染后就视为静态内容。以后的数据变化不会影响结构更新，可以优化性能。
- `v-pre`，跳过当前节点编译，利用这个指令可以让没有使用插值语法和指令语法的节点加快编译速度。

## 自定义指令

定义语法：

（1）局部指令：new Vue({directives:{指令名：配置对象}}) 或者new Vue({directives:{指令名：回调函数}})

（2）全局指令：Vue.directive(指令名，配置对象)或Vue.directive(指令名，回调函数)

配置对象三个回调：

- bind：指令与元素成功绑定时调用
- inserted：指令所在元素被插入页面时调用
- update：指令所在模板结构重新解析时调用

>指令定义时不需要用v-，使用时要加
>
>指令名多个单词，要用kebad-case命名方式，不要用cameCase命名方式

```vue
<div id="app">
  <p>当前的n值：<strong v-text="n"></strong></p>
  <p>放大10倍的n值：<strong v-big="n"></strong></p>
  <button @click="n++">n+1</button>
  <hr>
  <p><label><input type="text" v-fbind:value="n"></label></p>
</div>
<script src="../../lib/vue.js"></script>
<script>
  new Vue({
    el: '#app',
    data: {
      n: 0
    },
    directives: {
      // big调用时机：（1）指令与元素成功绑定时（2）指令所在的模板被重新解析时
      big(element, binding) {
        element.innerText = binding.value * 10
      },
      fbind: {
        // 指令与元素成功绑定时
        bind(element, binding) {
          element.value = binding.value
        },
        // 指令所在元素被插入页面时
        inserted(element, binding) {
          element.focus()
        },
        // 指令所在模板被重新解析时
        update(element, binding) {
          element.value = binding.value
          // element.focus()
        }
      }
    }
  })
</script>
```

# 17-生命周期



生命周期也就生命周期函数，生命周期回调函数，生命周期钩子。

是Vue在关键时刻调用的一些特殊名称的函数。

生命周期函数名字不能更改，但函数具体内容是根据需要自定义的。

生命周期函数中的this指向vm或者组件实例对象

生命周期大体上分为三个流程，有四对生命周期钩子：

（1）挂载流程

- beforeCreate
- created
- beforeMount
- **`mounted`**,发送ajax请求，启动定时器、绑定自定义事件、订阅消息等初始化内容

（2）更新流程

- beforeUpdate
- updated

（3）销毁流程

- **`beforeDestroy`**，清楚定时器，解绑自定义事件、取消消息订阅等收尾工作
- destroyed

八个生命周期钩子中有两个（mounted，beforeDestroy）很常用。

关于销毁Vue实例：

（1）销毁后借助Vue开发者工具看不到任何信息

（2）销毁后自定义事件会失效，但原生DOM事件依然有效

（3）一般不会在beforeDestroy操作数据，因为即便操作了也不会触发更新流程，是无效操作。

![生命周期](https://pic1.imgdb.cn/item/637124b916f2c2beb18aace3.png)
