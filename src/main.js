import Vue from 'vue'
import App from './App.vue'
import router from './config/routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import 'vue2-slot-calendar/lib/calendar.min.css'
import Vuelidate from 'vuelidate'


Vue.use(Vuelidate)


window.axios = axios
axios.defaults.baseURL = 'http://18.188.184.202:8080/api/'
//axios.defaults.baseURL = 'http://localhost:8000/api/'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
