import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)
// 引入路由器
import router from '@/router'

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
