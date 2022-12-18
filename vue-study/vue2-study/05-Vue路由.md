# Vue的路由

## 1-路由

一个路由（route）就是一组映射关系（key-value），多个路由需要路由器管理（router）。

前端路由：key是路径，value是组件。

## 2-路由的使用

（1）安装vue-router插件库：`yarn add vue-router@3.6.5` 注意：vue2中只能用vue-router3不能用vue-router4。

（2）在`main.js`中导入并应用插件：`Vue.use(VueRouter)`

（3）在src中建立`router/index.js`，配置router：

```js
// 该文件用于创建整个应用路由器

import VueRouter from 'vue-router'

// 引入组件
import About from '@/pages/About'
import Home from '@/pages/Home'

// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {path: '/home', component: Home},
    {path: '/about', component: About}
  ]
})
```

（4）实现切换（active-class可以配置高亮）

```vue
<!--vue中用router-link标签实现路由切换 -->
<router-link class="list-group-item" active-class="active" to="/about">About</router-link>
<router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
```

（5）指定路由组件展示位置

```vue
 <!-- 指定组件的呈现位置-->
<router-view></router-view>
```

>1. 路由组件通常放在`pages`目录中，一般组件通常放在`components`目录中
>
>2. 通过切换，隐藏了的路由组件，默认是被销毁的，需要的时候重新挂载
>3. 每个路由组件都有自己的`$route`属性，里面存放自己的路由信息
>4. 整个应用只有一个router，可以通过路由组件的`$router`属性获取到

## 3-嵌套（多级）路由

配置路由规则：

```js
// 该文件用于创建整个应用路由器

// ...
import News from '@/pages/News'
import Message from '@/pages/Message'

// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      children: [
        {path: 'news', component: News}, 
        {path: 'message', component: Message}
      ]
    },
    {path: '/about', component: About}
  ]
})

```

>子级路由配置在父级路由的children配置项中，并且path一定不能写斜杠，要注意和父级path区分

跳转（要写完整的路径）

```vue
 <router-link to="/home/news">News</router-link>
```

## 4-路由的query参数

路由传递query参数：

```vue
<!--跳转路由并携带query参数，to的字符串写法-->
<!-- <router-link :to="`/home/message/detail?id=${msg.id}&title=${msg.title}`">{{ msg.title }}</router-link>-->
        
<!--跳转路由并携带query参数，to的对象写法-->
<router-link :to="{path:'/home/message/detail',query:{id:msg.id,title:msg.title}}">
	{{ msg.title }}
</router-link>
```

>to的字符串写法比较变态，推荐用对象写法

接收参数：`$route.query.数据`

## 5-命名路由

在配置路由时可以给路由起名，当路由路径很长时可以通过名字简化路由的跳转。

给路由起起名：

```js
routes: [
    {
      path: '/home',
      component: Home,
      children: [
        {path: 'news', component: News},
        {
          path: 'message',
          component: Message,
          children: [
            {
              name: 'detail',
              path: 'detail',
              component: Detail
            }
          ]
        }
      ]
    },
  // ...
  ]
```

简化跳转：

```vue
// 简化前写完整的路由地址
<router-link :to="{path:'/home/message/detail',query:{id:msg.id,title:msg.title}}">
	{{ msg.title }}
</router-link>

// 简化后写路由名字
 <router-link :to="{name:'detail',query:{id:msg.id,title:msg.title}}">
   {{ msg.title }}
</router-link>
```

## 6-路由的params参数

配置路由，声明params参数（占位）

```js
routes: [
    {
      path: '/home',
      component: Home,
      children: [
        {path: 'news', component: News},
        {
          path: 'message',
          component: Message,
          children: [
            {
              name: 'detail',
              path: 'detail/:id/:title',
              component: Detail
            }
          ]
        }
      ]
    },
  // ...
  ]
```

传递参数：

```vue
<!--跳转路由并携带params参数，to的字符串写法-->
<!-- <router-link :to="`/home/message/detail/${msg.id}/${msg.title}`">{{ msg.title }}</router-link>-->
        
<!--跳转路由并携带params参数，to的对象写法-->
<router-link :to="{name:'detail',params:{id:msg.id,title:msg.title}}">
   {{ msg.title }}
</router-link>
```

>携带params参数时，若用to的对象写法，不能使用path配置项，必须用name配置
>
>指定params参数可传可不传，在路由path路径占位符后面加一个问号。当参数为空，可以用undefined处理，防止出现问题。

接收参数：`$route.params.数据`

## 7-路由的props配置

作用：让路由组件更方便的收到参数

```js
routes: [
    {
      path: '/home',
      component: Home,
      children: [
        {path: 'news', component: News},
        {
          path: 'message',
          component: Message,
          children: [
            {
              name: 'detail',
              path: 'detail/:id/:title',
              component: Detail,
              
              // props的写法1：对象式，该对象中的所有key-value都会以props形式传递给Detail组件
              // 使用很少，只能携带固定数据
              //  props:{a:1,b:2}

              // props的写法2：布尔写法，值为真，会将收到的params参数以props形式传递给Detail组件
              props: true
              
              // props的写法2：函数写法,返回值是对象，对象的key-value会以props形式传递给Detail组件
              // props({query: {id, title}}) { // 这里的参数用来对象的连续解构
              //   return {id, title}
              // }
            }
          ]
        }
      ]
    },
    {
      name: 'about',
      path: '/about',
      component: About
    }
  ]
```

>函数式的写法最强大，可以返回更多的值，不局限query或者params

## 8-`<router-link>`的replace属性

作用：控制路由跳转时操作浏览器历史记录的模式

浏览器历史记录有两种写入方式：

- push：追加历史记录
- replace：替换当前历史记录

路由跳转时默认为push

开启replace模式：`<router-link replace>Home</router-link>`

## 9-编程式路由导航

作用：不借助`router-link`实现路由跳转，让路由跳转更加灵活

```js
export default {
  name: 'Message',
  // ...
  methods: {
    pushShow(msg) {
      this.$router.push({
        name: 'detail', params: {id: msg.id, title: msg.title}
      })
    },
    replaceShow(msg) {
      this.$router.replace({
        name: 'detail', params: {id: msg.id, title: msg.title}
      })
    }
  }
}

// ----------------
// 前进
this.$router.back()

// 后退
this.$router.forward()

// go(n) n为正，前进，n为负，后退
this.$router.go(-2)
```

## 10-缓存路由组件

作用：让不展示的路由组件保持活跃，不被销毁

```vue
<!-- 缓存路由组件 include属性值是要缓存的组件名-->
      <keep-alive include="News">
        <router-view></router-view>
      </keep-alive>
```

>没有include将缓存被keep-clive包裹的所有路由组件
>
>缓存多个路由组件，include的值为数组

## 11-路由的生命周期钩子

作用：路由组件独有的两个钩子，用于捕获路由组件的激活状态

```js
// 组件激活钩子
  activated() {
    this.timerId = setInterval(() => {
      this.opacity -= 0.01
      if (this.opacity <= 0) this.opacity = 1
    }, 16)
  },
  // 组件失活钩子
  deactivated() {
    clearInterval(this.timerId)
  }
```

>Vue2整体有11个钩子

## 12-路由守卫

作用：对路由进行权限控制

分类：全局守卫、独享守卫、组件守卫

### 全局守卫

```js
// 全局前置路由守卫（初始化时调用，每次路由切换之前调用）
router.beforeEach((to, from, next) => {
  // if (to.path === '/home/news' || to.path === '/home/message') {
  // if (to.name === 'news' || to.name === 'message') {
  if (to.meta.isAuth) { // 判断当前路由是否需要进行权限控制
    if (localStorage.getItem('username') === 'YuHuo') { // 权限控制具体规则
      next() // 放行
    } else {
      alert('您没有权限查看')
    }
  } else {
    next()
  }
})

// 全局后置路由守卫（初始化时调用，每次路由切换之后调用）
router.afterEach((to, from) => {
  document.title = to.meta.title 
})
```

### 独享守卫

独享守卫没有单独的后置路由守卫，只有前置路由守卫，但可以配合其他路由守卫使用。

独享守卫通过`beforeEnter`配置项，配置在路由中

```js
 routes: [
    {
      // ...
      children: [
        {
          name: 'news',
          path: 'news',
          component: News,
          meta: {isAuth: true, title: '新闻'},
          // 独享路由守卫
          beforeEnter: (to, from, next) => {
            if (to.meta.isAuth) {
              if (localStorage.getItem('username') === 'YuHuo') {
                next()
              } else {
                alert('您没有权限查看')
              }
            } else {
              next()
            }
          }
        },
        //...
  ]
})

```

### 组件内守卫

```js
export default {
  name: 'About',
  // 通过路由规则进入该组件时调用
  beforeRouteEnter(to,from,next){
    if (to.meta.isAuth) {
      if (localStorage.getItem('username') === 'YuHuo') {
        next()
      } else {
        alert('您没有权限查看')
      }
    } else {
      next()
    }
  },
  // 通过路由规则离开该组件时调用
  beforeRouteLeave(to,from,next){
    next()
  }
}
```

## 13-路由器的两种工作模式

对于一个url来说，#及其后面的内容就是hash值

hash值不会包含在http请求中，即hash值不会带给服务器

hash模式：

- 地址中带着#号
- 若将地址发给第三方手机APP分享，app校验严格会标记为不合法
- 兼容性好

history：

- 地址干净
- 兼容性和hash模式相比稍差
- 应用部署上线需要后端人员支持，解决刷新页面服务器端404问题