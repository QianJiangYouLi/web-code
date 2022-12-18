<template>
  <div class="demo">
    <p>姓名：{{ name }}</p>
    <p>职位：{{ position }}</p>
    <button @click="sendEmployeeName">点击发送姓名</button>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
  name: 'Employee',
  data() {
    return {
      name: '苏白',
      position: '前端工程师'
    }
  },
  methods: {
    sendEmployeeName() {
      // 消息发布
      pubsub.publish('hello',this.name)
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