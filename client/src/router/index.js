import Vue from 'vue'
import Router from 'vue-router'

import About from '@/pages/About'
import Flux from '@/pages/Flux'
import Home from '@/pages/Home'
import Login from '@/pages/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Home
    },
    {
      path: '/flux',
      name: 'FluxPage',
      component: Flux
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: About
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: Login
    }
  ]
})
