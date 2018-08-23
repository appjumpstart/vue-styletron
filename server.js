const { Server } = require('styletron-engine-atomic')
const flatstr = require('flatstr')

const VueStyletron = require('./')

const pages = {}

module.exports = class VueStyletronServer extends VueStyletron {
  constructor (options = {}) {
    options.styletron = options.styletron || new Server(options)
    super(Object.assign({}, options, { hydrate: false }))
  }

  insertStyles (html, url, tag = '{styles}') {
    const { styletron } = this
    if (url) {
      pages[url] = pages[url] || styletron.getStylesheetsHtml()
      return flatstr(html.replace(tag, pages[url]))
    }
    return flatstr(html.replace(tag, styletron.getStylesheetsHtml()))
  }
}
