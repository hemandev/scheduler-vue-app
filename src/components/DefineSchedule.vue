<template>
  <div>
    <nav-bar :nav-items="navItems"></nav-bar>

    <div class="cont">

      <!--
            <p class="desc"> {{description}} </p>
      -->


      <div class="created-container" v-if="createdFlag">

        <i class="far fa-check-circle fa-5x text-success"></i>

        <br>

        <p class="text-muted">Schedule created. Click below to modify</p>

        <button class="button btn btn-outline-danger" @click="createdFlag=false">Modify</button>

      </div>




      <schedule-component v-else v-on="{created: success, failed: failed}"></schedule-component>


      <br>


      <div class="alert alert-danger" v-if="failedFlag">

        Schedule creation failed. Please try again!

      </div>



    </div>

  </div>

</template>

<script>
  import NavBar from './NavBar'
  import ScheduleComponent from "./ScheduleComponent";

  export default {
    name: "DefineSchedule",
    components: {ScheduleComponent, NavBar},
    data() {
      return {
        description: 'Scheduler helps the users create schedules based on their start and end times. Scheduling tasks have never been more easier!',
        navItems: ['Home', 'Add Schedule', 'Add Task', 'Logout'],
        createdFlag: false,
        failedFlag: false
      }
    },

    methods: {

      success() {

          this.createdFlag = true
          this.failedFlag = false


      },

      failed(){

          console.log("inside failed")
          this.createdFlag = false
          this.failedFlag = true
        //  setTimeout(() => this.failedFlag = true, 2000)


      }
    },

    created() {

      axios.get('/schedule')
        .then(res => {

          console.log(JSON.stringify(res.data))

          if (res.data.status === true) {
            this.createdFlag = true


          }

        })




    }
  }
</script>

<style lang="sass" scoped>

  @import "../assets/includes"

  input
    box-sizing: border-box
    position: absolute
    top: 0
    bottom: 0
    width: 300px
    height: 57px
    border: 1px solid $primary-red
    font-size: 18px
    -webkit-appearance: none

  .form-control:focus
    outline: none !important
    border: 1px solid $primary-red !important
    box-shadow: none !important

  .button
    width: 100px
    border-radius: 0

  .cont
    display: flex
    flex-flow: column wrap
    height: calc(100vh - 80px)
    align-items: center
    justify-content: center

  .button
    border-radius: 0
    width: 100px

  .created-container
    display: flex
    flex-flow: column wrap
    justify-content: center
    align-items: center


</style>
