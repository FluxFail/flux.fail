import Vue from 'vue'
import Router from 'vue-router'

import About from '@/pages/About'
import DelayStream from '@/pages/DelayStream'
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
      path: '/delay',
      name: 'DelayStreamPage',
      component: DelayStream
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
