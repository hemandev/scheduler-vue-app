import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import TestComponent from '../src/components/TestComponent'
const wrapper = shallowMount(TestComponent)

describe('TestComponent.vue', () => {

  it('To check if elements are mounted inside DOM', () => {
    expect(wrapper.find('.task-holder')).to.exist
  })




})


