<template>
<div>
  <v-footer>
    <v-layout justify-center row wrap>
      <span>
        Made with ❤ in Berlin
        |
        &copy; {{ copyrightYear }} &mdash;
        <strong>{{ copyrightOwner }}</strong>
      </span>
    </v-layout>
  </v-footer>
</div>
</template>

<script>
export default {
  props: {
    copyrightOwner: {
      type: String,
      required: true
    },
    copyrightYear: {
      type: Number,
      required: true
    }
  }
}
</script>
