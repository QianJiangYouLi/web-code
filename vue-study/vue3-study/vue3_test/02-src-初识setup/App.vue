<template>
  <h3>个人信息</h3>
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <button @click="sayHi">打招呼</button>
</template>

<script>
export default {
  name: 'App',
  // 暂时不考虑响应式
  setup() {
    // 数据
    let name = 'YuHuo'
    let age = 24
    // 方法
    const sayHi = () => {
      console.log(`你好啊，我叫${name},今年${age}岁,见到你很高兴`)
    }
    // 返回一个对象
    return {
      name,
      age,
      sayHi
    }
    // 返回一个渲染函数
    // return () => h('h1', '哈哈')
  }
}
</script>

<style>

</style>
