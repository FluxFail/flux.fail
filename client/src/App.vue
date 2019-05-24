<template>
<v-app id="inspire" dark>
  <NavBar></NavBar>
  <v-content>
    <router-view></router-view>
  </v-content>
  <Footer :copyrightYear="2018" copyrightOwner="flux.fail" />
</v-app>
</template>

<script>
import NavBar from '@/components/ui/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  components: {
    Footer,
    NavBar
  },
  data () {
    return {}
  },
  created: function () {
    this.$store.dispatch('authInitialize')
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
}
html {
  font-family: 'Roboto' 16px, sans-serif;
  color: #212121;
}

.theme--dark {
  color: #5ccbf0 !important;
}
.mdi-icon {
  fill: #5ccbf0 !important;
}
</style>
