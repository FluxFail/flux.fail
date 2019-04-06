<template>
<div>
  <v-layout wrap justify-space-around>
    <v-flex xs12 md6 pa-2>
      <v-card>
        <v-toolbar>
          {{ $t('fluxPage.report.form.label.scheduled.arrival') }}
        </v-toolbar>

        <v-card-text v-if="scheduledArrival">
          <center>
            {{ scheduledArrivalFormatted }}
          </center>
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-if="!scheduledArrival"
            @click="setScheduledArrival(new Date())"
            block
          >{{ $t('generic.form.btn.now') }}</v-btn>

          <v-btn
            v-if="scheduledArrival"
            @click="setScheduledArrival('')"
            flat
          >
            {{ $t('generic.form.btn.reset') }}
          </v-btn>
          <v-btn
            v-if="scheduledArrival"
            @click="pickerDialog = 'arrival'"
            block
          >
            {{ $t('generic.form.btn.change') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs12 md6 pa-2>
      <v-card>
        <v-toolbar>
          {{ $t('fluxPage.report.form.label.scheduled.departure') }}
        </v-toolbar>

        <v-card-text v-if="scheduledDeparture">
          <center>
            {{ scheduledDepartureFormatted }}
          </center>
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-if="!scheduledDeparture"
            @click="setScheduledDeparture(new Date())"
            block
          >{{ $t('generic.form.btn.now') }}
          </v-btn>

          <v-btn
            v-if="scheduledDeparture"
            @click="setScheduledDeparture('')"
            flat
          >{{ $t('generic.form.btn.reset') }}
          </v-btn>
          <v-btn
            v-if="scheduledDeparture"
            @click="pickerDialog = 'departure'"
            block
          >{{ $t('generic.form.btn.change') }}

          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

  <v-card class="mb-5"></v-card>
  <v-layout>
    <v-flex class="text-xs-right">
      <v-btn flat @click="goPrevFluxReportFormPage">{{ $t('generic.form.btn.back') }}</v-btn>
      <v-btn @click="goNextFluxReportFormPage" :disabled="!isValid">{{ $t('generic.form.btn.next') }}</v-btn>
    </v-flex>
  </v-layout>

  <dateTimePickerDialog
    :visible="pickerDialog === 'arrival'"
    :defaultDate="this.$store.state.fluxReportForm.scheduledArrival"
    @datePick="setScheduledArrival($event)"
  ></dateTimePickerDialog>

  <dateTimePickerDialog
    :visible="pickerDialog === 'departure'"
    :defaultDate="this.$store.state.fluxReportForm.scheduledDeparture"
    @datePick="setScheduledDeparture($event)"
  ></dateTimePickerDialog>
</div>
</template>

<script>
import dateTimePickerDialog from '@/components/ui/dateTimePickerDialog.vue'
const moment = require('moment')

export default {
  components: {
    dateTimePickerDialog
  },
  data () {
    return {
      pickerDialog: null,
      scheduledArrival: this.$store.state.fluxReportForm.fields.scheduledArrival,
      scheduledDeparture: this.$store.state.fluxReportForm.fields.scheduledDeparture
    }
  },

  computed: {
    fields: function () {
      return {
        scheduledArrival: this.scheduledArrival ? this.scheduledArrival.startOf('minute').toDate() : '',
        scheduledDeparture: this.scheduledDeparture ? this.scheduledDeparture.startOf('minute').toDate() : ''
      }
    },
    isValid: function () {
      if (this.scheduledArrival || this.scheduledDeparture) {
        return true
      } else {
        return false
      }
    },
    scheduledArrivalFormatted: function () {
      return this.scheduledArrival ? moment(this.scheduledArrival).calendar() : ''
    },
    scheduledDepartureFormatted: function () {
      return this.scheduledDeparture ? moment(this.scheduledDeparture).calendar() : ''
    }
  },

  methods: {
    goPrevFluxReportFormPage: function () {
      this.$store.commit('fluxReportFormStepBack')
    },
    goNextFluxReportFormPage: function () {
      this.$store.commit('fluxReportFormUpdateFields', this.fields)
      this.$store.commit('fluxReportFormStepForward')
    },
    setScheduledArrival: function (at) {
      if (at) {
        this.scheduledArrival = moment(at)
      } else {
        this.scheduledArrival = ''
      }
      this.pickerDialog = ''
    },
    setScheduledDeparture: function (at) {
      if (at) {
        this.scheduledDeparture = moment(at)
      } else {
        this.scheduledDeparture = ''
      }
      this.pickerDialog = ''
    }
  }
}
</script>
