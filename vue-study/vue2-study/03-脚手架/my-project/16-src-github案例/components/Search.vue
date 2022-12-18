<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="keyWord"/>
      &nbsp;
      <button @click="searchUsers">Search</button>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Search',
  data() {
    return {
      keyWord: ''
    }
  },
  methods: {
    searchUsers() {
      // 请求前更新List数据
      this.$bus.$emit('updateListDate', {isFirst: false, isLoading: true, errMsg: '', users: []})
      axios
          .get(`https://api.github.com/search/users?q=${this.keyWord}`)
          .then(
              // 请求成功后更新List数据
              res => this.$bus.$emit('updateListDate', {isLoading: false, errMsg: '', users: res.data.items}),
              // 请求失败后更新List数据
              err => this.$bus.$emit('updateListDate', {isLoading: false, errMsg: err.message, users: []})
          )
    }
  }
}
</script>

<style scoped>

</style>