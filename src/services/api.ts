import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'clinic-token': token } = parseCookies();

export const api = axios.create({
  // baseURL: 'http://localhost:3333', // Local
  baseURL: 'https://clinicaapi.herokuapp.com', // Produção
});

if (token) {
  api.defaults.headers['Authorization'] = token;
}

