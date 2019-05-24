<template>
<v-layout row wrap pa-4 class="section" justify-space-around>
  <v-flex xs12 sm5 pa-3>
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
