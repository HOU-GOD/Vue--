// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'; // 导入vue模块
import App from './App'; // 导入初始的App.vue文件
import router from './router'; // 导入路由文件

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
Vue.http.options.root = 'http://vue.studyit.io';

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
  template: '<App/>'
})
