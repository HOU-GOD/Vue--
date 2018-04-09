import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import member from '@/components/member'
import search from '@/components/search'
import shopcar from '@/components/shopcar'
import NewList from "@/components/News/NewList"
import NewsInfo from "@/components/News/NewsInfo"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/member',
      component: member
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/shopcar',
      component: shopcar
    },
    {
      path: '/home/NewList',
      component: NewList
    },
    {
      path: '/home/NewsInfo/:id',
      component: NewsInfo
    }
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})
