import { mount } from '@vue/test-utils'
import Home from './../src/views/Home.vue'

describe('App', () => {
  // Inspect the raw component options
  it('has data', () => {
    expect(typeof Home.data).toBe('function')
  })
})

describe('Mounted App', () => {
  const wrapper = mount(Home)
  console.log(Home.data)
  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('Car Repair Appointment Contact')
  })
})
