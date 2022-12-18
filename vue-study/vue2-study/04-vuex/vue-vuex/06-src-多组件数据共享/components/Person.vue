<template>
  <div>
    <h2 style="color: #ffa500">求和组件的当前和是：{{ sum }}</h2>
    <h2>人员列表</h2>
    <input placeholder="请输入名字" v-model="name">
    <button @click="addPerson">添加</button>
    <ul>
      <li v-for="(p,index) in personsList" :key="index">{{ p.name }}</li>
    </ul>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'

export default {
  name: 'Person',
  data() {
    return {
      name: ''
    }
  },
  computed: {
    personsList() {
      return this.$store.state.personsList
    },
    sum() {
      return this.$store.state.sum
    }
  },
  methods: {
    addPerson() {
      const personObj = {
        id: nanoid(),
        name: this.name
      }
      this.name = ''
      this.$store.commit('ADD_PERSON', personObj)
    }
  }
}
</script>

<style scoped>

</style>