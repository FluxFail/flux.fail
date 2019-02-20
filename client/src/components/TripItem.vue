<template>
<v-layout row wrap fill-height align-space-between class="trip-item">

  <v-flex xs3 sm2>
    <center>
      <vehicle-icon :id="vehicle" />
    </center>
  </v-flex>
  <v-flex xs9 sm10>
    <v-layout row>
      <v-flex xs12>
        <div class="trip-item-label">
          {{ line }}
          &rightarrow;
          {{ direction }}
        </div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6>
        <div class="trip-item-label" :class="{ offtime: this.departureDelayedBy, ontime: !this.departureDelayedBy }">
          {{ displayDeparture }}
        </div>
      </v-flex>
      <v-flex xs6 class="text-xs-right" :class="{ offtime: this.arrivalDelayedBy, ontime: !this.arrivalDelayedBy }">
        <div class="trip-item-label">
          {{ displayArrival }}
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</v-layout>
</template>

<script>
import VehicleIcon from './VehicleIcon.vue'

export default {
  components: {
    VehicleIcon
  },
  props: {
    id: String,
    user: String,
    vehicle: Number,
    line: String,
    direction: String,
    fromCountry: {
      type: String,
      validator: [
        (v) => { return v.length === 2 }
      ]
    },
    fromCity: String,
    from: String,
    toCountry: {
      type: String,
      validator: [
        (v) => { return v.length === 2 }
      ]
    },
    toCity: String,
    to: String,
    cancelled: {
      type: Boolean,
      default: false
    },
    scheduledDeparture: Date,
    scheduledArrival: Date,
    departureDelayedBy: Number,
    arrivalDelayedBy: Number,
    ackCount: Number
  },
  data () {
    return {}
  },
  computed: {
    displayDeparture: function () {
      if (this.cancelled) {
        return '- cancelled -'
      } else {
        if (this.departureDelayedBy) {
          return `Ab: ${this.departureDelayedBy} min`
        } else {
          return '- on time -'
        }
      }
    },
    displayArrival: function () {
      if (this.cancelled) {
        return ''
      } else {
        if (this.arrivalDelayedBy) {
          return `An: ${this.arrivalDelayedBy} min`
        } else {
          return '- on time -'
        }
      }
    }
  }
}
</script>

<style>
.border {
  border: 1px solid white;
}
.ontime {
  color: lightgreen;
}
.offtime {
  color: yellow;
}
.trip-item {
  padding-top: 4px;
  padding-right: 8px;
  border-bottom: 1px solid;
}
.trip-item-label {
  font-size: .8em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.trip-item-arrow {
  font-size: 1.5em;
  padding-top: 8px;
}

@media only screen and (min-width: 600px) {
  .trip-item-label {
    font-size: 1em;
  }
}

@media only screen and (min-width: 1024px) {
  /* .trip-item-label {
  } */
}
.v-btn, .v-btn--block {
  margin: 0px !important;
}
</style>
