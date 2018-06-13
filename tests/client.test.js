import { shallowMount, createLocalVue } from '@vue/test-utils'

import VueStyletron from '../'
import HelloMessage from './fixtures/HelloMessage.vue'

// Create test-utils-based local Vue instance.
const localVue = createLocalVue()

// Use the VueStyletron Client plugin.
localVue.use(VueStyletron)

test('client generates styles and classes', () => {
  // Create and mount the app.
  const wrapper = shallowMount(HelloMessage, { localVue })

  // The head should contain a styles block.
  expect(document.head).toMatchSnapshot()

  // The wrapper element should contain the rendered component with generated
  // class names.
  expect(wrapper.element).toMatchSnapshot()
})
