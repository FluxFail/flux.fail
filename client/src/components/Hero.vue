<template>
<div id="ComponentHero">
  <v-parallax
    dark
    :height="400"
    :src="require('../assets/trainstation_dark_small.jpg')"
  >
    <v-layout
      align-center
      column
      justify-center
    >
      <div>
        <center>
          <v-img class="hidden-xs-only logo large" :src="require('../assets/brand_logo.png')">
          </v-img>
          <v-img class="hidden-sm-and-up logo small" :src="require('../assets/logo.png')">
          </v-img>
          <h4 class="subheading hidden-xs-only">worauf wartest du</h4>
          <h4 class="subheading hidden-sm-and-up">worauf<br />wartest<br />du</h4>
        </center>
      </div>
    </v-layout>
  </v-parallax>
</div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
h1 {
  color: #5ccbf0;
  font-size: 8em;
}
h4 {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 2em !important;
  line-height: 1;
}
.small {
  width: 75%;
}
.logo {
  margin: 16px;
}
</style>
