<template>
<div>
  <v-layout wrap justify-space-around>
    <v-flex xs12 pa-2 v-if="$store.state.fluxReportForm.fields.scheduledArrival">
      <v-card>
        <v-toolbar>
          {{ $t('fluxPage.report.form.label.actual.arrival') }}
        </v-toolbar>

        <v-card-text v-if="arrivedAt">
          <center>
            {{ arrivedAtFormatted }}
          </center>
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-if="!arrivedAt"
            @click="setArrivedAt(new Date())"
            block
          >{{ $t('generic.form.btn.now') }}</v-btn>

          <v-btn
            v-if="arrivedAt"
            @click="setArrivedAt('')"
            flat
          >{{ $t('generic.form.btn.reset') }}</v-btn>
          <v-btn
            v-if="arrivedAt"
            @click="pickerDialog = 'arrival'"
            block
          >{{ $t('generic.form.btn.change') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs12 pa-2>
      <v-card>
        <v-toolbar>
          {{ $t('fluxPage.report.form.label.actual.departure') }}
        </v-toolbar>

        <v-card-text v-if="departedAt">
          <center>
            {{ departedAtFormatted }}
          </center>
        </v-card-text>

        <v-card-actions>
          <v-btn
            v-if="!departedAt"
            @click="setDepartedAt(new Date())"
            block
          >{{ $t('generic.form.btn.now') }}</v-btn>

          <v-btn
            v-if=departedAt
            @click="setDepartedAt('')"
            flat
          >{{ $t('generic.form.btn.reset') }}</v-btn>
          <v-btn
            v-if="departedAt"
            @click="pickerDialog = 'departure'"
            block
          >{{ $t('generic.form.btn.change') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

  <v-card class="mb-5"></v-card>
  <v-layout>
    <v-flex class="text-xs-right">
      <v-btn flat @click="goPrevFluxReportFormPage">{{ $t('generic.form.btn.back') }}</v-btn>
      <v-btn @click="goNextFluxReportFormPage" :disabled="!isValid" color="primary">{{ $t('fluxPage.report.form.submitNew') }}</v-btn>
    </v-flex>
  </v-layout>

  <dateTimePickerDialog
    :visible="pickerDialog === 'arrival'"
    :defaultDate="this.arrivedAt"
    @datePick="setArrivedAt($event)"
  ></dateTimePickerDialog>

  <dateTimePickerDialog
    :visible="pickerDialog === 'departure'"
    :defaultDate="this.departedAt"
    @datePick="setDepartedAt($event)"
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
      pickerDialog: '',
      cancelled: false,
      arrivedAt: '',
      departedAt: ''
    }
  },

  computed: {
    fields: function () {
      if (this.cancelled) {
        return {
          cancelled: true,
          arrivedAt: '',
          departedAt: ''
        }
      } else {
        return {
          cancelled: false,
          arrivedAt: this.arrivedAt ? this.arrivedAt.startOf('minute').toDate() : '',
          departedAt: this.departedAt ? this.departedAt.startOf('minute').toDate() : ''
        }
      }
    },
    isValid: function () {
      if (this.cancelled || this.arrivedAt || this.departedAt) {
        return true
      } else {
        return false
      }
    },
    arrivedAtFormatted: function () {
      return this.arrivedAt ? moment(this.arrivedAt).calendar() : ''
    },
    departedAtFormatted: function () {
      return this.departedAt ? moment(this.departedAt).calendar() : ''
    }
  },

  methods: {
    goPrevFluxReportFormPage: function () {
      this.$store.commit('fluxReportFormStepBack')
    },
    goNextFluxReportFormPage: function () {
      this.$store.commit('fluxReportFormUpdateFields', this.fields)
      this.$store.dispatch('fluxPostReport')
    },
    setArrivedAt: function (at) {
      if (at) {
        this.arrivedAt = moment(at)
      } else {
        this.arrivedAt = ''
      }
      this.pickerDialog = ''
    },
    setDepartedAt: function (at) {
      if (at) {
        this.departedAt = moment(at)
      } else {
        this.departedAt = ''
      }
      this.pickerDialog = ''
    }
  }
}
</script>
