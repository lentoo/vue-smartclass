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
    },
    flashName(state, payload) {
        console.log(payload)
        state.collegeName = payload;
        // state.layerName = payload.layerName;
    }
}
export default {
    state,
    mutations,
    getters
}