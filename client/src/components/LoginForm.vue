<template>
<div>
  <v-alert
    v-if="mailSent"
    type="info"
    :value="true"
  >
    We've sent you a login-link, please check you inbox.
  </v-alert>

  <v-alert
    v-if="error"
    type="error"
    :value="true"
  >
    {{ error }}
  </v-alert>

  <br v-if="mailSent || error" />
  <v-text-field
    v-model="email"
    :rules="emailRules"
    :label="$t('login_form_email_label')"
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
      error: null,
      mailSent: false,
      valid: true,
      loading: false,
      email: '',
      emailRules: [
        v => !!v || this.$t('login_form_email_invalid'),
        v => /.+@.+\...+/.test(v) || this.$t('login_form_email_invalid')
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
    },
    logIn () {
      this.error = null
      if (isEmail(this.email)) {
        this.loading = true
        this.$http.post(
          `${API_URL}/login/email`,
          JSON.stringify({
            email: this.email
          }),
          {
            headers: {
              'content-type': 'application/json'
            }
          })
          .then((res) => {
            if (res.status !== 202) {
              this.error = res.json().then((body) => { this.error = body.message })
              this.reset()
              this.email = ''
              this.$refs.form.reset()
            }
            this.mailSent = true
            this.reset()
          },
          (res) => {
            this.error = res.json().then((body) => { this.error = body.message })
            this.reset()
          }
          )
      }
    }
  }
}
</script>
