import http from './index'

export const productsAPI = (data) => http.get(`api/products`, data);
export const productsPaginationAPI = (data) => http.get(`api/products/paginate`, data);
