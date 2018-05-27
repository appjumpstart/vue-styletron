import { Client } from 'styletron-engine-atomic'

export default function VueStyletronClient (options) {
  const client = new Client(options)
  return {
    install (Vue, options) {
      // Add a global mixin.
      Vue.mixin({
        methods: {
          // Make the renderStyle method available in components in case styles
          // need to be generated dynamically.
          renderStyle (style) {
            return client.renderStyle(style)
          }
        },
        created () {
          // If a 'styles' data object exists and hasn't been rendered, replace
          // it's contents with the rendered styles so that they can be used in
          // the component.
          if (this.$data.styles && !this.$data.stylesAreRendered) {
            for (const s of Object.keys(this.$data.styles)) {
              this.$data.styles[s] = this.renderStyle(this.$data.styles[s])
            }
            this.$data.stylesAreRendered = true
          }
        }
      })
    }
  }
}

