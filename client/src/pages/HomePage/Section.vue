<template>
<v-layout row pa-4 class="section">
  <v-flex xs12 md6>
    <h1 v-html="section.title"></h1>
    <br />
    <p
      v-for="(value, index) in section.paragraphs"
      :key="index"
      v-html="value"></p>
      <v-flex pa-3>
        <h2 v-if="section.pitch" v-html="section.pitch.title"></h2>
        <div id="pitch">
          <p v-html="section.pitch.description"></p>
        </div>
      </v-flex>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
h1 {
  /* font-weight: 500; */
  font-family: Oswald;
  font-size: 1.5em !important;
  line-height: 1;
}
h2:before {
  color: #41c3de;
  content: "▶";
  margin-right: 10px;
}
h2 {
  font-family: Oswald;
  font-size: 1.25em !important;
}
#pitch p {
  margin-left: 24px;
  font-style: italic;
}
.section:nth-child(even) {
  flex-direction: row-reverse;
  background-color: #333;
}
</style>
