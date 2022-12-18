import {onBeforeUnmount, onMounted, reactive} from 'vue'

export default function () {
  // 鼠标打点相关数据
  const point = reactive({x: 0, y: 0})

// 鼠标打点相关方法
  function savePoint(e) {
    point.x = e.clientX
    point.y = e.clientY
    console.log(e.clientX, e.clientY)
  }

  // 实现鼠标打点相关钩子
  onMounted(() => {
    window.addEventListener('click', savePoint)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click', savePoint)
  })

  return point
}
