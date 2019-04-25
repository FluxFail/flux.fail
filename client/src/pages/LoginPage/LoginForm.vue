<template>
<v-card
    class="mx-auto"
    max-width="500"
  >
    <v-card-title class="title font-weight-regular justify-space-between">
      <!-- <span>{{ $t('login') }}</span> -->
      <!-- <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar> -->
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <form @keydown.enter.prevent="logIn" lazy-validation>
          <v-card-text>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :label="$t('loginPage.form.label')"
              :disabled="loading"
              type="email"
              ref="emailField"
              required
            ></v-text-field>
            <span class="caption white--text text--darken-1">
              {{ $t('loginPage.form.description') }}
            </span>
          </v-card-text>
        </form>
      </v-window-item>

      <v-window-item :value="2">
        <div class="pa-3 text-xs-center">
          <h3 class="title font-weight-light mb-2">{{ $t('loginPage.welcome') }}</h3>
          <v-img
            class="mb-3"
            contain
            height="64"
            :src="require('@/assets/brand_logo.png')"
          ></v-img>
          <span class="caption white--text">{{ $t('loginPage.checkMail') }}</span>
        </div>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="step === 1"
        flat
        @click="step--"
      >
        {{ $t('generic.form.btn.back') }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        depressed
        @click="logIn"
        :disabled="loading || isDisabled || step === 2"
      >
        {{ $t('generic.form.btn.submit') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import isEmail from 'validator/lib/isEmail'

const API_URL = process.env.API_URL

export default {
  data () {
    return {
      step: 1,
      valid: true,
      loading: false,
      email: '',
      emailRules: [
        v => !!v || this.$t('loginPage.form.err.email'),
        v => /.+@.+\...+/.test(v) || this.$t('loginPage.form.err.email')
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
      this.$refs.emailField.reset()
    },
    logIn () {
      if (isEmail(this.email)) {
        this.loading = true
        this.$http.post(`${API_URL}/login/email`, JSON.stringify({
          email: this.email
        }),
        {
          timeout: 4000,
          headers: {
            'content-type': 'application/json'
          }
        })
          .then((res) => {
            console.log(res)
            this.step = 2
            if (res.status !== 202) {
              this.flash({ message: 'NOT GOOD!', variant: 'danger' })
            } else {
              this.flash({ message: 'FSCKYEAH!', variant: 'success' })
            }
            this.reset()
          })
          .catch(() => this.reset())
      }
    }
  }
}
</script>
