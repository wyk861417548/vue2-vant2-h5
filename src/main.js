import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store/index.js'
import config from "@/utils/config.js";
import api from "@/utils/api.js";
import validator from "@/utils/validator.js";
import 'lib-flexible/flexible'

// 各种插件引入
import "@/utils/plugins.js";

Vue.config.productionTip = false

// 公共方法
Vue.prototype.$config = config;

// 接口文件
Vue.prototype.$api = api;
Vue.prototype.$validator = validator;


/** 
 * 页面跳转  
 *   url地址
 *   params 传参
 * */
 Vue.prototype.$skip = (url,params)=>{
  if(!url)return;
  app.$router.push({path:url,query:params});
}

Vue.prototype.$replace = (url,params)=>{
  if(!url)return;
  app.$router.replace({path:url,query:params});
}


var app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app
