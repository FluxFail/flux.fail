<template>
<div>
  <v-card>
    <v-toolbar>
      {{ title }}
    </v-toolbar>

    <v-card-text v-if="timestamp">
      <center>
        {{ timestamp.calendar() }}
      </center>
    </v-card-text>

    <v-card-actions>
      <v-btn v-if="!timestamp" @click="setNow" block>
        {{ $t('generic.form.btn.now') }}
      </v-btn>
      <v-btn v-if="timestamp" @click="reset" flat>
        {{ $t('generic.form.btn.reset') }}
      </v-btn>
      <v-btn v-if="timestamp" @click="pickerVisible = true" block>
        {{ $t('generic.form.btn.change') }}
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-dialog v-model="pickerVisible" width="640" persistent>
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="closePicker">
          <v-icon>check</v-icon>
        </v-btn>
      </v-card-actions>

      <v-card-text>
        <center>
          <v-date-picker
            v-model="pickedDate"
          ></v-date-picker>

          <v-time-picker
            format="24hr"
            v-model="pickedTime"
          ></v-time-picker>
        </center>
      </v-card-text>

      <v-card-actions>
        <v-btn flat @click="reset">{{ $t('reset') }}</v-btn>
        <v-btn flat @click="setNow">{{ $t('now') }}</v-btn>
        <v-btn block @click="closePicker">{{ $t('next') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
const moment = require('moment')

export default {
  props: {
    title: String
  },

  data () {
    return {
      pickedDate: null,
      pickedTime: null,
      pickerVisible: false
    }
  },

  computed: {
    timestamp: function () {
      if (this.pickedDate && this.pickedTime) {
        return moment(`${this.pickedDate} ${this.pickedTime}`, 'YYYY-MM-DD HH:mm')
      }
      return ''
    }
  },

  methods: {
    setDate: function (newDate) {
      this.pickedDate = moment(newDate).format('YYYY-MM-DD')
    },

    setTime: function (newTime) {
      this.pickedTime = moment(newTime).format('HH:mm')
    },

    setNow: function () {
      const now = moment()
      this.setDate(now)
      this.setTime(now)
      this.emitTimestamp()
    },

    reset: function () {
      this.pickedDate = null
      this.pickedTime = null
      this.emitTimestamp()
    },

    closePicker: function () {
      this.pickerVisible = false
      this.emitTimestamp()
    },

    emitTimestamp: function () {
      this.$emit(
        'datetimeSelected', this.timestamp
      )
    }
  }
}
</script>

<style>

</style>
