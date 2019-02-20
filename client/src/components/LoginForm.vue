<template>
<div>
  <v-text-field
    v-model="email"
    :rules="emailRules"
    :label="$t('loginFormLabelEmail')"
    :disabled="loading"
    type="email"
    required />
  <v-spacer></v-spacer>
  <v-btn
    color="primary"
    :disabled="isDisabled"
    :loading="loading"
    @click.prevent="logIn"
    round
    right
    large
    outline
  >
    Login
  </v-btn>
</div>
</template>

<script>
import isEmail from 'validator/lib/isEmail'

const API_URL = process.env.API_URL

export default {
  data () {
    return {
      valid: true,
      loading: false,
      email: '',
      emailRules: [
        v => !!v || this.$t('loginFormEmailInvalid'),
        v => /.+@.+\...+/.test(v) || this.$t('loginFormEmailInvalid')
      ]
    }
  },
  computed: {
    isDisabled () {
      return !this.email || !isEmail(this.email)
    }
  },
  methods: {
    reset () {
      this.loading = false
      this.email = ''
    },
    logIn () {
      if (isEmail(this.email)) {
        this.loading = true
        this.$http.post(`${API_URL}/login/email`, JSON.stringify({
          email: this.email
        }),
        {
          headers: {
            'content-type': 'application/json'
          }
        })
          .then((res) => {
            if (res.status !== 202) {
              this.$store.commit('FLASH/SET_FLASH', { message: res.json().then(body => body.message), variant: 'danger' })
            } else {
              this.$store.commit('FLASH/SET_FLASH', { message: this.$t('loginCheckYourMail'), variant: 'success' })
            }
            this.reset()
          })
      }
    }
  }
}
</script>
