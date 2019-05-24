<template>
<v-container>
  <v-layout row wrap align-content-center justify-space-around>
    <v-flex xl8>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>{{ $t('fluxPage.stream.title') }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <mdi-magnify-icon />
          </v-btn>
        </v-toolbar>

        <flux-stream></flux-stream>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import FluxStream from './FluxStream.vue'
import 'mdi-vue/ChevronDownIcon'
import 'mdi-vue/MagnifyIcon'

export default {
  components: {
    FluxStream
  }
}
</script>

<style scoped>
</style>
