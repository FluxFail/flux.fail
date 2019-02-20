<template>
<v-container>
  <v-layout row align-content-center align-content-space-between>
    <trip-list />
  </v-layout>
</v-container>
</template>

<script>
import TripList from '../components/TripList.vue'

export default {
  components: {
    TripList
  }
}
</script>

<style scoped>
</style>
