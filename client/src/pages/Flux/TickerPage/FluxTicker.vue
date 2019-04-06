<template>
<v-list two-line>
  <div class="padded" v-for="flux in $store.state.fluxStream.loaded" :key="flux.id" @click="click(flux.id)">
    <v-layout row>
      <v-flex xs3 sm2 md1>
        <v-layout column>
          <v-flex>
            {{ ppDate(flux.scheduledDeparture) || '-' }}
          </v-flex>
          <v-flex>
            {{ ppDate(flux.scheduledArrival) || '-' }}
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs2 sm1 md1>
        <v-layout column>
          <v-flex>
            {{ flux.relatedFlux.departureDelayedBy || '-' }}
          </v-flex>
          <v-flex>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs7 sm9 md10 class="shorten-text">
        <strong>
          {{ flux.line }} {{ flux.direction }}
        </strong>
      </v-flex>

      <v-flex hidden-xs-only>
        <vehicle-icon :id="flux.vehicle"></vehicle-icon>
      </v-flex>
    </v-layout>
  <v-divider></v-divider>
  </div>
</v-list>
</template>

<script>
import VehicleIcon from '@/components/ui/VehicleIcon.vue'
const moment = require('moment')

export default {
  components: {
    VehicleIcon
  },
  methods: {
    click: function (key) {
      console.log(`Clicked: ${key}`)
    },
    formattedDelay: function (flux) {
      return null
    },
    ppDate: function (d) {
      if (d) {
        return moment(d).format('HH:mm')
      } else {
        return ''
      }
    }
  },
  created: function () {
    this.$store.dispatch('fluxListAll')
  }
}
</script>

<style scoped>
.padded {
  padding-left: 8px;
  padding-right: 8px;
}
.shorten-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.shorten-text:hover {
  overflow: visible;
}
</style>
