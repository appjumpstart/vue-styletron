import Styletron from 'styletron'
import { injectStyle } from 'styletron-utils'

const styletron = new Styletron()

export default theme => {
  return {
    install: Vue => {
      Vue.directive('style', (el, { value }) => {
        const style = typeof value === 'function' ? value(theme) : value
        el.className += ` ${injectStyle(styletron, style)}`
      })
    }
  }
}
