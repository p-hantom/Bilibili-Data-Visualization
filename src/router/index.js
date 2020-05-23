import Vue from 'vue'
import Router from 'vue-router'
import IntroductionPage from '@/components/IntroductionPage'
import Charts from '@/components/Charts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'IntroductionPage',
      component: IntroductionPage
    },
    {
      path: '/charts',
      name: 'Charts',
      component: Charts
    }
  ]
})
