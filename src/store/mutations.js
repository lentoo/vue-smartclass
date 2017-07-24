import getters from './getter'
const state = {
    classFilter: '',
    collegeName: '',
    layerName: ''
}
const mutations = {
    classFilter(state, payload) {
        state.classFilter = payload;
    },
    collegeName(state, payload) {
        state.collegeName = payload;
    },
    layerName(state, payload) {
        state.layerName = payload;
    }
}   
export default {
    state,
    mutations,
    getters
}