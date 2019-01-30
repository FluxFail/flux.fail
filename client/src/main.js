// Helpers
import colors from 'vuetify/es5/util/colors'
import './assets/stylus/main.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import App from './App'
import router from './router'
import 'babel-polyfill'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  options: {
    cspNonce: 'vau2aegh0yi9aYie',
    minifyTheme: function (css) {
      return process.env.NODE_ENV === 'production'
        ? css.replace(/[\s|\r\n|\r|\n]/g, '')
        : css
    }
  },
  iconfont: 'fa', // 'md' || 'mdi' || 'fa' || 'fa4'
  theme: {
    // primary: colors.red.darken1, // #E53935
    // secondary: colors.red.lighten4, // #FFCDD2
    // accent: colors.indigo.base // #3F51B5
    primary: '#4dd7fa',
    secondary: colors.orange,
    accent: colors.yellow
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
