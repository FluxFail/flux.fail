// const moment = require('moment')

const defaultTrip = {
  loading: false,
  loaded: [],
  current: null
}

const templateTrip = {
  fromCountry: '',
  fromCity: '',
  from: '',
  toCountry: '',
  toCity: '',
  to: '',
  line: '',
  vehicle: 0,
  scheduledDeparture: null,
  scheduledArrival: null,
  cancelled: false,
  departedAt: null,
  arrivedAt: null
}

export default {
  resetTrips (state) {
    state.trips = defaultTrip
  },

  loadingTrips (state) {
    state.trips.loading = true
  },

  setTrips (state, trips) {
    state.trips = {
      ...state.trips,
      loading: false,
      loaded: trips
    }
  },

  newTrip (state) {
    state.current = {
      ...templateTrip
    }
  }
}
