# vue-styletron
> Use the [Styletron](https://github.com/rtsao/styletron) CSS-in-JS library with
> [Vue.js](https://github.com/vuejs/vue)

[![npm page][npm-image]][npm-url]
[![appjumpstart chat][gitter-image]][gitter-url]

## About

This is a **super** small amount of code to make
[Styletron](https://github.com/rtsao/styletron) easier to use within
[Vue.js](https://github.com/vuejs/vue) components.

## Installation

```
npm install @appjumpstart/vue-styletron --save
```

## Usage



```js
const { Client } = require('@appjumpstart/vue-styletron')

Vue.use(Client())
```

```js
const { Server } = require('@appjumpstart/vue-styletron')

// Pass any Styletron options into the Server function, e.g.:
Vue.use(Server({
  hydrate: document.getElementsByClassName('_styletron_hydrate_') // Default
}))
```


```vue
<template>
  <div :class="hello">
    Hello!
  </div>
</template>

<script>
export default {
  data: () => ({
    styles: {
      hello: { fontSize: '48px', color: 'red' }
    }
  })
}
</script>
```

Output:

```html

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
[gitter-image]: https://img.shields.io/gitter/room/appjumpstart/appjumpstart.svg
[gitter-url]: https://gitter.im/appjumpstart
