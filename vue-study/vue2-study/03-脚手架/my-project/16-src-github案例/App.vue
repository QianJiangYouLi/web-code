<template>
  <div class="container">
    <Search/>
    <MyList/>
  </div>
</template>

<script>
import Search from '@/components/Search'
import MyList from '@/components/MyList'

export default {
  name: 'App',
  components: {Search, MyList}
}
</script>

<style>

</style>
