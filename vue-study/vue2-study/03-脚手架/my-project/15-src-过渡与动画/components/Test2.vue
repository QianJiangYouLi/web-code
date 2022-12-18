<template>
  <div>
    <button @click="isShow=!isShow">显示/隐藏</button>
    <transition-group appear name="hello">
      <h2 v-show="isShow" key="1">过渡</h2>
      <h2 v-show="!isShow" key="2">过渡呀</h2>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Test2',
  data() {
    return {
      isShow: true
    }
  }
}
</script>

<style scoped>
h2 {
  background-color: #ffa500;
}

/*进入的起点,离开的终点*/
.hello-enter, .hello-leave-to {
  transform: translateX(-100%);
}

/*进入与离开过程*/
.hello-enter-active, .hello-leave-active {
  transition: .5s linear;
}

/*进入的终点,离开的起点*/
.hello-enter-to, .hello-leave {
  transform: translateX(0);
}
</style>