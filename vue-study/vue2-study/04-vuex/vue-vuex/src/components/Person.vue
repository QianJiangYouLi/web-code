<template>
  <div>
    <h2 style="color: #ffa500">求和组件的当前和是：{{ sum }}</h2>
    <h2>人员列表</h2>
    <input placeholder="请输入名字" v-model="name">
    <button @click="addPerson">添加</button>
    <button @click="addWang">添加姓王的人</button>
    <h3>列表第一人名字：{{ firstPersonName }}</h3>
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
      return this.$store.state.personOptions.personsList
    },
    sum() {
      return this.$store.state.countOptions.sum
    },
    firstPersonName() {
      return this.$store.getters['personOptions/firstPersonName']
    }
  },
  methods: {
    addPerson() {
      const personObj = {
        id: nanoid(),
        name: this.name
      }
      this.$store.commit('personOptions/ADD_PERSON', personObj)
      this.name = ''
    },
    addWang() {
      const personObj = {id: nanoid(), name: this.name}
      this.$store.dispatch('personOptions/addPersonWang', personObj)
      this.name = ''
    }
  }
}
</script>

<style scoped>

</style>