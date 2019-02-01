<template>
  <v-layout column fill-height >
    <Hero />
    <Banner />
    <div class="spacer section">
      <v-container>
        Lorem ipsum...
      </v-container>
    </div>
  </v-layout>
</template>

<script>
import Hero from '../components/Hero.vue'
import Banner from '../components/Banner.vue'

export default {
  components: {
    Hero,
    Banner
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.section {
  background-color: #444;
  color: #5ccbf0;
}
</style>
