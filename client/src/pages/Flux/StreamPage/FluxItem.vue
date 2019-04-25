<template>
  <v-layout row>
    <v-flex>
      
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    id: String,
    user: String,
    connection: String,
    ride: String,
    country: String,
    city: String,
    location: String,
    vehicle: Number,
    line: String,
    direction: String,
    cancelled: {
      type: Boolean,
      default: false
    },
    scheduledArrival: {
      type: String,
      default: '',
    },
    scheduledDeparture: {
      type: String,
      default: ''
    },
    arrivedAt: {
      type: String,
      default: ''
    },
    departedAt: {
      type: String,
      default: ''
    },
    comment: {
      type: String,
      default: ''
    },
    acks: Number,
    meanArrivalDelay: {
      type: Number,
      default: 0
    },
    meanDepartureDelay: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {}
  }
}
</script>

<style>

</style>
