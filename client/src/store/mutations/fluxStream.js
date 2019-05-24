export default {
  fluxStreamReset (state) {
    state.fluxStream = {
      loading: false,
      loaded: []
    }
  },

  fluxLoading (state) {
    state.fluxStream.loading = true
  },

  fluxLoaded (state, flux) {
    state.fluxStream.loaded = flux
  }
}
