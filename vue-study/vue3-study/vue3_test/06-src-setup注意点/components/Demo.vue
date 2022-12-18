<template>
  <h3>个人信息</h3>
  <p>姓名：{{ person.name }}</p>
  <p>年龄：{{ person.age }}</p>
  <button @click="test">test</button>
</template>

<script>
import {reactive} from 'vue'
export default {
  name: 'Demo',
  props:['msg','name'],
  emits:['hello'],
  /*beforeCreate() {
    console.log('-----beforeCreate----')
  },*/
  setup(props,content) {
    // console.log('-----setup----',props)
    // console.log('-----setup----',content.attrs) // 相当于vue2中的$attrs
    // console.log('-----setup----',content.emits) // 相当于vue2中的$emit
    console.log('-----setup----',content.slots) // 相当于vue2中的$slots
    const person = reactive({
      name: 'YuHuo',
      age: 24,
    })
    const test = () => content.emit('hello',666)
    return {
      person,
      test
    }
  }
}
</script>

<style scoped>

</style>