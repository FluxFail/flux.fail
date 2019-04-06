import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loading: false,
      token: '',
      id: '',
      username: '',
      country: '',
      city: ''
    },
    fluxStream: {
      loading: false,
      loaded: []
    },
    fluxReportForm: {
      loading: false,
      fields: {
        country: '',
        city: '',
        location: '',
        line: '',
        direction: '',
        vehicle: 0,
        scheduledArrival: '',
        scheduledDeparture: '',
        cancelled: false,
        arrivedAt: '',
        departedAt: '',
        comment: ''
      }
    }
  },
  actions,
  mutations
})
