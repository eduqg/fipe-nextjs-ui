import axios from 'axios';

const api = axios.create({
  baseURL: process.env.FIPE_BASE_URL,
});

export default api;
