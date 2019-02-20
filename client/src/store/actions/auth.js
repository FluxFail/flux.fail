import { FLUXFAIL_TOKEN } from '../../constants/auth'
import Vue from 'vue'
import urlParser from 'url'
import queryString from 'querystring'

const API_URL = process.env.API_URL

export default {
  authInitialize (context) {
    const token = localStorage.getItem(FLUXFAIL_TOKEN)
    if (token) {
      context.commit('authLogin', token)
    }
    if (window.location.search && window.location.search.indexOf('?token=') !== -1) {
      const query = queryString.parse(window.location.search.slice(1))
      if (!query.token) {
        return
      }

      // Cleanup url
      if (window.history && window.history.replaceState) {
        const url = urlParser.parse(window.location.href)
        window.history.replaceState({}, 'clear', url.pathname)
      }

      // Exchange token
      Vue.http.post(`${API_URL}/login/exchange`, {
        token: query.token
      }).then((res) => {
        if (res.status !== 200) {
          context.commit('FLASH/SET_FLASH', { message: 'Welcome back!', variant: 'success' })
        }
        return res.json()
      }).then((credentials) => {
        context.commit('authLogin', credentials.token)
      })
    }
  },

  authSendLoginMail (state, email) {
    Vue.http.post(`${API_URL}/login/email`, {
      email
    }).then((res) => {
      if (res.status !== 202) {
        state.commit('FLASH/SET_FLASH', {
          message: res.json((json) => { return json.message }),
          variant: 'danger'
        })
      }
      // TODO: Handle success
    }, (res) => {
      state.commit('FLASH/SET_FLASH', {
        message: res.json((json) => { return json.message }),
        variant: 'danger'
      })
    })
  }
}
