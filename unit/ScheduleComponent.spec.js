import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import ScheduleComponent from '../src/components/ScheduleComponent'
const wrapper = shallowMount(ScheduleComponent)

describe('ScheduleComponent.vue', () => {

  it('A sample unit test', () => {
    expect(wrapper.find('h1').text()).contains('Create Schedule')
  })


  it('Invalid name error should be displayed if no name is given as input', () => {


    wrapper.setData({name: 'hemand'})

   // console.log(wrapper.getData(name))

    //expect(true).to.be.true
  })


})
