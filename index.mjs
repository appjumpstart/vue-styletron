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
    const renderStyles = styles => {
      const generated = {}
      for (const key of Object.keys(styles)) {
        generated[key] = styletron.renderStyle(styles[key])
      }
      return generated
    }

    // Expose a renderStyles method that can be used to render the styles for a
    // component.
    this.renderStyles = component => {
      const { styles } = component.data()
      stylesMap[component.name] = renderStyles(styles)
    }

    // Add a global mixin.
    Vue.mixin({
      methods: {
        // Make the renderStyle method available in components in case styles
        // need to be generated dynamically.
        renderStyle: style => styletron.renderStyle(style)
      },
      created () {
        // If a 'styles' data object exists and hasn't been generated, replace
        // it's contents with the rendered styles so that they can be used in
        // the component.
        if (!stylesMap[this.$options.name] && this.$data.styles) {
          stylesMap[this.$options.name] = renderStyles(this.$data.styles)
        }
        this.$data.styles = stylesMap[this.$options.name]
      }
    })
  }
}
