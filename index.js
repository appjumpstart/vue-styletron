import { Client } from 'styletron-engine-atomic'

export default class VueStyletron {
  constructor (options = {}) {
    // Create a mapping for each component to it's generated styles.
    this.components = {}

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

  /**
   * Creates a mapping for a key to a set of generated style classes.
   * @param {Object} styles
   */
  renderStyles (styles) {
    const generated = {}
    for (const key of Object.keys(styles)) {
      generated[key] = this.styletron.renderStyle(styles[key])
    }
    return generated
  }

  install (Vue) {
    const components = this.components
    const renderStyle = this.styletron.renderStyle.bind(this.styletron)
    const renderStyles = this.renderStyles.bind(this)

    // Add a global mixin so that VueStyletron can be used in all components.
    Vue.mixin({
      // Make the renderStyle and renderStyles methods available in components
      // in case styles need to be generated dynamically.
      methods: { renderStyle, renderStyles },
      // Add the generated styles to the component's data, generating them if
      // they're not found in the components map.
      data () {
        const data = {}
        if (this.$options.styles) {
          if (!components[this.$options.name]) {
            components[this.$options.name] = renderStyles(this.$options.styles)
          }
          data.styles = components[this.$options.name]
        }
        return data
      }
    })
  }

  /**
   * Renders all styles in a given component and saves them in the components
   * map so that they can be injected into the component's data when the
   * component is initialized.
   */
  renderComponentStyles ({ name, styles, components }) {
    if (styles) {
      if (name) {
        this.components[name] = this.renderStyles(styles)
      } else {
        const warning = `renderStyles not called for component with no name:`
        console.warn(warning, arguments[0])
      }
    }
    if (components) {
      Object.values(components).forEach(c => this.renderComponentStyles(c))
    }
  }
}
