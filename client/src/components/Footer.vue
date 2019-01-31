<template>
<v-footer>
  <v-layout justify-center row wrap>
    <span>
      &copy; {{ copyrightYear }} &mdash;
      <strong>{{ copyrightOwner }}</strong>
    </span>
  </v-layout>
</v-footer>
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
