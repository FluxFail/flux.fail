<template>
<div>
  <v-dialog v-model="visible" width="640" persistent>
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('datePick', pickedDateTime)">
          <v-icon>check</v-icon>
        </v-btn>
      </v-card-actions>

      <v-card-text>
        <center>
          <v-date-picker
            v-model="pickedDate"
          ></v-date-picker>

          <v-time-picker
            :format="ampm ? '12hr' : '24hr'"
            v-model="pickedTime"
          ></v-time-picker>
        </center>
      </v-card-text>

      <v-card-actions>
        <v-btn flat @click="resetPick">{{ $t('reset') }}</v-btn>
        <v-btn flat @click="setNow">{{ $t('now') }}</v-btn>
        <v-btn block @click="$emit('datePick', pickedDateTime)">{{ $t('next') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
const moment = require('moment')

export default {
  props: {
    ampm: {
      type: Boolean,
      default: false
    },
    defaultDateTime: {
      type: Date
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      pickedDate: moment(this.$props.defaultDateTime).format('YYYY-MM-DD'),
      pickedTime: moment(this.$props.defaultDateTime).format('HH:mm')
    }
  },

  computed: {
    pickedDateTime: function () {
      if (this.pickedDate && this.pickedTime) {
        return moment(`${this.pickedDate} ${this.pickedTime}`, 'YYYY-MM-DD HH:mm').toDate()
      } else {
        return null
      }
    }
  },

  methods: {
    resetPick: function () {
      this.pickedDate = ''
      this.pickedTime = ''
    },
    setNow: function () {
      this.pickedDate = moment().format('YYYY-MM-DD')
      this.pickedTime = moment().format('HH:mm')
    }
  }
}
</script>

<style>

</style>
