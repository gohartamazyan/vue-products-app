import Vue from 'vue'
import VueRouter from 'vue-router';
import store from '../store';
import Login from '../views/Login';
import Register from '../views/Register';
import Products from '../views/Products';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'exact-active',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                public: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                public: true
            }
        },
        {
            path: '/',
            name: 'products',
            component: Products,
            meta: {
                auth: true
            }
        },
        {
            path: '*',
            redirect: '/'
        },
    ]
});

router.beforeEach((to, from, next) => {
    let isLoggedIn = store.getters['auth/loggedIn'];

    if (to.matched.some(record => record.meta.auth)) {
        if (!isLoggedIn) {
            next({
                name: 'login',
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.public) && isLoggedIn)
        next('/');
    else
        next()
});

export default router;
