<template>
  <div>
    <nav-bar :nav-items="navItems"></nav-bar>
    <div class="cont">


      <test-component v-if="scheduleCreated" v-on="{success: success, failed: failed}">

      </test-component>

      <div class="task-container" v-else>

        <i class="far fa-calendar-alt fa-5x text-muted"></i>

        <br>

        <p class="text-muted"> Tasks cannot be created without creating a schedule. Click below to create a schedule</p>

        <button class="button btn btn-outline-danger" @click="$router.push('add-schedule')"><i class="fas fa-plus"></i>
          <span style="padding-right: 5px"></span> Create
        </button>

      </div>

      <br>
      <br>


      <div>

        <transition mode="out-in" name="fade">
          <div class="alert task-alert alert-success" role="alert" v-if="successFlag">

            <p> End Date : {{value}}</p>

            Tasks created successfully! Goto home to view your list of scheduled tasks.

          </div>

        </transition>

      </div>



      <div class="alert alert-danger" v-if="taskFailedFlag">

        Task creation failed. Please try again!

      </div>


    </div>

  </div>

</template>

<script>
  import NavBar from './NavBar'
  import TestComponent from "./TestComponent";
  import anime from 'animejs'

  export default {
    name: "TestSchedule",
    components: {TestComponent, NavBar},
    data() {
      return {
        navItems: ['Home', 'Add Schedule', 'Add Task', 'Logout'],
        scheduleCreated: false,
        successFlag: false,
        value: '',
        taskFailedFlag: false
      }
    },

    methods: {

      success(value) {

        this.successFlag = true
        this.value = value
        this.taskFailedFlag =false




      },

      failed(){

        this.successFlag = false
        this.taskFailedFlag = true

      }


    },

    created() {

      this.successFlag = false

      axios.get('/schedule')
        .then(res => {
          if (res.data.status === true) {
            this.scheduleCreated = true

          }

        })

    }
  }
</script>

<style scoped>

  .fade-enter {
    opacity: .8;
  }

  .fade-enter-active {
    transition: opacity .8s ease;
  }

  .fade-leave {

    opacity: .8;

  }

  .fade-leave-active {
    transition: opacity .8s ease;
  }

  .cont {
    display: flex;
    flex-flow: column wrap;
    height: calc(100vh - 80px);
    justify-content: center;
    align-items: center;
  }

  .task-container {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
  }

  .button {
    border-radius: 0;
    width: 100px;
  }


</style>
