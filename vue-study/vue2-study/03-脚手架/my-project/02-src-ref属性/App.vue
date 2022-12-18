<template>
  <div>
    <h2 v-text="msg" ref="title"></h2>
    <button @click="showDOM" ref="btn">点击</button>
    <Company ref="company"/>
  </div>
</template>

<script>
import Company from '@/components/Company'

export default {
  name: 'App',
  components: {Company},
  data() {
    return {
      msg: '欢迎来到虹软大厦'
    }
  },
  methods: {
    showDOM() {
      console.log(this.$refs.title) // 真实的DOM
      console.log(this.$refs.btn) // 真实的DOM
      console.log(this.$refs.company) // 组件实例对象vc
    }
  }
}
</script>
