// 项目的入口文件
// 引入Vue
import Vue from 'vue'
// 引入app组件，是所有组件的父组件
import App from './App'
// 关闭vue的生产提示
Vue.config.productionTip = false
// 创建vue实例
new Vue({
  // 向App组件放入容器
  render: h => h(App),
}).$mount('#app') // 挂载到容器
