import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'upload',
      component: ()=>import('@/pages/upload')
    },
    {
      path: '/tree',
      name: 'tree',
      component: ()=>import('@/pages/tree/List.vue')
    },
  ]
})
