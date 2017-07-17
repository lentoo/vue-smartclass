import getters from './getter'
const state = {
    classFilter: 'abc'
}
const mutations = {
    classFilter(state,payload){
        state.classFilter=payload;
    }
}
export default {
    state,
    mutations,
    getters
}