import Vue from 'vue'

import VueStyletron from '../'
import App from './App'

// Use VueStyletron as a Vue plugin.
Vue.use(new VueStyletron())

// Create and mount the application.
const app = new Vue({ render: h => h(App) })
app.$mount('#app')
