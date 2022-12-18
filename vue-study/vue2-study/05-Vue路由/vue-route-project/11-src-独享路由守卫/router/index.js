// 该文件用于创建整个应用路由器

import VueRouter from 'vue-router'

// 引入组件
import About from '@/pages/About'
import Home from '@/pages/Home'
import News from '@/pages/News'
import Message from '@/pages/Message'
import Detail from '@/pages/Detail'

// 创建并暴露一个路由器
const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/home',
      component: Home,
      meta: {title: '主页'},
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
        {
          name: 'message',
          path: 'message',
          component: Message,
          meta: {isAuth: true, title: '消息'},
          children: [
            {
              name: 'detail',
              path: 'detail/:id/:title',
              component: Detail,
              meta: {title: '详情'},
              props: true
            }
          ]
        }
      ]
    },
    {
      name: 'about',
      path: '/about',
      component: About,
      meta: {title: '关于'}
    }
  ]
})

export default router