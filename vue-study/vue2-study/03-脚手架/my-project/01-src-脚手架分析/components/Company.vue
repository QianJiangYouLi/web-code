<template>
  <div class="demo">
    <p>公司名称：{{ companyName }}</p>
    <p>公司地址：{{ address }}</p>
    <button @click="showInfo">点我提示信息</button>
  </div>
</template>
<script>
export default {
  name: 'Company',
  data() {
    return {
      companyName: '虹软科技有限公司',
      address: '虹软科技园'
    }
  },
  methods: {
    showInfo() {
      alert(this.companyName)
    }
  }
}
</script>
<style scoped>
.demo {
  background-color: #ffa500;
}
</style>