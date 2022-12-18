<template>
  <div class="demo">
    <h2>{{ msg }}</h2>
    <p>姓名：{{ name }}</p>
    <p>职位：{{ position }}</p>
    <h3>number当前值：{{number}}</h3>
    <button @click="add">number++</button>
    <button @click="sendEmployeeName">发送姓名</button>
    <button @click="unbind">解绑事件</button>
    <button @click="death">销毁当前Employee组件</button>
  </div>
</template>

<script>
export default {
  name: 'Employee',
  data() {
    return {
      msg: '员工信息',
      name: '苏白',
      position: '前端工程师',
      number:0
    }
  },
  methods:{
    add(){
      this.number++
      console.log('add被调用了')
    },
    sendEmployeeName(){
      // 触发Employee组件实例上的自定义事件（demo）
      this.$emit('demo',this.name,666,888,999)
      this.$emit('demo1')
    },
    unbind(){
      this.$off('demo') // 解绑一个定义事件
      // this.$off(['demo','demo1']) // 解绑多个定义事件
      // this.$off() // 解绑所有定义事件
    },
    death(){
      this.$destroy() // 销毁Employee组件实例，组件实例上的自定义事件全都不奏效
    }
  }
}
</script>
<style scoped>
.demo {
  box-sizing: border-box;
  background-color: #ffa500;
  padding: 20px;
  margin-top: 30px;
}
</style>