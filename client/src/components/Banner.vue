<template>
<div id="ComponentBanner">
  <v-layout class="hidden-sm-and-down" align-center column justify-center wrap>
    <h3>Wir tracken Versp&auml;tungen. Nicht dich.</h3>
    <h3>Open Data. Open Source.</h3>
  </v-layout>
  <v-layout class="hidden-md-and-up" align-center column justify-center wrap>
    <h4>Wir tracken</h4>
    <h4>Versp&auml;tungen.</h4>
    <h4>Nicht dich.</h4>
    &mdash;
    <h4>Open Data.</h4>
    <h4>Open Source.</h4>
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
  font-size: 1.5em;
  line-height: 1;
  font-weight: 320;
  text-transform: uppercase;
}
h4 {
  font-size: 1.5em;
  line-height: 1;
  font-weight: 320;
  text-transform: uppercase;
}
</style>
