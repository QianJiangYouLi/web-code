<template>
  <Demo msg="哈哈" name="demo" @hello="sayHi">
    <span>嘻嘻</span>
  </Demo>
</template>

<script>
import Demo from '@/components/Demo'

export default {
  name: 'App',
  components: {Demo},
  setup() {
    const sayHi = value => alert(value)
    return {
      sayHi
    }
  }
}
</script>

<style>

</style>
