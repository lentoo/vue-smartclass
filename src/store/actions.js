export default {
    classFilter:({
        commit,
        payload
    })=>{   
        console.log(payload);
        commit('classFilter')
    }
}