import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import GsapTo from '../views/GsapTo.vue'
import GsapTimeline from '../views/GsapTimeline.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'to',
    alias: 'to',
    component: GsapTo,
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: GsapTimeline,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
