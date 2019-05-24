<template>
<v-list>
  <div class="padded" v-for="flux in $store.state.fluxStream.loaded" :key="flux.id" @click="click(flux.id)">
    <v-layout row py-3>
      <v-flex xs8 sm9 class="shorten-text">
        <strong>{{ flux.line }} -> {{ flux.direction }}</strong>
      </v-flex>

      <v-flex xs2 class="text-xs-right">
        {{ flux.related.length + 1 }}
        <v-icon>star</v-icon>
      </v-flex>

      <v-flex xs2 sm1 class="text-xs-right">
        4 min
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
