<template>
  <div>

    <nav-bar :nav-items="navItems"></nav-bar>


    <div class="main">


      <!-- <i class="far fa-calendar-alt fa-5x text-muted"></i>-->

      <div class="empty-container" v-if="isEmpty">

        <i class="fas fa-tasks fa-5x text-muted"></i>

        <br>

        <p class="text-muted"> There's nothing here. Go create some tasks</p>

        <button class="button btn btn-outline-danger" @click="$router.push('add-task')"><i class="fas fa-plus"></i>
          <span style="padding-right: 5px"></span> Create
        </button>

      </div>

      <div class="content" v-else>

        <h1 class="text-center"> Your current tasks</h1>
        <br>
        <br>


        <table class="table">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Working Hours</th>
            <th scope="col">Start Date Time</th>
            <th scope="col">Duration</th>
            <th scope="col">End Date Time</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="task in tasks">
            <td> {{task.name}}</td>
            <td> {{task.workingHours}}</td>
            <td>{{task.startDateTime}}</td>
            <td>{{task.duration}}</td>
            <td>{{task.endDateTime}}</td>
          </tr>

          </tbody>
        </table>


      </div>


    </div>

  </div>
</template>

<script>
  import NavBar from "./NavBar";

  export default {
    name: "Home",
    components: {NavBar},
    data() {
      return {
        navItems: ['Home', 'Add Schedule', 'Add Task', 'Logout'],
        isEmpty: true,
        tasks: null
      }
    },


    created() {


      axios.get('/tasks')
        .then(res => {

          console.log("status" + res.data.status)
          if (res.data.status === true) {

            console.log("inside")

            this.isEmpty = false
            this.tasks = res.data.tasks


          }

          else
            this.isEmpty = true

        })


    }

  }
</script>

<style lang="sass" scoped>

  @import "../assets/_includes.sass"

  .main
    min-height: calc(100vh - 80px)
    display: flex
    flex-flow: column wrap
    justify-content: center
    align-items: center
    font-weight: 500

  .empty-container
    display: flex
    flex-flow: column wrap
    justify-content: center
    align-items: center

  .button
    border-radius: 0
    width: 100px


</style>
