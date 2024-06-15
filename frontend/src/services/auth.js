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

// Coin Functions
export const createCoin = (coinData) => {
  const accessToken = localStorage.getItem('access');
  return axios.post(API_URL + 'coins/create/', coinData, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

export const getCoin = (id) => {
  const accessToken = localStorage.getItem('access');
  return axios.get(API_URL + `coins/${id}/`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

export const listCoins = () => {
  const accessToken = localStorage.getItem('access');
  return axios.get(API_URL + 'coins/', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

export const deleteCoin = (id) => {
  const accessToken = localStorage.getItem('access');
  return axios.delete(API_URL + `coins/${id}/delete/`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

// Wallet Functions
export const createWallet = () => {
  const accessToken = localStorage.getItem('access');
  return axios.post(API_URL + 'wallets/create/', {}, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

export const getWallet = () => {
  const accessToken = localStorage.getItem('access');
  return axios.get(API_URL + 'wallets/detail/', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

export const updateWallet = (walletData) => {
  const accessToken = localStorage.getItem('access');
  return axios.put(API_URL + 'wallets/detail/update/', walletData, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

export const listWallets = () => {
  const accessToken = localStorage.getItem('access');
  return axios.get(API_URL + 'wallets/', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

// Transaction Functions
export const createTransaction = (transactionData) => {
  const accessToken = localStorage.getItem('access');
  return axios.post(API_URL + 'transactions/create/', transactionData, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

export const getTransaction = (id) => {
  const accessToken = localStorage.getItem('access');
  return axios.get(API_URL + `transactions/${id}/`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

export const listTransactions = () => {
  const accessToken = localStorage.getItem('access');
  return axios.get(API_URL + 'transactions/', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

