<template>
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>薪资：{{ job.j1.salary }}k</p>
  <button @click="name+='~'">修改姓名</button>
  <button @click="age+=1">修改年龄</button>
  <button @click="job.j1.salary+=2">修改薪资</button>
</template>

<script>
import {reactive, toRef, toRefs} from 'vue'

export default {
  name: 'Demo',
  setup() {
    const person = reactive({
      name: '苏白',
      age: 24,
      job: {
        j1: {salary: 20}
      }
    })
    return {
      // name: toRef(person, 'name'),
      // age: toRef(person, 'age'),
      // salary: toRef(person.job.j1, 'salary')
      ...toRefs(person)
    }
  }
}
</script>

<style scoped>
hr {
  width: 100%;
  height: 10px;
  background-color: #ffa500;
}
</style>