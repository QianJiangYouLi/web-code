<template>
  <div class="row">
    <!--展示用户信息-->
    <div class="card" v-for="user in info.users" :key="user.id" v-show="info.users.length">
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style='width: 100px' alt=""/>
      </a>
      <p class="card-text">{{ user.login }}</p>
    </div>
    <!-- 展示欢迎词-->
    <h2 v-show="info.isFirst">欢迎使用!</h2>
    <!--展示加载中-->
    <h2 v-show="info.isLoading">加载中</h2>
    <!-- 展示错误信息-->
    <h2 v-show="info.errMsg">{{ info.errMsg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'MyList',
  data() {
    return {
      info: {
        isFirst: true,// 是否初次展示
        isLoading: false, //是否加载中
        errMsg: '',// 错误信息
        users: [] // 用户信息
      }
    }
  },
  mounted() {
    // 绑定自定义事件接收数据
    this.$bus.$on('updateListDate', dataObj => this.info = {...this.info, ...dataObj})
  },
  beforeDestroy() {
    // 解绑自定义事件
    this.$bus.$off('updateListDate')
  }
}
</script>

<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>