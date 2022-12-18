<template>
  <div>
    <h3>{{ msg }}</h3>
    <p @click="showName">姓名：{{ name }}</p>
    <p>职位：{{ position }}</p>
  </div>
</template>

<script>
import {mixin} from '@/mixin'

export default {
  name: 'Employee',
  data() {
    return {
      msg: '员工信息',
      name: '苏白',
      position: '前端工程师'
    }
  },
  mixins:[mixin]
}
</script>