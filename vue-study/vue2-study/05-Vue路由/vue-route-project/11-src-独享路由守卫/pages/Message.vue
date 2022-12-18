<template>
  <div>
    <ul>
      <li v-for="msg in messageList" :key="msg.id">
        <router-link :to="{name:'detail',params:{id:msg.id,title:msg.title}}">
          {{ msg.title }}
        </router-link>
        <button @click="pushShow(msg)">push查看</button>
        <button @click="replaceShow(msg)">replace查看</button>
      </li>
    </ul>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      messageList: [
        {id: '001', title: '消息001'},
        {id: '002', title: '消息002'},
        {id: '003', title: '消息003'}
      ]
    }
  },
  methods: {
    pushShow(msg) {
      this.$router.push({
        name: 'detail', params: {id: msg.id, title: msg.title}
      })
    },
    replaceShow(msg) {
      this.$router.replace({
        name: 'detail', params: {id: msg.id, title: msg.title}
      })
    }
  }
}
</script>

<style scoped>
li {
  height: 30px;
  margin: 10px;
}

hr {
  width: 100%;
  height: 20px;
  background-color: #ffa500;
}

button {
  margin-left: 20px;
}
</style>