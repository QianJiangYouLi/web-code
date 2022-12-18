<template>
  <p>当前和：{{ sum }}</p>
  <button @click="sum++">点击</button>
  <hr>
  <p>当前的信息：{{ msg }}</p>
  <button @click="msg+='!'">点击</button>
  <hr>
  <p>姓名：{{ person.name }}</p>
  <p>年龄：{{ person.age }}</p>
  <p>薪资：{{ person.job.j1.salary }}k</p>
  <button @click="person.name+='~'">修改姓名</button>
  <button @click="person.age+=1">修改年龄</button>
  <button @click="person.job.j1.salary+=2">修改薪资</button>
</template>

<script>
import {reactive, ref, watch, watchEffect} from 'vue'

export default {
  name: 'Demo',
  setup() {
    let sum = ref(0)
    let msg = ref('hello')
    const person = reactive({
      name: '苏白',
      age: 24,
      job: {
        j1: {salary: 20}
      }
    })
    // 一个完整的监视
    /*
        watch(sum, (newValue, oldValue) => console.log('sum变化了', newValue, oldValue), {immediate: true})
    */

    //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
    watchEffect(() => {
      const x1 = sum.value
      const x2 = person.job.j1.salary
      console.log('watchEffect指定回调执行了', x1, x2)
    })

    return {
      sum,
      msg,
      person
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