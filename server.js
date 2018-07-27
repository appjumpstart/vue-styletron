const { Server } = require('styletron-engine-atomic')
const flatstr = require('flatstr')

const VueStyletron = require('./')

module.exports = class VueStyletronServer extends VueStyletron {
  constructor (options = {}) {
    options.styletron = options.styletron || new Server(options)
    super(Object.assign({}, options, { hydrate: false }))
  }

  insertStyles (html, tag = '{styles}') {
    return flatstr(html.replace(tag, this.styletron.getStylesheetsHtml()))
  }
}
