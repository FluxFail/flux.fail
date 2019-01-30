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
        <v-list-tile @click="item.action">
          <v-list-tile-action><v-icon>{{ item.icon }}</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>{{ item.label }}</v-list-tile-title></v-list-tile-content>
        </v-list-tile>
      </div>
      <v-spacer></v-spacer>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>flux.fail</v-toolbar-title>
  </v-toolbar>
  <v-content>
    <Home />
  </v-content>
  <v-footer app fixed>
    <v-layout justify-center row wrap>
      <span>
        &copy; 2018 &mdash;
        <strong>flux.fail</strong>
      </span>
    </v-layout>
  </v-footer>
</v-app>
</template>

<script>
import Home from './pages/Home.vue'

export default {
  components: {
    Home
  },
  data () {
    return {
      drawer: false,
      items: [
        {
          label: 'Home',
          icon: 'home',
          action: this.foo
        },
        {
          label: 'Delay-Stream',
          icon: 'fas fa-clock',
          action: this.foo
        },
        {
          label: 'My Routes',
          icon: 'fas fa-route',
          action: this.foo
        },
        {
          label: 'About',
          icon: 'fas fa-question',
          action: this.foo
        }
      ]
    }
  },
  methods: {
    foo: function () {
      this.drawer = false
      console.log('Clicked!!!')
    }
  }
}
</script>

<style>
.theme--dark {
  color: #4dd7fa !important;
};
</style>
