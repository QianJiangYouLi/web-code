<template>
  <div class="app">
    <h1>{{ msg }}</h1>
    <Company/>
    <Employee/>
  </div>
</template>

<script>
import Employee from '@/components/Employee'
import Company from '@/components/Company'

export default {
  name: 'App',
  components: {
    Employee,
    Company
  },
  data() {
    return {
      msg: '欢迎来到本公司！'
    }
  }
}
</script>
<style>
.app {
  background-color: #aaa;
}
</style>