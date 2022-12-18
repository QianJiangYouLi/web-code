<template>
  <div>
    <h2>当前求和为：{{ sum }}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">奇数+</button>
    <button @click="incrementWait">等等再+</button>
  </div>
</template>

<script>
export default {
  name: 'Count',
  data() {
    return {
      n: 1,//当前选择的数字
      sum: 0 // 当前和
    }
  },
  methods: {
    increment() {
      this.sum += this.n
    },
    decrement() {
      this.sum -= this.n
    },
    incrementOdd() {
      if (this.sum % 2 !== 0) this.sum += this.n

    },
    incrementWait() {
      setTimeout(() => this.sum += this.n, 1000)
    }
  }
}
</script>

<style scoped>
button {
  margin: 10px;
}
</style>