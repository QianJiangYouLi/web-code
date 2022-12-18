<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot :games="games">默认内容</slot>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: ['title'],
  data() {
    return {
      games: ['王者荣耀', '穿越火线', '刺激战场', '魔兽世界'],
    }
  }
}
</script>

<style scoped>
.category {
  width: 200px;
  height: 300px;
  background-color: #0ff;
}

h3 {
  text-align: center;
  background-color: #ffa500;
}
</style>