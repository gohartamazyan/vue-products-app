import store from '../src/store';
import router from '../src/router';
import { notify } from '../src/plugins/toast';

export const handleSuccess = res => res;

export const handleError = e => {
    if (!e.response || !e.response.status)
        return Promise.reject(e);

    let errors = {};

    switch (e.response.status) {
        case 401:
            if (e.response.data.message === 'Unauthenticated.') {
                router.push({ name: 'login' });
                notify.error('Session expired.');
            } else {
                notify.error(e.response.data.message)
            }
            break;
        case 422:
            errors = {};
            Object.keys(e.response.data.errors).forEach(key => {
                errors[key] = e.response.data.errors[key]
            });

            return Promise.reject({
                status: 422,
                data: errors
            });
        default:
            notify.error('Something went wrong.')
    }

    return Promise.reject(e)
};

export const appendHeader = (config) => {
    let accessToken = store.state.auth.accessToken;
    if (accessToken)
        config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config
};
