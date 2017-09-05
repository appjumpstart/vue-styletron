import Styletron from 'styletron'
import { injectStyle } from 'styletron-utils'

const styletron = new Styletron()

export default config => {
  return {
    config,
    install (Vue) {
      Vue.directive('style', (el, { value }) => {
        const style = typeof value === 'function' ? value(this.config) : value
        el.className += ` ${injectStyle(styletron, style)}`
      })
    }
  }
}
