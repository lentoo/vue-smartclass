import ClassList from '../components/classlist.vue'
import ClassDetail from '../components/classdetail.vue'
import Login from '../components/Login.vue'
export default [
    { path: '/classList', component: ClassList },
    { path: '/classList/classDetail/:classId', component: ClassDetail },
    { path: '/Login', component: Login }
    //{ path: '/', redirect: '/classList' }
]