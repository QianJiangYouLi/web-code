<template>
  <h2>个人信息</h2>
  <label>
    <input type="text" v-model="person.firstName"> <br><br>
    <input type="text" v-model="person.lastName">
  </label>
  <p>全名：<input type="text" v-model="person.fullName"></p>
</template>

<script>
import {reactive, computed} from 'vue'

export default {
  name: 'Demo',
  setup() {
    const person = reactive({
      firstName: '苏',
      lastName: '白'
    })
    // 计算属性（简写）——不考虑计算属性被修改
    /* person.fullName = computed(() => {
       return person.firstName + '-' + person.lastName
     })*/

    // 计算属性——考虑计算属性被修改
    person.fullName = computed({
      get() {
        return person.firstName + '-' + person.lastName
      },
      set(v) {
        const nameArr = v.split('-')
        person.firstName = nameArr[0]
        person.lastName = nameArr[1]
      }
    })
    return {
      person
    }
  }
  /*
  // 不推荐这样混用
  computed: {
    fullName() {
      return this.person.firstName + '-' + this.person.lastName
    }
  }*/
}
</script>

<style scoped>

</style>