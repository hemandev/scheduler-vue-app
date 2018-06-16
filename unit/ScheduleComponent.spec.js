import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import ScheduleComponent from '../src/components/ScheduleComponent'
const wrapper = shallowMount(ScheduleComponent)
const vm = wrapper.vm

describe('ScheduleComponent.vue', () => {

  it('To check if elements are mounted inside DOM', () => {
    expect(wrapper.find('h1').text()).contains('Create Schedule')
  })


  it('No error should be displayed if  name is valid', () => {


    wrapper.setData({name: 'Hemand'})

    wrapper.find('button').trigger('click')

    expect(vm.$data.nameInvalid).to.be.false

  })

  it('Invalid name error should be displayed if no name is given as input', () => {


    wrapper.setData({name: ''})

    wrapper.find('button').trigger('click')

    expect(wrapper.find('.name-invalid').text()).to.equal("Please enter a name")

  })


  it('Invalid date error should be displayed if  wrong date is given as input', () => {


    wrapper.setData({startTime: '9824'})

    wrapper.find('button').trigger('click')

    expect(vm.$data.startTimeInvalid).to.be.true

  })









})


