<template>
  <div>
    <h2>{{ msg }}</h2>
    <p>公司名称：{{ name | mySlice }}</p>
    <p>公司地址：{{ address }}</p>
    <input type="text" v-fbind:value="name">
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