<template>
<div id="ComponentBanner">
  <v-layout class="hidden-xs-only" align-center column justify-space-around wrap>
    <v-flex xs6>
      <center>
        <h3 v-html="$t('homePage.claim.long')"></h3>
      </center>
    </v-flex>
  </v-layout>
  <v-layout class="hidden-sm-and-up" align-center column justify-space-around wrap>
    <center>
      <h4 v-html="$t('homePage.claim.short')"></h4>
    </center>
  </v-layout>
</div>
</template>

<script>
export default {
}
</script>

<style scoped>
#ComponentBanner {
  padding-top: 42px;
  padding-bottom: 42px;
  color: #fff;
}
h3 {
  font-family: Oswald;
  font-size: 1.5em;
  line-height: 1;
  font-weight: 320;
  text-transform: uppercase;
  letter-spacing: 2px;
}
h4 {
  font-family: Oswald;
  font-size: 1.2em;
  line-height: 1;
  font-weight: 320;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>
