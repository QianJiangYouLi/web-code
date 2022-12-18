<template>
  <div>
    <Company/>
    <Employee/>
  </div>
</template>

<script>
import Employee from '@/components/Employee'
import Company from '@/components/Company'

export default {
  name: 'App',
  components: {
    Employee,
    Company
  }
}
</script>
