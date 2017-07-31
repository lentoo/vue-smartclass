import getters from './getter'
const state = {
    classFilter: '',
    BuildingName: '',
    layerName: ''
}
const mutations = {
    classFilter(state, payload) {
        state.classFilter = payload;
    },
    BuildingName(state, payload) {
        state.BuildingName = payload;
    },
    layerName(state, payload) {
        state.layerName = payload;
    },
    flashName(state, payload) {
        console.log(payload)
        state.BuildingName = payload;
        // state.layerName = payload.layerName;
    }
}
export default {
    state,
    mutations,
    getters
}