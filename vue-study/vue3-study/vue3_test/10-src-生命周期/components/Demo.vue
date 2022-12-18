<template>
  <p>当前和：{{ sum }}</p>
  <button @click="sum++">点击</button>
</template>

<script>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  ref,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

export default {
  name: 'Demo',
  setup() {
    let sum = ref(0)
    // 组合式API方式写生命周期钩子
    console.log('---setup---')
    onBeforeMount(() => console.log('---onBeforeMount---'))
    onMounted(() => console.log('---onMounted---'))
    onBeforeUpdate(() => console.log('---onBeforeUpdate---'))
    onUpdated(() => console.log('---onUpdate---'))
    onBeforeUnmount(() => console.log('---onBeforeUnmount---'))
    onUnmounted(() => console.log('---onUnmounted---'))
    return {sum}
  }
  // 通过配置项形式写生命钩子
  /*
    beforeCreate() {console.log('---beforeCreate---')},
    created() {console.log('---created---')},
    beforeMount() {console.log('---beforeMount---')},
    mounted() {console.log('---mounted---')},
    beforeUpdate() {console.log('---beforeUpdate---')},
    updated() {console.log('---updated---')},
    beforeUnmount() {console.log('---beforeUnmount---')},
    unmounted() {console.log('---unmounted---')}
    */
}
</script>

<style scoped>
hr {
  width: 100%;
  height: 10px;
  background-color: #ffa500;
}
</style>