<template>
<v-container fluid>
  <v-layout wrap justify-space-around>
    <v-flex xs12 sm8>
        <v-form ref="form">
          <v-container fluid>
            <v-layout wrap justify-space-between>
              <v-flex xs4>
                <v-autocomplete
                  v-model="fields.country"
                  :items="isoCountries"
                  :label="$t('fluxPage.report.form.label.country')"
                  :rules="countryRules"
                  autofocus
                ></v-autocomplete>
              </v-flex>
              <v-flex xs8>
                <v-combobox
                  v-model="fields.city"
                  :label="$t('fluxPage.report.form.label.city')"
                  :rules="isRequiredRules"
                ></v-combobox>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  v-model="fields.location"
                  :label="$t('fluxPage.report.form.label.location')"
                  :rules="isRequiredRules"
                  @keyup.enter="goNextFluxReportFormPage"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
    </v-flex>
  </v-layout>
  <v-card class="mb-5"></v-card>
  <v-layout>
    <v-flex class="text-xs-right">
      <v-btn @click="cancelReport" flat>{{ $t('generic.form.btn.cancel') }}</v-btn>
      <v-btn @click="goNextFluxReportFormPage">
        {{ $t('generic.form.btn.next') }}
      </v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { isoCountries } from '@/components/ui/CountryCodes'

export default {
  data () {
    return {
      fields: {
        country: this.$store.state.fluxReportForm.fields.country,
        city: this.$store.state.fluxReportForm.fields.city,
        location: this.$store.state.fluxReportForm.fields.location
      },
      countryRules: [
        v => !!v || this.$t('requiredField'),
        v => Object.keys(isoCountries).includes(v.toUpperCase()) || this.$t('unknownCountryCode')
      ],
      isRequiredRules: [
        v => !!v || this.$t('requiredField')
      ],
      isoCountries: Object.keys(isoCountries)
    }
  },
  methods: {
    cancelReport: function () {
      this.$store.commit('fluxReportFormReset')
      this.$router.push({ name: 'HomePage' })
    },
    goNextFluxReportFormPage: function () {
      if (this.$refs.form.validate()) {
        this.$store.commit('fluxReportFormUpdateFields', this.fields)
        this.$store.commit('fluxReportFormStepForward')
      }
    }
  },
  mounted () {
    this.fields = {
      country: this.$store.state.fluxReportForm.fields.country,
      city: this.$store.state.fluxReportForm.fields.city,
      location: this.$store.state.fluxReportForm.fields.location
    }
  }
}
</script>

<style>

</style>
