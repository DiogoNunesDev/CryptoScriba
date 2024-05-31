import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users/';

export const register = (email, full_name, password) => {
  return axios.post(API_URL + 'register/', {
    email,
    full_name,
    password
  });
};

export const login = (email, password) => {
  return axios.post(API_URL + 'login/', {
    email,
    password
  });
};

export const logout = (refreshToken) => {
  return axios.post(API_URL + 'logout/', {
    refresh: refreshToken
  });
};

export const getCurrentUser = (token) => {
  return axios.get(API_URL + 'me/', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
