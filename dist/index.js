'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _styletron = require('styletron')

var _styletron2 = _interopRequireDefault(_styletron)

var _styletronUtils = require('styletron-utils')

function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const styletron = new _styletron2.default()

exports.default = config => {
  return {
    install (Vue) {
      Vue.$style = Vue.prototype.$style = config
      Vue.directive('style', (el, { value }) => {
        const style = typeof value === 'function' ? value(Vue.$style) : value
        const classes = ` ${(0, _styletronUtils.injectStyle)(styletron, style)}`
        if (el instanceof SVGElement) {
          el.setAttribute('class', el.getAttribute('class') + classes)
        } else {
          el.className += classes
        }
      })
    }
  }
}
