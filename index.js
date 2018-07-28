const { Client } = require('styletron-engine-atomic')

module.exports = class VueStyletron {
  constructor (options = { hydrate: true }) {
    // Automatically hydrate the client.
    if (options.hydrate && typeof document !== 'undefined') {
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
      methods: { style: this.styletron.renderStyle.bind(this.styletron) }
    })
  }
}
