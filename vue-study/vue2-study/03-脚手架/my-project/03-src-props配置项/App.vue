<template>
  <div>
    <Employee name="苏白" gender="男" position="前端工程师" :age="24"/>
    <Employee name="渔火" gender="男" position="UI设计师"/>
  </div>
</template>

<script>
import Employee from '@/components/Employee'

export default {
  name: 'App',
  components: {
    Employee
  }
}
</script>
