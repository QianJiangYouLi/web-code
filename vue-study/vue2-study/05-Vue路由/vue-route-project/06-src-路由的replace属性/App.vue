<template>
  <div>
    <div class="row">
      <Banner/>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!--vue中用router-link标签实现路由切换 -->
          <!--replace，开启路由跳转时浏览器历史记录replace模式-->
          <router-link replace class="list-group-item" active-class="active" to="/about">About</router-link>
          <router-link replace class="list-group-item" active-class="active" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!-- 指定组件的呈现位置-->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Banner from '@/components/Banner'

export default {
  name: 'App',
  components: {Banner}
}
</script>

<style>

</style>
