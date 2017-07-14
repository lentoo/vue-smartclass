import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

import App from './App.vue'
import ClassList from './components/classlist.vue'
import ClassDetail from './components/classdetail.vue'
import Login from './components/Login.vue'
Vue.use(ElementUI)
Vue.use(VueRouter)
const routes = [
  { path: '/classList', component: ClassList },
  { path: '/classList/classDetail/:classId', component: ClassDetail },
  { path: '/Login', component: Login }
]
const router = new VueRouter({
  routes
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
