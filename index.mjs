import { Client } from 'styletron-engine-atomic/dist/index.es'

export default {
  install (Vue, options = {}) {
    // Create a mapping from a component to it's generated styles.
    const stylesMap = {}

    // Use a Styletron instance passed through plugin options or default to a
    // new instance of Stlyetron Client.
    const styletron = options.styletron || new Client(options)

    // Create a function that creates a mapping from a key to a set of generated
    // style classes.
    const reducer = styles => (acc, key) => (
      Object.assign({}, acc, { [key]: styletron.renderStyle(styles[key]) })
    )
    const renderStyles = s => Object.keys(s).reduce(reducer(s), {})

    // Expose a renderStyles method that can be used to render styles for a
    // component.
    this.renderStyles = c => stylesMap[c.name] = renderStyles(c.styles)

    // Add a global mixin so that VueStyletron can be used in all components.
    Vue.mixin({
      // Make the renderStyle and renderStyles methods available in components
      // in case styles need to be generated dynamically.
      methods: { renderStyle: s => styletron.renderStyle(s), renderStyles },
      // Add the generated styles to the component's data, generating them if
      // they're not found in stylesMap.
      data () {
        const data = {}
        if (this.$options.styles) {
          if (!stylesMap[this.$options.name]) {
            stylesMap[this.$options.name] = renderStyles(this.$options.styles)
          }
          data.styles = stylesMap[this.$options.name]
        }
        return data
      }
    })
  }
}
