<template>
  <h3>个人信息</h3>
  <p>姓名：{{ person.name }}</p>
  <p>年龄：{{ person.age }}</p>
  <p>职位：{{ person.job.type }}</p>
  <p>薪资：{{ person.job.salary }}</p>
  <p>爱好：</p>
  <ul>
    <li v-for="(h,index) in person.hobbies" :key="index">{{ h }}</li>
  </ul>
  <button @click="changeInfo">修改信息</button>
</template>

<script>
import {reactive} from 'vue'

export default {
  name: 'App',
  setup() {
    const person = reactive({
      name: 'YuHuo',
      age: 24,
      hobbies: ['吃饭', '睡觉', '打豆豆'],
      job: {
        type: '前端工程师',
        salary: '15k'
      }
    })
    const changeInfo = () => {
      person.job.salary = '20k'
      person.hobbies[0] = '吃饭饭'
    }
    return {
      person,
      changeInfo
    }
  }
}
</script>

<style>

</style>
