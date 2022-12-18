<template>
  <div class="container">
    <Category title="美食">
      <img src="https://s3.ax1x.com/2021/01/16/skJ1q0.jpg" alt="" slot="center">
      <a href="#" slot="footer">更多美食</a>
    </Category>
    <Category title="游戏">
      <ul slot="center">
        <li v-for="(g,index) in grams" :key="index">{{ g }}</li>
      </ul>
      <a href="#" slot="footer">更多游戏</a>
    </Category>
    <Category title="小说">
      <ul slot="center">
        <li v-for="(n,index) in novels" :key="index">{{ n }}</li>
      </ul>
      <template v-slot:footer>
        <div class="foot">
          <a href="#">玄幻小说</a>
          <a href="#">科幻小说</a>
        </div>
        <h4>更多小说前往中文网</h4>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from '@/../../../vue-request/src/components/Category'

export default {
  name: 'App',
  components: {Category},
  data() {
    return {
      foods: ['红烧太岁', '铁锅炖大鹏', '蜜汁九凤', '干锅饕餮'],
      grams: ['王者荣耀', '穿越火线', '刺激战场', '魔兽世界'],
      novels: ['魔道祖师', '吾命将休', '硬核快穿', '昭如日月']
    }
  }
}
</script>

<style>
.container, .foot {
  display: flex;
  justify-content: space-around;
}

img {
  width: 100%;
}

h4 {
  text-align: center;
}
</style>
