<template>
  <ul>
    <li :style="{opacity}">Hello Vue</li>
    <li>news001 <input type="text"></li>
    <li>news002 <input type="text"></li>
    <li>news003 <input type="text"></li>
  </ul>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      opacity: 1
    }
  },
  /*
  mounted() {
    this.timerId = setInterval(() => {
      this.opacity -= 0.01
      if (this.opacity <= 0) this.opacity = 1
    }, 16)
  },
  beforeDestroy() {
    clearInterval(this.timerId)
  }
  */
  // 组件激活钩子
  activated() {
    this.timerId = setInterval(() => {
      this.opacity -= 0.01
      if (this.opacity <= 0) this.opacity = 1
    }, 16)
  },
  // 组件失活钩子
  deactivated() {
    clearInterval(this.timerId)
  }
}
</script>

<style scoped>
li {
  height: 30px;
  margin-top: 20px;
}
</style>