import Vue from 'vue';
import axios from 'axios';
import * as inter from './interceptors'

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Accept': 'application/json, text/plain, */*',
    },
});

export const CancelToken = http.CancelToken;
export const isCancel = http.isCancel;

http.interceptors.request.use(inter.appendHeader);
http.interceptors.response.use(inter.handleSuccess, inter.handleError);

Vue.prototype.$http = http;

export default http
