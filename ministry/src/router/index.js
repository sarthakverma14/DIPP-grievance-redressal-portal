/* eslint-disable */
import Vue from 'vue'
import { store } from '../store/store'
import Router from 'vue-router'
import Signin from '@/components/User/signin'
import Home from '@/components/User/home'
import Dashboard from '@/components/Dashboard/dashboard'
import Statistics from '@/components/Profile/statistics'
import Mainpage from '@/components/mainpage'
import PastCases from '@/components/Cases/past'
import CaseFile from '@/components/Cases/casefile'
import PastCaseFile from '@/components/Cases/pastcasefile'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',  
      name: 'mainpage',
      component: Mainpage ,
    },  
    {
      path:'/home',
      name:'home',
      component:Home,
      children:[
        {
          path: '/signin',
          name: 'signin',
          component: Signin,  
          meta:{
            notloggedin: true
          }      
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard,
          meta:{
            UserRequired:true
          }
        },     
        {
          path: '/pastcases',
          name: 'pastcases',
          component: PastCases,
          meta:{
            UserRequired:true
          }
        },         
        {
          path: '/statistics',
          name: 'statistics',
          component: Statistics,
          meta:{
            UserRequired:true
          }
        },     
        {
          path: '/casefile/:caseid',
          name: 'casefile',
          component: CaseFile,
          meta:{
            UserRequired:true
          }
        },
        {
          path: '/pastcasefile/:caseid',
          name: 'pastcasefile',
          component: PastCaseFile,
          meta:{
            UserRequired:true
          }
        }     
      ]
    }   
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.UserRequired)) {
    if (!store.getters.getUserId) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
