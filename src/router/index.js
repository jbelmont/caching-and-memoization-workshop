import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Index'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Main
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})
