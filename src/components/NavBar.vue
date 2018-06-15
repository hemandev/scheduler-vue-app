<template>
  <ul class="nav-bar">

    <router-link tag="li" class="brand-logo" to="/">Scheduler</router-link>
    <router-link tag="li" class="item" v-for="item in navItems" :to="item.toLowerCase().replace(/\s+/g, '-')">
      {{item}}
    </router-link>
  </ul>

</template>

<script>
  export default {
    name: "NavBar",

    props: ['navItems'],

    data() {

      return {}


    }
  }
</script>

<style lang="sass" scoped>

  @import "../assets/includes"

  .nav-bar
    display: flex
    flex-flow: row wrap
    align-items: center
    justify-content: flex-start
    height: 60px
    font-family: 'Raleway', sans-serif
    background-color: $primary-red
    list-style-type: none
    color: white
    padding-right: 10px

    .brand-logo
      margin-right: auto
      font-weight: 300
      color: white
      font-size: 2em
      cursor: pointer
      background-color: unset !important

    .item
      padding: 18px
      cursor: pointer

  .router-link-active
    background-color: rgba(255,0,0,.5)


</style>
