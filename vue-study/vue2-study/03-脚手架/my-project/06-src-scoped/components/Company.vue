<template>
  <div class="demo">
    <h2>{{ msg }}</h2>
    <p>公司名称：{{ name }}</p>
    <p class="title">公司地址：{{ address }}</p>
  </div>
</template>
<script>
export default {
  name: 'Company',
  data() {
    return {
      msg: '公司信息',
      name: '虹软科技有限公司',
      address: '虹软科技园'
    }
  }
}
</script>
<style scoped>
.demo {
  background-color: #87CEEB;
}
</style>