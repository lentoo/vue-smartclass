import ClassList from '../components/classlist.vue'
import ClassDetail from '../components/classdetail.vue'
import Login from '../components/Login.vue'
import ControlCenter from '../components/ControlCenter.vue'
import ControlDetail from '../components/ControlDetail.vue'
export default [
    { path: '/classList', component: ClassList },
    { path: '/classList/classDetail/:classId', component: ClassDetail },
    { path: '/Login', component: Login },
    { path: '/controlCenter', component: ControlCenter },
    { path: '/controlCenter/controlDetail', component: ControlDetail },
    { path: '/', redirect: '/classList' }
    //{ path: '/', redirect: '/classList' }
]