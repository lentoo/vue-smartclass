import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from './store/'

import RouterConfig from './js/router.config'
import App from './App.vue'
import AutoFocus from './js/autoFocus'
Vue.use(AutoFocus)
axios.defaults.timeout = 5000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头

axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if (config.data != null) {  //在请求参数后面添加参数
    config.data += '&Access=' + localStorage.getItem('token')
  } else {
    config.data = 'Access=' + localStorage.getItem('token')
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  //store.commit('hideLoading');
  return res;
}, (error) => {
  return Promise.reject(error);
});

Vue.prototype.$http = axios


Vue.use(ElementUI)  
Vue.use(VueRouter)

const router = new VueRouter({
  routes: RouterConfig
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
