import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const register = (email, full_name, password) => {
  return axios.post(API_URL + 'users/register/', {
    email,
    full_name,
    password
  });
};

export const login = (email, password) => {
  return axios.post(API_URL + 'users/login/', {  // Use the custom login view
    email,
    password
  });
};

export const verifyOTP = (otp_token) => {
  const accessToken = localStorage.getItem('access');
  return axios.post(API_URL + 'users/totp/verify/', {
    otp_token
  }, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

export const setupMFA = () => {
  const accessToken = localStorage.getItem('access');
  return axios.get(API_URL + 'users/totp/setup/', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};


export const logout = (refreshToken) => {
  return axios.post(API_URL + 'users/logout/', {
    refresh: refreshToken
  });
};

export const getCurrentUser = () => {
  const accessToken = localStorage.getItem('access');
  return axios.get(API_URL + 'me/', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};
