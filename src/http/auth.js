import axios from "axios";

export const API_AUTH_URL = 'https://miraplay-test-server-6yrb.onrender.com/api';

const $apiAuth = axios.create({
  withCredentials: true,
  baseURL: API_AUTH_URL,
});

$apiAuth.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $apiAuth;
