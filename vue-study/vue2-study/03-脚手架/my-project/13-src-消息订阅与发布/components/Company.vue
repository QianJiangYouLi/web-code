<template>
  <div class="demo">
    <p>公司名称：{{ name }}</p>
    <p class="title">公司地址：{{ address }}</p>
  </div>
</template>
<script>
import pubsub from 'pubsub-js'

export default {
  name: 'Company',
  data() {
    return {
      name: '虹软科技有限公司',
      address: '虹软科技园'
    }
  },
  methods: {},
  mounted() {
    // 订阅消息
    this.pubId = pubsub.subscribe('hello', (msgName, data) => {
      console.log('有人发布了hello消息，hello的回调执行了', data)
    })
  },
  beforeDestroy() {
    // 取消订阅
    pubsub.unsubscribe(this.pubId)
  }
}
</script>
<style scoped>
.demo {
  box-sizing: border-box;
  background-color: #87CEEB;
  padding: 20px;
  margin-top: 30px;
}
</style>