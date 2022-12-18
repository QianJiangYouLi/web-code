<template>
  <div>
    <h2>当前求和为：{{ sum }}</h2>
    <h2>当前求和放大10倍为：{{ bigSum }}</h2>
    <h2>我在{{ company }}工作，职位是{{ position }}</h2>
    <h2 style="color: #ffa500">人员列表组件总人数：{{personsList.length}}</h2>
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
    ...mapMutations({increment: 'JIA', decrement: 'JIAN'}),
    ...mapActions({incrementOdd: 'jiaOdd', incrementWait: 'jiaWait'})

  },
  computed: {
    ...mapState(['sum', 'company', 'position','personsList']),
    ...mapGetters(['bigSum'])
  }
}
</script>

<style scoped>
button {
  margin: 10px;
}
</style>