<template>
  <div>
    <Count/>
    <hr>
    <Person/>
  </div>
</template>

<script>
import Count from '@/components/Count'
import Person from '@/components/Person'

export default {
  name: 'App',
  components: {Count, Person}
}
</script>

<style>
hr {
  height: 10px;
  width: 100%;
  margin: 30px 0;
  background-color: #ffa500;
}
</style>
