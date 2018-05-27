import Vue from 'vue/dist/vue'
import { Client } from 'styletron-engine-atomic'

import HelloMessage from './fixtures/HelloMessage.vue'
import VueStyletron from '../'

// Create a Styletron client instance.
const styletron = new Client()

//
Vue.use(VueStyletron, { styletron })

// Create a container div that the test will mount the application to.
const container = document.createElement('div')
container.setAttribute('id', 'app')

// Add the container div to the body.
document.body.appendChild(container)

test('client generates styles and classes', () => {
  // Create and mount the app with styletron as an option.
  new Vue({ render: h => h(HelloMessage) }).$mount('#app')

  // The head should contain the generated styles.
  expect(document.head).toMatchSnapshot()

  // The body should contain the rendered component with generated class names.
  expect(document.body).toMatchSnapshot()
})
