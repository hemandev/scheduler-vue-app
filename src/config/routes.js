import VueRouter from 'vue-router'
import Vue from 'vue'
import TestSchedule from '../components/TestSchedule'
import DefineSchedule from '../components/DefineSchedule'
import Home from '../components/Home'

const routes = [

  {
    path: '/home',
    alias: '/',
    component: Home
  },

  {

  path: '/add-schedule',
  component: DefineSchedule

},
  {
    path: '/add-task',
    component: TestSchedule
  }

]

Vue.use(VueRouter)

export default new VueRouter({

  mode: 'history',
  routes

})


