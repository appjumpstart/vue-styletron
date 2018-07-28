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
      if (pages[url]) {
        return pages[url]
      }
      pages[url] = flatstr(html.replace(tag, styletron.getStylesheetsHtml()))
      return pages[url]
    }
    return flatstr(html.replace(tag, styletron.getStylesheetsHtml()))
  }
}
