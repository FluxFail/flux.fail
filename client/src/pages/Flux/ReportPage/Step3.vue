<template>
<div>
  <v-layout row wrap justify-space-around>
    <v-flex xs12>
      <center>
        <v-btn-toggle v-model="isArrivalDeparture" multiple>
          <v-btn>
            {{ $t('fluxPage.report.form.label.arrival') }}
          </v-btn>
          <v-btn>
            {{ $t('fluxPage.report.form.label.departure') }}
          </v-btn>
        </v-btn-toggle>
      </center>
    </v-flex>
    <v-flex xs12 py-3>
      <center>
        <span v-if="isArrivalDeparture.includes(0) && isArrivalDeparture.includes(1)">
          {{ $t('fluxPage.report.form.label.arrival') }}
          &amp;
          {{ $t('fluxPage.report.form.label.departure') }}
        </span>
        <span v-else-if="isArrivalDeparture.includes(0)">
          {{ $t('fluxPage.report.form.label.arrival') }}
        </span>
        <span v-else-if="isArrivalDeparture.includes(1)">
          {{ $t('fluxPage.report.form.label.departure') }}
        </span>
        <span v-else>
          {{ $t('generic.missingValue') }}
        </span>
      </center>
    </v-flex>
  </v-layout>

  <v-layout wrap justify-space-around>
    <v-flex xs12 md6 pa-2>
      <DatetimePicker
        :title="$t('fluxPage.report.form.label.scheduledAt')"
        @datetimeSelected="scheduledAt = $event"
      ></DatetimePicker>
    </v-flex>
  </v-layout>

  <v-card class="mb-5"></v-card>
  <v-layout>
    <v-flex class="text-xs-right">
      <v-btn flat @click="goPrevFluxReportFormPage">{{ $t('generic.form.btn.back') }}</v-btn>
      <v-btn @click="goNextFluxReportFormPage" :disabled="!isValid">{{ $t('generic.form.btn.next') }}</v-btn>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import DatetimePicker from '@/components/ui/DatetimePicker.vue'
const moment = require('moment')

export default {
  components: {
    DatetimePicker
  },

  data () {
    return {
      scheduledAt: this.$store.state.fluxReportForm.fields.scheduledAt,
      isArrivalDeparture: [ 1 ]
    }
  },

  computed: {
    fields: function () {
      return {
        scheduledAt: this.scheduledAt ? moment(this.scheduledAt).startOf('minute').toDate() : '',
        arrival: this.isArrivalDeparture.includes(0),
        departure: this.isArrivalDeparture.includes(1)
      }
    },
    isValid: function () {
      if (this.scheduledAt && this.isArrivalDeparture.length > 0) {
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
      this.$store.commit('fluxReportFormStepForward')
    }
  }
}
</script>
