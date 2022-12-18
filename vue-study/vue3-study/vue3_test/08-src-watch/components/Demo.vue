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
import {reactive, ref, watch} from 'vue'

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

    // 监视情况1：监视ref定义的一响应式数据
    // watch(sum, (newValue, oldValue) => console.log('sum变了', newValue, oldValue), {immediate: true})

    // 监视情况2：监视ref定义的多个响应式数据
    // watch([sum, msg], (newValue, oldValue) => console.log('sum或msg变了', newValue, oldValue), {immediate: true})

    // 监视情况3：监视reactive定义的一个响应式数据全部属性（此处无法获得正确的oldValue，强制开启了深度监视，deep无效)
    // watch(person, (newValue, oldValue) => console.log('person变了', newValue, oldValue))

    // 监视情况4:监视reactive定义的一个响应式数据的某个属性
    // watch(() => person.age, (newValue, oldValue) => console.log('person.age变了', newValue, oldValue))

    // 监视情况5:监视reactive定义的一个响应式数据的某些属性
    // watch([() => person.name, () => person.age], (newValue, oldValue) => console.log('name或者age变了', newValue, oldValue))

    // 特殊情况:监视reactive定义的对象中的某个属性，deep配置有效
    watch(() => person.job, (newValue, oldValue) => console.log('person.job变了', newValue, oldValue), {deep: true})

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