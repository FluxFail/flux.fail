<template>
<v-app id="inspire" dark>
  <v-navigation-drawer
    clipped
    fixed
    v-model="drawer"
    app
  >
    <v-list>
      <!-- Home -->
      <v-list-tile v-for="(item, index) in items" :key="index" @click="item.action" :disabled="item.disabled">
        <v-list-tile-action :disabled="item.disabled"><v-icon>{{ item.icon }}</v-icon></v-list-tile-action>
        <v-list-tile-content :disabled="item.disabled"><v-list-tile-title>{{ item.label }}</v-list-tile-title></v-list-tile-content>
      </v-list-tile>
      <v-list-tile></v-list-tile>
      <v-list-tile @click="logout" v-if="this.$store.state.user.user">
        <v-list-tile-action><v-icon>fas fa-sign-out-alt</v-icon></v-list-tile-action>
        <v-list-tile-content><v-list-tile-title>Logout</v-list-tile-title></v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-title>
    </v-toolbar-title>
    <img :src="require('./assets/brand_logo.png')" height="50%" style="padding-bottom: 4px;" />
    <v-spacer></v-spacer>

    <v-list-tile @click="goLoginPage" v-if="!this.$store.state.user.user">
      Login&nbsp;<v-icon>fas fa-sign-in-alt</v-icon>
    </v-list-tile>

    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
  </v-toolbar>
  <v-content>
    <router-view></router-view>
  </v-content>
  <Footer :copyrightYear="2018" copyrightOwner="flux.fail" />
</v-app>
</template>

<script>
import Footer from './components/Footer.vue'

export default {
  components: {
    Footer
  },
  data () {
    return {
      drawer: false,
      loginEmail: '',
      items: [
        {
          label: this.$t('menu_item_home'),
          icon: 'fas fa-home',
          action: this.goHomePage,
          active: true
        },
        {
          label: this.$t('menu_item_stream'),
          icon: 'fas fa-clock',
          action: this.goDelayStreamPage
        },
        {
          label: this.$t('menu_item_my_routes'),
          icon: 'fas fa-route',
          action: this.foo,
          disabled: true
        },
        {
          label: this.$t('menu_item_about'),
          icon: 'fas fa-question',
          action: this.goAboutPage
        }
      ]
    }
  },
  methods: {
    foo () {
      this.drawer = false
      console.log('Clicked!!!')
    },
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    goHomePage () {
      this.drawer = false
      this.$router.push({ name: 'HomePage' })
    },
    goDelayStreamPage () {
      this.drawer = false
      this.$router.push({ name: 'DelayStreamPage' })
    },
    goAboutPage () {
      this.drawer = false
      this.$router.push({ name: 'AboutPage' })
    },
    goLoginPage () {
      this.drawer = false
      this.$router.push({ name: 'LoginPage' })
    },
    logout () {
      this.drawer = false
      this.$store.commit('authLogout')
    },
    login (email) {
      this.$store.dispatch('authSendLoginMail', email)
    }
  },
  created: function () {
    this.$store.dispatch('authInitialize')
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
}
html {
  font-family: 'Roboto' 16px, sans-serif;
  color: #212121;
}

.theme--dark {
  color: #5ccbf0 !important;
}
.mdi-icon {
  fill: #5ccbf0 !important;
}
.brand-logo {
  display: inline;
  max-height: 10px
}
.brand-logo img {
  height: auto;
}
</style>
