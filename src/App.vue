<template>
  <div id="app">

    <router-view>

    </router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="sass">

  body
    font-family: 'Raleway', sans-serif
    list-style: none

</style>
