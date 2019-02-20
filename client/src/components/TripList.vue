<template>
  <v-flex xs12 sm12>
    <v-card>
      <v-toolbar dark>
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
        <v-menu bottom left>
            <v-btn
              slot="activator"
              dark
              icon
            >
              <mdi-dots-vertical-icon />
            </v-btn>

            <v-list>
              <v-list-tile @click="foo" icon>
                <mdi-alarm-plus-icon></mdi-alarm-plus-icon>&nbsp;
                <v-list-tile-title>{{ this.$t('report_new_trip') }}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="foo" icon>
                <mdi-history-icon></mdi-history-icon>&nbsp;
                <v-list-tile-title>{{ this.$t('menu_item_stream') }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        <v-toolbar-title>{{ this.$t('menu_item_stream') }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon
          :class="{ rotating: this.$store.state.trips.loading }"
          @click="syncDelays">
          <mdi-sync-icon>
        </mdi-sync-icon>
        </v-btn>
      </v-toolbar>

      <v-list>
        <trip-item
          v-for="trip in trips"
          :key="trip.id"
          :id="trip.id"
          :user="trip.user"
          :line="trip.line"
          :vehicle="trip.vehicle"
          :direction="trip.direction"
          :from="trip.from"
          :scheduledDeparture="new Date(trip.scheduledDeparture)"
          :scheduledArrival="trip.scheduledArrival"
          :cancelled="trip.cancelled"
          :departureDelayedBy="trip.tripAcks.departureDelayedBy"
          :arrivalDelayedBy="trip.tripAcks.arrivalDelayedBy"
          :ackCount="trip.tripAcks.count"
        />
      </v-list>
      <!-- <v-list subheader>
        <v-list-tile
          v-for="trip in trips"
          :key="trip.id"
          @click="foo">
          <v-list-tile-avatar>
            {{ trip.id }}
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="trip.id"></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon :color="trip.active ? 'teal' : 'grey'">chat_bubble</v-icon>
            <mdi-bus-icon />
          </v-list-tile-action>
        </v-list-tile>
      </v-list> -->
    </v-card>
  </v-flex>
</template>

<script>
import 'mdi-vue/SyncIcon'
import 'mdi-vue/AlarmPlusIcon'
import 'mdi-vue/DotsVerticalIcon'
import 'mdi-vue/HistoryIcon'
import TripItem from './TripItem.vue'

export default {
  components: {
    TripItem
  },
  data () {
    return {}
  },
  computed: {
    trips () { return this.$store.state.trips.loaded }
  },
  methods: {
    foo () {
      console.log('CLICKED!')
    },
    syncDelays () {
      this.$store.dispatch('listAllTrips')
    }
  },
  created: function () {
    this.$store.dispatch('listAllTrips')
  }
}
</script>

<style scoped>
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(-360deg);
    -moz-transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}
</style>
