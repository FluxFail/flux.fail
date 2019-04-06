<template>
<v-layout>
  <v-flex>
    <v-expansion-panel expand>
      <v-expansion-panel-content>
        <div slot="header">{{ $t('pageAboutName') }}</div>
        <about-card />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header">{{ $t('dataPrivacyStatement') }}</div>
        <data-protection-policy />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
</v-layout>
</template>

<script>
import AboutCard from './AboutCard.vue'
import DataProtectionPolicy from './DataProtectionPolicy.vue'

export default {
  components: {
    AboutCard,
    DataProtectionPolicy
  },
  data () {
    return {}
  }
}
</script>

<style>

</style>
