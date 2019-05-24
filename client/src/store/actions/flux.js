import Vue from 'vue'
import router from '@/router'

const API_URL = process.env.API_URL

export default {
  fluxListAll (context) {
    context.commit('fluxLoading')
    Vue.http.get(`${API_URL}/flux/stream`)
      .then(res => {
        res.json()
          .then(json => context.commit('fluxLoaded', json))
      })
  },

  fluxPostReport (context) {
    var fluxReport = context.state.fluxReportForm.fields
    context.commit('fluxReportFormLoading')
    Object.keys(fluxReport).forEach((key) => (fluxReport[key] === '') && delete fluxReport[key])
    Vue.http.post(`${API_URL}/flux`, fluxReport)
      .then(res => {
        if (res.status !== 200) {
          console.log(res.statusText)
        }
        context.commit('fluxReportFormReset')
        router.push({ name: 'FluxStreamPage' })
      })
  }
}
