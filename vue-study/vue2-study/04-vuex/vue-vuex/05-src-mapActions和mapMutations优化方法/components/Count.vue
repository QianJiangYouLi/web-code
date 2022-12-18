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
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">奇数+</button>
    <button @click="incrementWait(n)">等等再+</button>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: 'Count',
  data() {
    return {
      n: 1
    }
  },
  methods: {
    // 亲手写方法
    /*
     increment() {
        this.$store.commit('JIA', this.n)
      },
      decrement() {
        this.$store.commit('JIAN', this.n)
      },
      */
    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations（对象写法）
    ...mapMutations({increment: 'JIA', decrement: 'JIAN'}),

    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations（数组写法）
    // ...mapMutations(['JIA','JIAN']),


    /*
    incrementOdd() {
      this.$store.dispatch('jiaOdd', this.n)
    },
    incrementWait() {
      this.$store.dispatch('jiaWait', this.n)
    }
    */

    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（对象写法）
    ...mapActions({incrementOdd: 'jiaOdd', incrementWait: 'jiaWait'})
    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（数组写法）
    // ...mapActions(['jiaOdd', 'jiaWait'])
  },
  computed: {
    // 借助mapState自动生成计算属性，从state中读取数据（对象写法）
    // ...mapState({sum: 'sum', company: 'company', position: 'position'}),

    // 借助mapState自动生成计算属性，从state中读取数据（数组写法）
    ...mapState(['sum', 'company', 'position']),


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