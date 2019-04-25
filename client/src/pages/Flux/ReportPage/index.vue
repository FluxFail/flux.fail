<template>
<v-container>
  <v-layout wrap justify-space-around>
    <v-flex xs12 sm10 lg8 xl6>
      <v-toolbar>
        {{ $t('fluxPage.report.title') }}
        <v-spacer></v-spacer>
        <v-btn icon @click="resetCurrentFluxForm">
          <v-icon>cancel</v-icon>
        </v-btn>
      </v-toolbar>
      <v-stepper v-model="$store.state.fluxReportForm.windowStep">
        <v-stepper-header>
          <v-stepper-step :complete="$store.state.fluxReportForm.windowStep > 1" step="1">{{ $t('fluxPage.report.step.where') }}</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="$store.state.fluxReportForm.windowStep > 2" step="2">{{ $t('fluxPage.report.step.line') }}</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="$store.state.fluxReportForm.windowStep > 3" step="3">{{ $t('fluxPage.report.step.when') }}</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="$store.state.fluxReportForm.windowStep > 4" step="4">{{ $t('fluxPage.report.step.details') }}</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <step1></step1>
          </v-stepper-content>
          <v-stepper-content step="2">
            <step2></step2>
          </v-stepper-content>
          <v-stepper-content step="3">
            <step3></step3>
          </v-stepper-content>
          <v-stepper-content step="4">
            <step4></step4>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'
import Step4 from './Step4.vue'
import 'mdi-vue/CheckIcon'

export default {
  components: {
    Step1,
    Step2,
    Step3,
    Step4
  },
  data () {
    return {}
  },
  methods: {
    resetCurrentFluxForm () {
      this.$store.commit('fluxReportFormReset')
      this.$router.push({ name: 'HomePage' })
    }
  }
}
</script>
