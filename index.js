import { Client } from 'styletron-engine-atomic'

export default class VueStyletron {
  constructor (options = {}) {
    // Automatically hydrate the client.
    if (typeof document !== 'undefined' && options.hydrate === undefined) {
      const styles = document.getElementsByClassName('_styletron_hydrate_')
      if (Array.from(styles).some(style => style.innerHTML.length)) {
        options.hydrate = styles
      }
    }

    // Use a Styletron instance passed through constructor options or default to
    // a new instance of Styletron Client.
    this.styletron = options.styletron || new Client(options)
  }

  install (Vue) {
    // Add a global mixin so that VueStyletron can be used in all components.
    Vue.mixin({
      // Make the renderStyle and renderStyles methods available in components
      // in case styles need to be generated dynamically.
      methods: { renderStyle: this.styletron.renderStyle.bind(this.styletron) },
      // Add the generated styles to the component's data, generating them if
      // they're not found in the components map.
      data () {
        const data = { styles: {} }
        if (this.$options.styles) {
          for (const key of Object.keys(this.$options.styles)) {
            data.styles[key] = this.renderStyle(this.$options.styles[key])
          }
        }
        return data
      }
    })
  }
}
