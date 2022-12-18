<template>
  <div class="demo title">
    <h3>{{ msg }}</h3>
    <p>姓名：{{ name }}</p>
    <p>职位：{{ position }}</p>
  </div>
</template>

<script>
export default {
  name: 'Employee',
  data() {
    return {
      msg: '员工信息',
      name: '苏白',
      position: '前端工程师'
    }
  }
}
</script>
<style scoped>
.demo {
  background-color: #ffa500;
}
</style>