<template>
<div>
  <mdi-bus-icon :class="vSize" v-if="vId===1" />
  <mdi-train-icon :class="vSize" v-else-if="vId===2" />
  <mdi-subway-icon :class="vSize" v-else-if="vId===4" />
  <mdi-tram-icon :class="vSize" v-else-if="vId===8" />
  <mdi-gondola-icon :class="vSize" v-else-if="vId===16" />
  <mdi-ferry-icon :class="vSize" v-else-if="vId===32" />
  <mdi-airplane-icon :class="vSize" v-else-if="vId===64" />
  <mdi-rocket-icon :class="vSize" v-else-if="vId===128" />
  <i :class="vSize" class="fas fa-question" v-else></i>
</div>
</template>

<script>
import 'mdi-vue/BusIcon'
import 'mdi-vue/TrainIcon'
import 'mdi-vue/SubwayIcon'
import 'mdi-vue/TramIcon'
import 'mdi-vue/GondolaIcon'
import 'mdi-vue/FerryIcon'
import 'mdi-vue/AirplaneIcon'
import 'mdi-vue/RocketIcon'

export default {
  props: {
    id: Number,
    size: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      vMap: Object.assign(this.$t('vehicle')),
      vId: this.id,
      vSize: `size${this.size}`,
      vSizes: [ 1, 2, 3 ]
    }
  },
  watch: {
    size: function (val) {
      this.vSize = `size${this.size}`
    }
  }
}
</script>

<style scoped>
.size1 {
  width: 2vh;
  height: auto
}
.size2 {
  width: 4vh;
  height: auto;
  padding-top: 8px;
}
.size3 {
  width: 8vh;
  height: auto
}
.size4 {
  width: 16vh;
  height: auto
}
</style>
