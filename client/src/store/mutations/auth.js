import Vue from 'vue'
import { FLUXFAIL_TOKEN } from '../../constants/auth'
const jwt = require('jsonwebtoken')

export default {
  authLogout (state) {
    Vue.http.headers.common['Authorization'] = ''
    localStorage.removeItem(FLUXFAIL_TOKEN)
    state.user = {
      loading: false,
      token: '',
      id: '',
      username: '',
      country: '',
      city: ''
    }
  },

  authLogin (state, authToken) {
    Vue.http.headers.common['Authorization'] = `Bearer ${authToken}`
    localStorage.setItem(FLUXFAIL_TOKEN, authToken)
    const decoded = jwt.decode(authToken)
    state.user.loading = false
    state.user.token = authToken
    state.user.id = decoded.user
  }
}
