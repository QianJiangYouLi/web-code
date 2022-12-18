<template>
  <div>
    <h2>当前求和为：{{ sum }}</h2>
    <h2>当前求和放大10倍为：{{ bigSum }}</h2>
    <h2>我在{{ company }}工作，职位是{{ position }}</h2>
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
import {mapState,mapGetters} from 'vuex'

export default {
  name: 'Count',
  data() {
    return {
      n: 1//当前选择的数字
    }
  },
  methods: {
    increment() {
      // this.$store.dispatch('jia',this.n)
      this.$store.commit('JIA', this.n)
    },
    decrement() {
      // this.$store.dispatch('jian',this.n)
      this.$store.commit('JIAN', this.n)
    },
    incrementOdd() {
      this.$store.dispatch('jiaOdd', this.n)
    },
    incrementWait() {
      this.$store.dispatch('jiaWait', this.n)
    }
  },
  computed: {
    /*
    // 自己动手写计算属性处理数据（从state中读取数据）
    sum() {
      return this.$store.state.sum
    },
    company() {
      return this.$store.state.company
    },
    position() {
      return this.$store.state.position
    },
    */

    // 借助mapState自动生成计算属性，从state中读取数据（对象写法）
    // ...mapState({sum: 'sum', company: 'company', position: 'position'}),

    // 借助mapState自动生成计算属性，从state中读取数据（数组写法）
    ...mapState(['sum', 'company', 'position']),

    /*
        bigSum() {
          return this.$store.getters.bigSum
        },
        */

    // 借助mapGetters自动生成计算属性，从getters中读取数据（对象写法）
    // ...mapGetters({bigSum: 'bigSum'})
    // 借助mapGetters自动生成计算属性，从getters中读取数据（数组写法）
    ...mapGetters(['bigSum'])
  }
}
</script>

<style scoped>
button {
  margin: 10px;
}
</style>