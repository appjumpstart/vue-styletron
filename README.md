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
const { Server } = require('styletron-engine-atomic')
const VueStyletron = require('@appjumpstart/vue-styletron')

// Create Styletron Server and VueStyletron instances.
const styletron = new Server()
const vueStyletron = new VueStyletron({ styletron })

// Use VueStyletron as a Vue plugin.
Vue.use(vueStyletron)

// Once the application logic has determined the component to be rendered (by
// VueRouter navigation or otherwise), render the component's styles.
vueStyletron.renderStyles(MatchedComponent)

// After component styles have been rendered, generate the <style> HTML so that
// it can be added to the page before sent to the client.
const styles = styletron.getStylesheetsHtml()
```

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

## Server Side Rendering (SSR)

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

[npm-image]: https://badge.fury.io/js/@appjumpstart/vue-styletron.svg
[npm-url]: https://npmjs.org/package/@appjumpstart/vue-styletron
[spectrum-image]: https://withspectrum.github.io/badge/badge.svg
[spectrum-url]: https://spectrum.chat/appjumpstart/general
