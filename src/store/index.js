import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Mutations from './mutations'
import actions from './actions'

export default new Vuex.Store({
    modules: {
        Mutations
    },
    actions
})