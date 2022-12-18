<template>
  <p>当前和：{{ sum }}</p>
  <button @click="sum++">点击</button>
  <hr>
  <p>当前鼠标点击坐标：x:{{ point.x }}，y:{{ point.y }}</p>
</template>

<script>
import {ref} from 'vue'
import usePoint from '@/hooks/usePoint'

export default {
  name: 'Demo',
  setup() {
    let sum = ref(0)
    // 使用鼠标打点
    const point = usePoint()
    return {sum, point}
  }
}
</script>

<style scoped>
hr {
  width: 100%;
  height: 10px;
  background-color: #ffa500;
}
</style>