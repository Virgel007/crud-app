import axios from 'axios';
import { apiConfig } from '../config/config';

const api = axios.create(apiConfig);

export default api;