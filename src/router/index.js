import Vue from 'vue'
import Router from 'vue-router'
import Ship from '@/components/ship'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ship',
      component: Ship
    }
  ]
})
