import Vue from 'vue'

import { Client } from '../src'
import App from './App'

// TODO:
Vue.use(Client())

// Create and mount the application.
const app = new Vue({ render: h => h(App) })
app.$mount('#app')
