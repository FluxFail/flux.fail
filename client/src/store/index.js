import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import { createFlashStore } from 'vuex-flash'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createFlashStore()
  ],
  state: {
    user: {},
    trips: {
      loading: false,
      loaded: [],
      current: null
    }
  },
  actions,
  mutations
})
