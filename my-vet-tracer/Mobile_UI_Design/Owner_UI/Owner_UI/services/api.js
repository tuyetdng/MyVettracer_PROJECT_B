import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:8080/myvettracer';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('loginToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('loginToken');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (userName, password) => {
    try {
      const response = await api.post('/auth/token', {  userName, password });
      if (response.data.result && response.data.result.token) {
        const token = response.data.result.token;

        await AsyncStorage.setItem('loginToken', token);
      }
      return response.data.result;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },
  logout: async () => {
    try {
      await AsyncStorage.removeItem('loginToken');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
};

export const servicesAPI = {
  getAll: async () => {
    const response = await api.get('/services');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },
  create: async (serviceData) => {
    const response = await api.post('/services', serviceData);
    return response.data;
  },
  update: async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};

export const customersAPI = {
  getAll: async () => {
    const response = await api.get('/customers');
    return response.data;
  },
  create: async (customerData) => {
    const response = await api.post('/customers', customerData);
    return response.data;
  },
};

export const transactionsAPI = {
  getAll: async () => {
    const response = await api.get('/transactions');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },
};
