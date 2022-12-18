// 引入createApp工厂函数
import {createApp} from 'vue'
import App from './App.vue'

/*
// 创建应用实例对象app（类似于Vue2的vm，但更加轻量）
const app = createApp(App)
// 挂载
app.mount('#app')
*/

createApp(App).mount('#app')
