module.exports = function insertStyles (styletron, html, tag = '{styles}') {
  return html.replace(tag, styletron.getStylesheetsHtml())
}
