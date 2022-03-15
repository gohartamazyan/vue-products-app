import {
    loginAPI,
    registerAPI
} from '../../http/AuthService';

export default {
    state: {
        accessToken: null,
    },
    getters: {
        loggedIn: state => !!state.accessToken,
    },
    mutations: {
        setToken(state, token) {
            state.accessToken = token
        },
    },
    actions: {
        login({commit}, payload) {
            return loginAPI(payload).then(({data}) => {
                commit('setToken', data.accessToken)
            })
        },

        register({commit}, payload) {
            return registerAPI(payload).then(({data}) => {
                commit('setToken', data.accessToken)
            })
        },
    },
    namespaced: true,
}
