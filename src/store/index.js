import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import auth from './auth';
import products from "./products";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        products,
    },
    plugins: [
        createPersistedState({
            paths: ['auth'],
        })
    ]
})
