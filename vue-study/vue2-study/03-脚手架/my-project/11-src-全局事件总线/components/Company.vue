<template>
  <div class="demo">
    <p>公司名称：{{ name }}</p>
    <p class="title">公司地址：{{ address }}</p>
  </div>
</template>
<script>
export default {
  name: 'Company',
  data() {
    return {
      name: '虹软科技有限公司',
      address: '虹软科技园'
    }
  },
  methods:{
    hello(data){
      console.log('Company组件收到了数据',data)
    }
  },
  mounted() {
    this.$bus.$on('hello',this.hello)
  },
  beforeDestroy() {
    this.$bus.$off('hello')
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