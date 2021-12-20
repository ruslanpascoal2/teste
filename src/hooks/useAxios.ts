import Axios, { AxiosRequestConfig } from 'axios';
import { authManager } from '../services/authManager';

function createAxiosInstance() {
  const axios = Axios.create({
    baseURL: 'https://iate-app-backend.azurewebsites.net/api-iateclube/',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Access-Control-Expose-Headers': 'Authorization',
      'Access-Control-Allow-Origin': '*',
    },
    timeout: 30000,
  });

  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = authManager.get();
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(response => {
    return response;
  },
  (err) => {
    if(err?.response?.status === 403){
      authManager.clear();
      window.location.reload();
  }
    
    return Promise.reject(err);
  });

  return axios;
}

export default function useAxios() {
  return createAxiosInstance();
}

export function getAxios() {
  return createAxiosInstance();
}
