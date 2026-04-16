import { get, post } from './axios.js';
import { API_ENDPOINTS } from '../utils/constants.js';

// Auth APIs
export const authAPI = {
  register: (data) => post(API_ENDPOINTS.AUTH.REGISTER, data),
  login: (data) => post(API_ENDPOINTS.AUTH.LOGIN, data),
  logout: () => post(API_ENDPOINTS.AUTH.LOGOUT),
  getMe: () => get(API_ENDPOINTS.AUTH.ME),
};

// Product APIs
export const productAPI = {
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return get(`${API_ENDPOINTS.PRODUCTS.LIST}?${queryString}`);
  },
  getProduct: (id) => get(API_ENDPOINTS.PRODUCTS.DETAIL(id)),
  getCategories: () => get(API_ENDPOINTS.PRODUCTS.CATEGORIES),
};