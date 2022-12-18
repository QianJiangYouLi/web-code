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
              name: '详情',
              path: 'detail',
              component: Detail
            }
          ]
        }
      ]
    },
    {
      name: '关于',
      path: '/about',
      component: About
    }
  ]
})
