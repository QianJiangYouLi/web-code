<template>
  <h2>我是About的内容</h2>
</template>

<script>
export default {
  name: 'About',
  // 通过路由规则进入该组件时调用
  beforeRouteEnter(to,from,next){
    if (to.meta.isAuth) {
      if (localStorage.getItem('username') === 'YuHuo') {
        next()
      } else {
        alert('您没有权限查看')
      }
    } else {
      next()
    }
  },
  // 通过路由规则离开该组件时调用
  beforeRouteLeave(to,from,next){
    next()
  }
}
</script>

<style scoped>

</style>