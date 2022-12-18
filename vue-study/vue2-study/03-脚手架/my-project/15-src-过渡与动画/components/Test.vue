<template>
  <div>
    <button @click="isShow=!isShow">显示/隐藏</button>
    <transition appear name="hello">
      <h2 v-show="isShow">动画</h2>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Test',
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

.hello-enter-active {
  animation: test .5s;
}

.hello-leave-active {
  animation: test .5s reverse;
}

@keyframes test {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>