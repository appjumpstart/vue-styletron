# vue-styletron
> Use the [Styletron](https://github.com/rtsao/styletron) CSS-in-JS library with
> [Vue.js](https://github.com/vuejs/vue)

[![npm page][npm-image]][npm-url]
[![Join the community on Spectrum][spectrum-image]][spectrum-url]

## About

This is a very small amount of code to make
[Styletron](https://github.com/rtsao/styletron) easier to use within
[Vue.js](https://github.com/vuejs/vue) components.

## Installation

```
npm install @appjumpstart/vue-styletron --save
```

## Usage

**Client:**

```js
import VueStyletron from '@appjumpstart/vue-styletron'

// Use VueStyletron as a Vue plugin.
Vue.use(new VueStyletron())
```

**Server (optional, for SSR):**

```js
const VueStyletron = require('@appjumpstart/vue-styletron/server')

// Create the VueStyletron instance.
const vueStyletron = new VueStyletron()

// Use VueStyletron as a Vue plugin.
Vue.use(vueStyletron)

// Use a Vue.js renderer to render your Vue.js app to a HTML string.
// https://ssr.vuejs.org/guide/bundle-renderer.html
let html = renderer.renderToString(context)

// Insert the stylesheet that Styletron generated when the app was rendered.
html = vueStyletron.insertStyles(html)

// This is just an example of sending an HTML response with Express.
res.type('text/html').send(html)
```

**NOTE:** You'll also need to insert a tag into your HTML template which
defaults to `{styles}` but can be configured as the 3rd parameter to
insertStyles.

**Component:**

```vue
<template>
  <div :class="`${styles.hello} mr-5`">
    Hello!
  </div>
</template>

<script>
export default {
  styles: { hello: { fontSize: '48px', textAlign: 'center' } }
}
</script>
```

**Output:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Test Template</title>
    <style class="_styletron_hydrate_">.ae{font-size:48px}.af{text-align:center}</style>
  </head>
  <body>
    <div data-server-rendered="true" class="ae af mr-5">
      Hello!
    </div>
  </body>
</html>
```

## Server-Side Rendering (SSR)

**Note:** If you are using
[webpack-node-externals](https://github.com/liady/webpack-node-externals) in the
Webpack config make sure to add `'@appjumpstart/vue-styletron'` to the
whitelist.

&nbsp;

<a href="https://github.com/appjumpstart">
  <img
    alt="AppJumpstart"
    src="https://appjumpstart.nyc3.digitaloceanspaces.com/assets/appjumpstart-transparent.png"
    height="50">
</a>

[npm-image]: https://img.shields.io/npm/v/@appjumpstart/vue-styletron.svg
[npm-url]: https://npmjs.org/package/@appjumpstart/vue-styletron
[spectrum-image]: https://withspectrum.github.io/badge/badge.svg
[spectrum-url]: https://spectrum.chat/appjumpstart/general
