/**
 * @jest-environment node
 */
import { readFileSync } from 'fs'
import { join } from 'path'

import Vue from 'vue/dist/vue'
import { createRenderer } from 'vue-server-renderer'
import { Server } from 'styletron-engine-atomic'

import VueStyletron from '../'
import HelloMessage from './fixtures/HelloMessage.vue'

// Create a renderer instance with the test template.
const template = readFileSync(join(__dirname, './fixtures/index.html'), 'utf-8')
const renderer = createRenderer({ template })

const styletron = new Server()
const vueStyletron = new VueStyletron({ styletron })

Vue.use(vueStyletron)

test('server generates styles and classes', async () => {
  try {
    // Render the styles for the HelloMessage component.
    vueStyletron.renderComponentStyles(HelloMessage)

    // Create and mount the app with styletron as an option.
    const app = new Vue({ render: h => h(HelloMessage) })

    // Extract the stylesheet HTML from Styletron.
    const styles = styletron.getStylesheetsHtml()

    // Generate the page HTML from the renderer and stylesheet HTML.
    const html = await renderer.renderToString(app, { styles })

    // Epect the generated HTML to have generated styles and classes.
    expect(html).toMatchSnapshot()
  } catch (err) {
    fail(err)
  }
})
