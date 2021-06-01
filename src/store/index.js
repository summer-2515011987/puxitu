
import Vue from 'vue'
import Vuex from 'vuex'
import user from './moudles/user'
// import app from './moudles/app'
import serMenuPermission from './moudles/serMenuPermission'
import getters from './getters'

// 使用Vuex
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        // app,
        user,
        serMenuPermission
    },
    getters
})

export default store

