import Vue from 'vue'
import Router from 'vue-router'

import About from '@/pages/AboutPage/index'
import FluxReport from '@/pages/Flux/ReportPage/index'
import FluxStream from '@/pages/Flux/StreamPage/index'
import Home from '@/pages/HomePage/index'
import Login from '@/pages/LoginPage/index'

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
      path: '/flux/report',
      name: 'FluxReportPage',
      component: FluxReport
    },
    {
      path: '/flux/stream',
      name: 'FluxStreamPage',
      component: FluxStream
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
