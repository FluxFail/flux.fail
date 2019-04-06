<template>
<v-container fluid>
  <v-form ref=form @submit.prevent="goNextFluxReportPage">
    <v-layout wrap justify-space-around>
      <v-flex xs4>
        <center>
          <v-text-field
            v-model="fields.line"
            :label="$t('fluxPage.report.form.label.line')"
            :rules=lineRules
            autofocus
            @keyup.enter="goNextFluxReportPage"
          ></v-text-field>
        </center>
      </v-flex>
      <v-flex xs8>
        <center>
          <v-text-field
            v-model="fields.direction"
            :label="$t('fluxPage.report.form.label.direction')"
            :rules=directionRules
            autofocus
            @keyup.enter="goNextFluxReportPage"
          ></v-text-field>
        </center>
      </v-flex>
      <v-flex xs12>
        <center>
          {{ vehicleText }}
        </center>
      </v-flex>
      <v-flex><v-btn flat @click="selectVehicle(1)" block :outline="isSelectedVehicle(1)">
          <VehicleIcon
            :id="1"
            :size="2"
          />
      </v-btn></v-flex>
      <v-flex><v-btn flat @click="selectVehicle(2)" block :outline="isSelectedVehicle(2)">
          <VehicleIcon
            :id="2"
            :size="2"
          />
      </v-btn></v-flex>
      <v-flex><v-btn flat @click="selectVehicle(4)" block :outline="isSelectedVehicle(4)">
          <VehicleIcon
            :id="4"
            :size="2"
          />
      </v-btn></v-flex>
      <v-flex><v-btn flat @click="selectVehicle(8)" block :outline="isSelectedVehicle(8)">
          <VehicleIcon
            :id="8"
            :size="2"
          />
      </v-btn></v-flex>
      <v-flex><v-btn flat @click="selectVehicle(16)" block :outline="isSelectedVehicle(16)">
          <VehicleIcon
            :id="16"
            :size="2"
          />
      </v-btn></v-flex>
      <v-flex><v-btn flat @click="selectVehicle(32)" block :outline="isSelectedVehicle(32)">
          <VehicleIcon
            :id="32"
            :size="2"
          />
      </v-btn></v-flex>
      <v-flex><v-btn flat @click="selectVehicle(64)" block :outline="isSelectedVehicle(64)">
          <VehicleIcon
            :id="64"
            :size="2"
          />
      </v-btn></v-flex>
      <v-flex><v-btn flat @click="selectVehicle(128)" block :outline="isSelectedVehicle(128)">
          <VehicleIcon
            :id="128"
            :size="2"
          />
      </v-btn></v-flex>
    </v-layout>
  </v-form>
  <v-card class="mb-5"></v-card>
  <v-layout>
    <v-flex class="text-xs-right">
      <v-btn flat @click="goPrevFluxReportFormPage">{{ $t('generic.form.btn.back') }}</v-btn>
      <v-btn @click="goNextFluxReportPage">{{ $t('generic.form.btn.next') }}</v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import VehicleIcon from '@/components/ui/VehicleIcon'

export default {
  components: {
    VehicleIcon
  },
  data () {
    return {
      fields: {
        line: this.$store.state.fluxReportForm.fields.line,
        direction: this.$store.state.fluxReportForm.fields.direction,
        vehicle: this.$store.state.fluxReportForm.fields.vehicle
      },
      lineRules: [
        v => !!v || this.$t('fluxPage.report.form.err.required')
      ],
      directionRules: [
        v => !!v || this.$t('fluxPage.report.form.err.required')
      ]
    }
  },
  computed: {
    vehicleText: function () {
      switch (this.fields.vehicle) {
        case 1: { return this.$t('vehicle.bus') }
        case 2: return this.$t('vehicle.train')
        case 4: return this.$t('vehicle.subway')
        case 8: return this.$t('vehicle.tram')
        case 16: return this.$t('vehicle.lift')
        case 32: return this.$t('vehicle.ship')
        case 64: return this.$t('vehicle.airplane')
        case 128: return this.$t('vehicle.rocket')
        default: return this.$t('vehicle.none')
      }
    }
  },
  methods: {
    goPrevFluxReportFormPage: function () {
      this.$store.commit('fluxReportFormStepBack')
    },
    goNextFluxReportPage: function () {
      if (this.$refs.form.validate()) {
        this.$store.commit('fluxReportFormUpdateFields', this.fields)
        this.$store.commit('fluxReportFormStepForward')
      }
    },
    selectVehicle: function (vId) {
      this.fields.vehicle = vId
      this.goNextFluxReportPage()
    },
    isSelectedVehicle: function (vId) {
      return this.fields.vehicle === vId
    }
  }
}

</script>

<style>

</style>
