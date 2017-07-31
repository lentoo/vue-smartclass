export default {
    classFilter: ({
        commit,
        payload
    }) => {
        commit('classFilter')
    },
    collegeName: ({
        commit,
        payload
    }) => {
        commit('BuildingName')
    },
    layerName: ({
        commit,
        payload
    }) => {
        commit('layerName')
    },
    flashName: ({
        commit, payload
    }) => {
        commit('flashName')
    }
}