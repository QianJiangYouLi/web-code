<template>
  <div class="col-xs-offset-2 col-xs-8">
    <div class="page-header">
      <h2>Vue Router 案例</h2>
      <button @click="back">前进</button>
      <button @click="forward">后退</button>
      <button @click="go">GO</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  methods: {
    back() {
      // 前进
      this.$router.back()
    },
    forward() {
      // 后退
      this.$router.forward()
    },
    go() {
      // go(n) n为正，前进，n为负，后退
      this.$router.go(-2)
    }
  }
}
</script>

<style scoped>
button {
  margin: 20px;
}
</style>