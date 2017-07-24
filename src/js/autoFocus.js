import Vue from 'vue'
var focus = {}
focus.install = function () {
    Vue.directive('focus', function (el, binding) {
        var aLink = el.getAttribute('path')
        var server = binding.value.server;
        el.className = 'el-menu-item'
        if (server === aLink) {
            el.className = el.className + ' is-active';
        }
    })
}
export default focus