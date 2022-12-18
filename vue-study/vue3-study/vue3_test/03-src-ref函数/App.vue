<template>
  <h3>个人信息</h3>
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>职位：{{ job.type }}</p>
  <p>薪资：{{ job.salary }}</p>
  <button @click="changeInfo">修改信息</button>
</template>

<script>
import {ref} from 'vue'

export default {
  name: 'App',
  setup() {
    let name = ref('YuHuo')
    let age = ref(24)
    const job = ref({
      type: '前端工程师',
      salary: '15k'
    })
    const changeInfo = () => {
      name.value = '渔火'
      age.value = 25
      job.value.salary = '20k'
    }
    return {
      name,
      age,
      job,
      changeInfo
    }
  }
}
</script>

<style>

</style>
