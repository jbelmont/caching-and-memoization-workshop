import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Main
    }
  ]
})
