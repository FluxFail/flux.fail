<template>
<v-parallax
  dark
  :height="320"
  :src="require('@/assets/trainstation_dark_small.jpg')"
>
  <v-layout
    align-center
    column
    justify-center
  >
    <div>
      <center>
        <v-img class="hidden-xs-only logo large" :src="require('@/assets/brand_logo.png')">
        </v-img>
        <v-img class="hidden-sm-and-up logo small" :src="require('@/assets/logo.png')">
        </v-img>
        <h4 class="subheading hidden-xs-only">{{ $t('homePage.slogan.long') }}</h4>
        <h5 class="subheading hidden-sm-and-up" v-html="$t('homePage.slogan.short')"></h5>
        <br />
        <v-btn
          color="#5ccbf0"
          round
          large
          raised
          @click="goLoginPage">
          <span class="grey--text text--darken-4 login-btn">
            {{ $t('homePage.reportDelay') }}
          </span>
        </v-btn>
      </center>
    </div>

  </v-layout>
</v-parallax>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    goLoginPage () {
      if (this.$store.state.user.id) {
        this.$router.push({ name: 'FluxReportPage' })
      } else {
        this.$router.push({ name: 'LoginPage' })
      }
      this.drawer = false
    }
  }
}
</script>

<style scoped>
h1 {
  color: #5ccbf0;
  font-size: 8em;
}
h4 {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 2.5em !important;
  line-height: 1;
}
h5 {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 2em !important;
  line-height: 1;
}
.small {
  width: 75%;
}
.logo {
  margin: 16px;
}
.login-btn {
  font-size: 1.2em;
}
</style>
