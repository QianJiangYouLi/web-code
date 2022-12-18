<template>
  <div class="demo">
    <h2>{{ msg }}</h2>
    <p>公司名称：{{ name }}</p>
    <p class="title">公司地址：{{ address }}</p>
    <button @click="sendCompanyName">发送公司名</button>
  </div>
</template>
<script>
export default {
  name: 'Company',
  props:['getCompanyName'],
  data() {
    return {
      msg: '公司信息',
      name: '虹软科技有限公司',
      address: '虹软科技园'
    }
  },
  methods:{
    sendCompanyName(){
      this.getCompanyName(this.name)
    }
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