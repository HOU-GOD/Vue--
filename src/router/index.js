import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import member from '@/components/member'
import search from '@/components/search'
import shopcar from '@/components/shopcar'
import NewList from "@/components/News/NewList" //导入新闻组件
import NewsInfo from "@/components/News/NewsInfo"//导入新闻详情组件
import photo from "@/components/photos/photo"//导入图片组件
import photoInfo from "@/components/photos/photoInfo"//导入图片详情组件
import goodslist from "@/components/goods/GoodsList"//导入商品组件
import goodsInfo from "@/components/goods/GoodsInfo"//导入商品详情组件
import goodsdesc from "@/components/goods/GoodsDesc"//导入商品图文介绍组件
import goodscomment from "@/components/goods/GoodsComment"//导入商品评论组件

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
    },
    {
      path: '/home/goodsdesc/:id',
      component: goodsdesc, name: "goodsdesc"
    },
    {
      path: '/home/goodscomment/:id',
      component: goodscomment, name: "goodscomment"
    }
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})
