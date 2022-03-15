import http from './index'

export const loginAPI = (data) => http.post(`api/login`, data);
export const registerAPI = (data) => http.post(`api/register`, data);
