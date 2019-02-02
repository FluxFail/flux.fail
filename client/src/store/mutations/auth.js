import Vue from 'vue'
import { FLUXFAIL_TOKEN } from '../../constants/auth'
const jwTokenName = 'fluxfail_token'
const jwt = require('jsonwebtoken')

const defaultUser = {
  token: '',
  user: ''
}

export default {
  authLogin (state, authToken) {
    Vue.http.headers.common['Authorization'] = `Bearer ${authToken}`
    localStorage.setItem(FLUXFAIL_TOKEN, authToken)
    const decoded = jwt.decode(authToken)
    state.user = {
      ...defaultUser,
      token: authToken,
      user: decoded.user
    }
  },

  authLogout (state) {
    localStorage.removeItem(jwTokenName)
    state.user = {
      ...defaultUser
    }
  }
}
