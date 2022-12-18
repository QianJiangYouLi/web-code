<template>
  <input type="text" v-model="keyWord">
  <p><strong>{{ keyWord }}</strong></p>
</template>

<script>

import {customRef} from 'vue'

export default {
  name: 'App',
  components: {},
  setup() {
    function myRef(value, delay) {
      let timer
      return customRef((track, trigger) => {
            return {
              get() {
                track() // 通知Vue追踪数据value变化
                return value
              },
              set(v) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                  value = v
                  // 通知Vue重新解析模板
                  trigger()
                }, delay)
              }
            }
          }
      )
    }

    // let keyWord = ref('hello') // 内置ref
    let keyWord = myRef('hello', 500) // 自定义ref
    return {keyWord}
  }
}
</script>

<style>

</style>
