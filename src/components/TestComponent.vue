<template>
  <div class="task-holder">



    <h1 class="text-center" style="align-self: center"> Add a Task </h1>



    <div class="input-error-holder">
    <input type="text" v-model="name" class="form-control" placeholder="Task Name">
    <p class=" invalid  text-danger" v-if="nameInvalid"> Please enter a  name</p>
    </div>


    <div class="input-error-holder">
    <input type="text" v-model="duration" class="form-control" placeholder="Duration (Days)">
    <p class=" invalid  text-danger" v-if="durationInvalid"> Please enter a valid duration value</p>
    </div>

    <div class="input-error-holder">
    <input type="text" v-model="startDateTime" class="form-control" placeholder="Start date-time (yyyy-mm-dd hh:mm:ss)">
    <p class=" invalid  text-danger" v-if="dateInvalid"> Please enter a valid date</p>
    </div>

    <button class="btn  button btn-outline-danger" @click="createTask()">Add</button>
    <span class="fas fa-spinner fa-spin fa-2x text-danger ml-4" v-if="spinnerFlag"></span>




  </div>
</template>

<script>


  import moment from 'moment'

  export default {
    name: "TestComponent",
    data() {

      return {

        name: '',
        duration: '',
        startDateTime: '',
        successFlag: false,
        nameInvalid: false,
        durationInvalid: false,
        dateInvalid: false,
        spinnerFlag: false

      }

    },

    methods: {

      isInt(value) {
        return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
      },

      validate(){

        if(this.name.trim() === ''){
          this.nameInvalid = true
          return false
        }
        else
          this.nameInvalid = false

        if(!this.isInt(this.duration) ||  parseInt(this.duration) <= 0 ){
          this.durationInvalid = true
          return false
        }
        else
          this.durationInvalid = false


        if(!moment(this.startDateTime, 'YYYY-MM-DD HH:mm:ss', true).isValid()){

          this.dateInvalid = true
          return false


        }

        else
          this.dateInvalid = false

        console.log("date" + moment(this.startDateTime).format('YYYY-MM-DD HH:mm:ss'))

        return true

      },

      createTask() {

        const result = this.validate()


        if (result) {

          this.spinnerFlag = true

          axios.post('/tasks', {
            name: this.name,
            duration: this.duration,
            startDateTime: moment(this.startDateTime).format('YYYY-MM-DD HH:mm:ss'),
            email: 'anand@gmail.com'
          })

            .then(res => {


              if (res.data.status === true) {

                console.log(res.data.finalDate)
                this.spinnerFlag = false
                this.$emit('success', res.data.finalDate)


              }

              else{
                console.log("inside failed!!" + JSON.stringify(res.data))
                this.$emit('failed')
                this.spinnerFlag = false
              }


            })

            .catch(err => {
              this.$emit('failed')
              console.log("error" + err)
              this.spinnerFlag = false
            })


        }

      }

    },

    created() {


    }

  }
</script>

<style lang="sass" scoped>

  .task-holder
    display: flex
    flex-flow: column wrap
    justify-content: center
    align-items: flex-start

    .button
      border-radius: 0
      width: 100px

  input
    width: 400px

  .input-error-holder
    margin-top: 35px
    margin-bottom: 35px

  .invalid
    margin-top: 3px
    margin-bottom: 3px
    font-size: .8em
    font-family: 'Raleway', sans-serif
    font-weight: 400
    padding-left: 5px


</style>
