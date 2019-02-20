import Vue from 'vue'

const API_URL = process.env.API_URL

export default {
  listAllTrips (context) {
    context.commit('loadingTrips')
    Vue.http.get(`${API_URL}/trip`, { timeout: 2000 })
      .then(res => {
        res.json()
          .then(json => {
            context.commit('flashMessage', json)
          })
      }, err => {
        context.commit('resetTrips')
        context.commit('flashError', err)
      })
  }
}
