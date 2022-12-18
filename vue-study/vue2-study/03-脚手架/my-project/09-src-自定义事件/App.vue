<template>
  <div class="app">
    <h1>{{ msg }}</h1>
    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据-->
    <Company :getCompanyName="getCompanyName"/>

    <!-- 通过父组件给子组件绑定一个自定义事件实现(写法1，v-on或者@绑定事件)：子给父传递数据-->
    <!--    <Employee @demo="getEmployeeName"/> -->
    <!-- 通过父组件给子组件绑定一个自定义事件实现（写法2：ref）：子给父传递数据-->
    <Employee ref="employee"/>
  </div>
</template>

<script>
import Employee from '@/components/Employee'
import Company from '@/components/Company'

export default {
  name: 'App',
  components: {
    Employee,
    Company
  },
  data() {
    return {
      msg: '欢迎来到本公司！'
    }
  },
  methods: {
    // 子给父传值函数
    getCompanyName(name) {
      console.log('App得到了公司名称：' + name)
    },
    getEmployeeName(name, ...params) {
      console.log('自定义事件demo触发了', name, params)
    },
    demo1() {
      console.log('demo1自定义事件触发了')
    }
  },
  mounted() {
    // 绑定自定义事件
    this.$refs.employee.$on('demo', this.getEmployeeName)
    this.$refs.employee.$on('demo1', this.demo1)
    //  绑定自定义事件，只触发一次
    // this.$refs.employee.$once('demo', this.getEmployeeName)
  }
}
</script>
<style>
.app {
  background-color: #aaa;
}
</style>