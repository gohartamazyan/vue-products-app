import {
    productsPaginationAPI,
} from '../../http/ProductsService';

export default {
    state: {
        products: [],
    },
    getters: {
        products: state => state.products,
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload
        },
    },
    actions: {
        getProducts({commit}, params) {
            return productsPaginationAPI({
                params: {
                    page: params.currentPage,
                    per_page: params.per_page,
                }
            })
                .then(({data}) => {
                    commit('setProducts', data.data)
                    return data;
                })
        },
    },
    namespaced: true,
}
