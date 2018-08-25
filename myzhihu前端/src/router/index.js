import Vue from 'vue'
import Router from 'vue-router'

import index from '@/page/index/index'
import detail from '@/page/detail/detail'



Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition){
     if(savedPosition){
        return savedPosition
     } else {
        return { x: 0, y: 0 }
     }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      meta: { index: 0 },   //meta对象的index用来定义当前路由的层级,由小到大,由低到高
      component: index,
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/detail',
      name: 'detail',
      meta: { index: 2 },
      component: detail,
    },
    
  ]
})

