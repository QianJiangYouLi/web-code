<template>
  <div class="category">
    <h3>{{ title }}分类</h3>
    <slot name="center">默认值，使用者没有传递具体结构时展示</slot>
    <slot name="footer">默认值，使用者没有传递具体结构时展示</slot>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: ['title']
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