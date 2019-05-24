<template>
<div>
  <v-layout wrap justify-space-around>
    <v-flex xs12>
      <v-switch
        v-model="cancelled"
        :label="$t('fluxPage.report.form.label.cancelled')"
        color="error"
        >Cancelled</v-switch>
    </v-flex>
  </v-layout>

  <v-layout wrap justify-space-around :d-none="cancelled">
    <v-flex xs12 md6 pa-2>
      <DatetimePicker
        :title="$t('fluxPage.report.form.label.actuallyAt')"
        @datetimeSelected="actuallyAt = $event"
      ></DatetimePicker>
    </v-flex>
  </v-layout>

  <v-card class="mb-5"></v-card>
  <v-layout>
    <v-flex class="text-xs-right">
      <v-btn flat @click="goPrevFluxReportFormPage">{{ $t('generic.form.btn.back') }}</v-btn>
      <v-btn @click="goNextFluxReportFormPage" :disabled="!isValid" color="primary">{{ $t('fluxPage.report.form.submitNew') }}</v-btn>
    </v-flex>
  </v-layout>

</div>
</template>

<script>
import DatetimePicker from '@/components/ui/DatetimePicker.vue'

export default {
  components: {
    DatetimePicker
  },

  data () {
    return {
      actuallyAt: null,
      cancelled: false
    }
  },

  computed: {
    fields: function () {
      return {
        actuallyAt: this.actuallyAt && !this.cancelled ? this.actuallyAt.startOf('minute').toDate() : '',
        cancelled: this.cancelled
      }
    },
    isValid: function () {
      if (this.cancelled || this.actuallyAt) {
        return true
      }
      return false
    }
  },

  methods: {
    goPrevFluxReportFormPage: function () {
      this.$store.commit('fluxReportFormStepBack')
    },
    goNextFluxReportFormPage: function () {
      this.$store.commit('fluxReportFormUpdateFields', this.fields)
      this.$store.dispatch('fluxPostReport')
    }
  }
}
</script>
