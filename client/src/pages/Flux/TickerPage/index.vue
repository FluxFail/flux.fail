<template>
<v-container>
  <v-layout row align-content-center align-content-space-between>
    <v-flex>
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>{{ $t('fluxPage.stream.title') }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <mdi-magnify-icon />
          </v-btn>
        </v-toolbar>

        <flux-ticker></flux-ticker>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import FluxTicker from './FluxTicker.vue'
import 'mdi-vue/ChevronDownIcon'
import 'mdi-vue/MagnifyIcon'

export default {
  components: {
    FluxTicker
  }
}
</script>

<style scoped>
</style>
