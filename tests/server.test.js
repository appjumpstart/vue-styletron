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

Vue.use(VueStyletron, { styletron })

test('server generates styles and classes', async () => {
  try {
    // Create and mount the app with styletron as an option.
    const app = new Vue({ render: h => h(HelloMessage) })

    // Render the app so that the created hook gets called and triggers the
    // necessary renderStyle calls. This wouldn't be necessary if
    // createBundleRenderer was used since it would allow the template context
    // to be dynamically generated.
    await renderer.renderToString(app, { styles: null })

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
