export default {
  fluxReportFormReset (state) {
    state.fluxReportForm = {
      loading: false,
      windowStep: 1,
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

  fluxReportFormLoading (state) {
    state.fluxReportForm.loading = true
  },

  fluxReportFormLoaded (state) {
    state.fluxReportForm.loading = false
  },

  fluxReportFormStepBack (state) {
    state.fluxReportForm.windowStep--
  },

  fluxReportFormStepForward (state) {
    state.fluxReportForm.windowStep++
  },

  fluxReportFormUpdateFields (state, fields) {
    state.fluxReportForm.fields = Object.assign(state.fluxReportForm.fields, fields)
  }
}
