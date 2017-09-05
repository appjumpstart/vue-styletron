import Styletron from 'styletron'
import { injectStyle } from 'styletron-utils'

const styletron = new Styletron()

export default config => {
  return {
    install (Vue) {
      Vue.$style = Vue.prototype.$style = config
      Vue.directive('style', (el, { value }) => {
        const style = typeof value === 'function' ? value(Vue.$style) : value
        el.className += ` ${injectStyle(styletron, style)}`
      })
    }
  }
}
