import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import member from '@/components/member'
import search from '@/components/search'
import shopcar from '@/components/shopcar'
import NewList from "@/components/News/NewList"
import NewsInfo from "@/components/News/NewsInfo"
import photo from "@/components/photos/photo"
import photoInfo from "@/components/photos/photoInfo"
import goodslist from "@/components/goods/GoodsList"
import goodsInfo from "@/components/goods/GoodsInfo"

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
    },
    {
      path: '/home/photos',
      component: photo
    },
    {
      path: '/home/photoinfo/:id',
      component: photoInfo
    },
    {
      path: '/home/goodslist',
      component: goodslist
    },
    {
      path: '/home/goodsInfo/:id',
      component: goodsInfo, name: "goodsInfo"
    }
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})
