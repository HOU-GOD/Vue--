// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'; // 导入vue模块
import App from './App'; // 导入初始的App.vue文件
import router from './router'; // 导入路由文件index.js

// 导入并注册mint-ui 的Swipe, SwipeItem组件
// 按需导入 Mint-UI 中的组件   
import mintui from 'mint-ui'
Vue.use(mintui);

// 导入css
import 'mint-ui/lib/style.css';


//导入格式化事件的插件
import moment from "moment";
//定义全局的过滤器
Vue.filter('dateFormat',function (data) {
  return moment(data).format("YYYY-MM-DD HH:mm:ss")
})


// 导入vue-resource组件
import VueResource from "vue-resource";
Vue.use(VueResource);
//设置请求的根路径
Vue.http.options.root = 'http://www.lovegf.cn:8899';
Vue.http.options.emulateJSON = true;


// 导入axios组件
import axios from "axios";
import qs from "qs";
// 手动将axios绑定到Vue原型中, 以供其他组件内部可以使用axios
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
axios.defaults.baseURL = 'http://www.lovegf.cn:8899';

// 设置全局的请求根域名
axios.defaults.baseURL = 'http://www.lovegf.cn:8899';
// 通过设置请求拦截器 配置post参数序列化
axios.interceptors.request.use(function (config) {
  // 统一处理post请求的参数 为application/x-www-form-urlencode
  if (config.method == 'post') {
    config.data = qs.stringify(config.data)
  }
  return config;
});


// 导入 图片预览插件
import Vuepreview from "vue-preview";
Vue.use(Vuepreview);



// 导入Vuex
import Vuex from "vuex";
// 注册vuex到vue中
Vue.use(Vuex);
// 存储到本地的localStorage
var car = JSON.parse(localStorage.getItem('car')||'[]')
// new Vuex.Store()  实例, 得到一个数据仓储对象
var store = new Vuex.Store({
  state:{
    car: car
  },
  mutations:{
    addToCar(state,goodsinfo){//添加购物车
      // 点击加入购物车, 把商品信息, 保存到store中的car上
      // 分析:
      // 1. 如果购物车中, 之前就已经有这个对应的商品了, 那么, 只需要更新数量
      // 2. 如果没有, 则直接把商品数据, push到car中即可
      // 假设 在购物车中没有找到对应的商品
      var flag = false;
      state.car.some(item=>{
        if (item.id == goodsinfo.id) {// 如果找的到id一致的修改flag, 直接数量累加
          item.count +=parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      })
      if (!flag) {//找不到id一致的就push
        state.car.push(goodsinfo);
        // console.log(state.car);
        
      }
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    
  },
  getters:{
    getAllCount(state){
      var c = 0;
      state.car.forEach(item=>{
        c += item.count;
      })
      return c
    }
  }
})



// 导入mui样式
import './lib/mui/css/mui.css';
// 导入字体图标扩展文件
import './lib/mui/css/icons-extra.css';


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
