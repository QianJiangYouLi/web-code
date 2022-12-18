<template>
  <div>
    <h2>{{ msg }}</h2>
    <p @click="showName">公司名称：{{ name }}</p>
    <p>公司地址：{{ address }}</p>
  </div>
</template>
<script>
import {mixin} from '@/mixin'

export default {
  name: 'Company',
  data() {
    return {
      msg: '公司信息',
      name: '虹软科技有限公司',
      address: '虹软科技园'
    }
  },
  mixins:[mixin]
}
</script>