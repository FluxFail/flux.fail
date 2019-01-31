// Helpers
// import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'babel-polyfill'

import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'

import App from './App'
import { i18n } from './plugins/i18n'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Color Theme
Vue.prototype.$vuetify.theme = {
  primary: '#4dd7fa',
  secondary: '#b0bec5',
  accent: '#8c9eff',
  error: '#ff00ff'
}

Vue.use(Vuetify, {
  options: {
    cspNonce: process.env.CSP_NONCE || 'vau2aegh0yi9aYie',
    minifyTheme: function (css) {
      return process.env.NODE_ENV === 'production'
        ? css.replace(/[\s|\r\n|\r|\n]/g, '')
        : css
    }
  },
  iconfont: 'fa' // 'md' || 'mdi' || 'fa' || 'fa4'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
