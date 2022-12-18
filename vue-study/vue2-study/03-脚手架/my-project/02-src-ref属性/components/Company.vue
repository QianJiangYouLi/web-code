<template>
  <div class="bg">
    <p>公司名称：{{ name }}</p>
    <p>公司地址：{{ address }}</p>
  </div>
</template>

<script>
export default {
  name: 'Company',
  data() {
    return {
      name: '虹软科技',
      address: '虹软科技大厦'
    }
  }
}
</script>

<style scoped>
.bg {
  background-color: #808080;
}
</style>