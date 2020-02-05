import axios from 'axios';
import { getData } from '../utils/storage';

const service = axios.create({
  baseURL: 'http://192.168.0.103:3000/api',
  timeout: 30 * 1000,
  headers: {
    'Authorization': getData('Authorization')
  }
});

export default service;
