// 该文件用于创建整个应用路由器

import VueRouter from 'vue-router'

// 引入组件
import About from '@/pages/About'
import Home from '@/pages/Home'
import News from '@/pages/News'
import Message from '@/pages/Message'
import Detail from '@/pages/Detail'

// 创建并暴露一个路由器
export default new VueRouter({
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
              // props({query: {id, title}}) {
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
})
