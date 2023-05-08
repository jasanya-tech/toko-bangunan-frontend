import axios from 'axios';
import { token } from '../utils/localstorage';

export const getProduct = async () => {
  let header = new Headers();
  header.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  header.append('Access-Control-Allow-Credentials', 'true');

  axios.defaults.headers.common['Authorization'] = token;
  alert(token);
  token = 'rama';
  alert(token);
  return axios.get('http://localhost:8080/api/product');
};
