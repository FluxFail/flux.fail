<template>
<v-layout wrap row pa-4 class="section">
  <v-flex xs12 md5 pa-3>
    <v-layout row wrap fill-height align-center>
      <v-flex>
        <center>
          <object
            :data="require('@/assets/shield-01.svg')"
            type="image/svg+xml"
            class="logo"
          ></object>
        </center>
      </v-flex>
    </v-layout>
  </v-flex>

  <v-flex xs12 md7 pa-3>
    <h1 v-html="title"></h1>
    <br />
    <p
      v-for="(value, index) in paragraphs"
      :key="index"
      v-html="value">
    </p>
    <v-flex pa-3>
      <h2 v-html="pitchTitle"></h2>
      <div id="pitch">
        <p v-html="pitchDescription"></p>
      </div>
    </v-flex>
  </v-flex>

</v-layout>
</template>

<script>
export default {
  props: {
    paragraphs: {
      type: Array,
      required: true
    },
    pitchDescription: String,
    pitchTitle: String,
    title: String
  }
}
</script>
