<template>
<div id="navigation">
  <v-navigation-drawer
    v-model="drawer"
    clipped
    fixed
    app
  >
    <v-list>
      <v-list-tile v-for="(item, index) in items" :key="index" @click="item.action" :disabled="item.disabled">
        <v-list-tile-action :disabled="item.disabled"><v-icon>{{ item.icon }}</v-icon></v-list-tile-action>
        <v-list-tile-content :disabled="item.disabled"><v-list-tile-title>{{ item.label }}</v-list-tile-title></v-list-tile-content>
      </v-list-tile>
      <v-list-tile></v-list-tile>
      <v-list-tile @click="logout" v-if="this.$store.state.user.id">
        <v-list-tile-action><v-icon>fas fa-sign-out-alt</v-icon></v-list-tile-action>
        <v-list-tile-content><v-list-tile-title>{{ $t('nav.logout') }}</v-list-tile-title></v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-title>
    </v-toolbar-title>
      <img
        :src="require('@/assets/brand_logo.png')"
        height="50%"
        style="padding-bottom: 4px; cursor: pointer;"
        @click="$router.push({ name: 'HomePage' })"
      />
    <v-spacer></v-spacer>

    <v-icon @click.stop="drawer = !drawer" large>menu</v-icon>
  </v-toolbar>
</div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      items: [
        {
          label: this.$t('nav.home'),
          icon: 'fas fa-home',
          action: this.goHomePage
        },
        {
          label: this.$t('nav.report'),
          icon: 'fas fa-folder-plus',
          action: this.goFluxReportPage
        },
        {
          label: this.$t('nav.stream'),
          icon: 'fas fa-clock',
          action: this.goFluxStreamPage
        },
        {
          label: this.$t('nav.about'),
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
    goHomePage () {
      this.drawer = false
      this.$router.push({ name: 'HomePage' })
    },
    goFluxReportPage () {
      if (this.$store.state.user.id) {
        this.$router.push({ name: 'FluxReportPage' })
      } else {
        this.$router.push({ name: 'LoginPage' })
      }
      this.drawer = false
    },
    goFluxStreamPage () {
      this.drawer = false
      this.$router.push({ name: 'FluxStreamPage' })
    },
    goAboutPage () {
      this.drawer = false
      this.$router.push({ name: 'AboutPage' })
    },
    logout () {
      this.drawer = false
      this.$store.commit('authLogout')
    }
  }
}
</script>

<style>
.brand-logo {
  display: inline;
  max-height: 10px
}
.brand-logo img {
  height: auto;
}
</style>
