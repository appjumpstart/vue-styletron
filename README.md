# vue-styletron
> Use the [Styletron](https://github.com/rtsao/styletron) CSS-in-JS library with
> [Vue.js](https://github.com/vuejs/vue)

[![npm page][npm-image]][npm-url]
[![Join the community on Spectrum][spectrum-image]][spectrum-url]

## About

This is a **super** small amount of code to make
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
Vue.use(VueStyletron)
```

**Server (optional, for SSR):**

```js
const { Server } = require('styletron-engine-atomic')
const VueStyletron = require('@appjumpstart/vue-styletron')

// Create a Styletron Server instance.
const styletron = new Server()

// Use VueStyletron as a Vue plugin and tell it to use the Styletron Server
// instance created above.
Vue.use(VueStyletron, { styletron })

// ...

// After components have been created, generate the <style> HTML so that you
// can add it to the page before is sent to the client.
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
  data: () => ({
    styles: {
      hello: { fontSize: '48px', textAlign: 'center' }
    }
  })
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
