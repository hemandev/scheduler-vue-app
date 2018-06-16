<template>

  <div>


    <h1> Create Schedule</h1>

<div class="input-error-holder">
    <input type="text" v-model="name" class="form-control" placeholder="Enter Schedule Name" aria-label="schedule-name">

    <p class=" invalid  text-danger" v-if="nameInvalid"> Please enter a name</p>
</div>

    <div class="input-error-holder">
    <input  class="form-control" v-model="startTime" placeholder=" Start Time (HH:mm:ss)">

    <p class="invalid text-danger"v-if="startTimeInvalid"> Please enter a valid start time</p>
    </div>

    <div class="input-error-holder">
    <input v-model="endTime" class="form-control" placeholder=" End Time (HH:mm:ss)">

    <p class=" invalid text-danger" v-if="endTimeInvalid"> Please enter a valid end time</p>

    <p class=" invalid text-danger" v-if="timeInvalid"> End time cannot be lower than or equal to start time</p>
    </div>


    <div class="input-error-holder">
    <div class="custom-control custom-checkbox" v-for="day in days">
      <input type="checkbox" :value="day" :id="day" v-model="checkedDays" class="custom-control-input">
      <label class="custom-control-label" :for="day">{{day}}</label>

    </div>

    <p class=" invalid text-danger" v-if="dayInvalid"> Check atleast one day</p>

    </div>


    <button class="btn button btn-outline-danger" @click="saveSchedule()">Save</button>
    <span class="fas fa-spinner fa-spin fa-2x text-danger ml-4" v-if="spinnerFlag"></span>


    <h2 class="text-success" v-if="success"> Schedule Created Succefully</h2>

  </div>


</template>

<script>


  import moment from 'moment'


  export default {
    name: "ScheduleComponent",
    data() {
      return {
        nameInvalid: false,
        startTimeInvalid: false,
        endTimeInvalid: false,
        timeInvalid: false,
        dayInvalid: false,

        format: 'MM/dd/yyyy',
        success: false,
        clear: true,
        timeFormat: 'HH:mm:ss',
        name: '',
        startTime: '',
        endTime: '',
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        checkedDays: [],
        spinnerFlag: false,
        count: 0
      }
    },


    methods: {


      validateInputs(){

        if(this.name.trim() === ''){
          this.nameInvalid = true
          return false
        }
        else
          this.nameInvalid = false


        if(!moment.utc(this.startTime, 'HH:mm:ss', true).isValid()){

          this.startTimeInvalid = true
          return false

        }

        else
          this.startTimeInvalid = false

        if(!moment.utc(this.endTime, 'HH:mm:ss', true).isValid()){

          this.endTimeInvalid = true
          return false

        }

        else
          this.endTimeInvalid = false

        if(moment.utc(this.endTime, 'HH:mm:ss').isSameOrBefore(moment.utc(this.startTime, 'HH:mm:ss'))){

          this.timeInvalid = true
          return false

        }

        else
          this.timeInvalid = false

        if(this.checkedDays.length === 0){

          this.dayInvalid = true
          return false
        }

        else
          this.dayInvalid = false


        return true



      },


      saveSchedule() {


        let daysArr = []


        const result = this.validateInputs()

        if (result) {

          for (const day of this.checkedDays) {
            if (this.days.includes(day)) {
              daysArr.push(this.days.indexOf(day))

            }
          }

          this.spinnerFlag = true

          axios.post('/schedule', {
            name: this.name,
            startTime: moment.utc(this.startTime, 'HH:mm:ss').format('HH:mm:ss'),
            endTime: moment.utc(this.endTime, 'HH:mm:ss').format('HH:mm:ss'),
            days: daysArr.join(','),
            email: 'anand@gmail.com'

          })
            .then(res => {


              console.log(JSON.stringify(res.data))
              if (res.data.status === true) {
                console.log(res.data.status)
                this.spinnerFlag = false
                this.$emit('created')
              }
              else {

                console.log("failed!!!")
                this.spinnerFlag = false
                this.$emit('failed')

              }

            })

            .catch(err => {
              console.log(err)
              this.spinnerFlag = false
              console.log("error occured!!!!")
              this.$emit('failed')
            })


        }

      }
    },


  }
</script>

<style lang="sass" scoped>

  .time-picker input.display-time
    border-radius: 5px

  .button
    border-radius: 0
    width: 100px

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


  .form-control:focus
    border-color: darkgrey !important
    box-shadow: unset !important




</style>
