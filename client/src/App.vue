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
      <div v-for="(item, index) in items" :key="index">
        <v-list-tile @click="item.action" v-if="item.label !== ''">
          <v-list-tile-action><v-icon>{{ item.icon }}</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>{{ item.label }}</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-else>
        <v-list-tile>
        </v-list-tile>
        </v-list-tile>
      </div>
      <v-spacer></v-spacer>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="brand-logo">
      <img :src="require('./assets/brand_logo.png')" />
    </v-toolbar-title>
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
      items: [
        {
          label: this.$t('menu_item_home'),
          icon: 'home',
          action: this.goHomePage
        },
        {
          label: this.$t('menu_item_delay_stream'),
          icon: 'fas fa-clock',
          action: this.foo
        },
        {
          label: this.$t('menu_item_my_routes'),
          icon: 'fas fa-route',
          action: this.foo
        },
        {
          label: this.$t('menu_item_about'),
          icon: 'fas fa-question',
          action: this.goAboutPage
        },
        {label: ''},
        {
          label: this.$t('menu_item_login'),
          icon: 'fas fa-sign-in-alt',
          action: this.goLoginPage
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
    goAboutPage () {
      this.drawer = false
      this.$router.push({ name: 'AboutPage' })
    },
    goLoginPage () {
      this.drawer = false
      this.$router.push({ name: 'LoginPage' })
    }
  }
}
</script>

<style>
.theme--dark {
  color: #4dd7fa !important;
}
.brand-logo {
  max-height: 256px;
  display: inline;
}
.brand-logo img {
  max-width: 50%;
  height: auto;
}
</style>
