/**
 * @jest-environment node
 */
import { readFileSync } from 'fs'
import { join } from 'path'

import Vue from 'vue/dist/vue'
import { Server } from 'styletron-engine-atomic'
import { createRenderer } from 'vue-server-renderer'

import HelloMessage from './fixtures/HelloMessage.vue'
import VueStyletron from '../'
import renderComponents from '../renderComponents'

// Create a Styletron server instance.
const styletron = new Server()

//
Vue.use(VueStyletron, { styletron })

// Create a renderer instance with the test template.
const template = readFileSync(join(__dirname, './fixtures/index.html'), 'utf-8')
const renderer = createRenderer({ template })

test('server generates styles and classes', async () => {
  try {
    // Create and mount the app with styletron as an option.
    const app = new Vue({ render: h => h(HelloMessage) })

    //
    renderComponents(styletron, )

    // Extract the stylesheet HTML from Styletron.
    // styletron.renderStyle({ backgroundColor: '#000' })
    const styles = styletron.getStylesheetsHtml()

    // Generate the page HTML from the renderer and stylesheet HTML.
    const html = await renderer.renderToString(app, { styles })

    // Epect the generated HTML to have generated styles and classes.
    expect(html).toMatchSnapshot()
  } catch (err) {
    fail(err)
  }
})
