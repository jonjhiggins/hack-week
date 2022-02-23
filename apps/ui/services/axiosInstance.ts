import axios from 'axios';
import Qs from 'qs';

import { getBearerToken } from './fictioneersApiAuth';

const axiosInstance = axios.create({
  paramsSerializer: (params) => Qs.stringify(params, {
    arrayFormat: 'repeat',
  }),
});

axiosInstance.interceptors.request.use(async function (config) {
  const token = await getBearerToken();
  config.headers = {
    'Authorization': `Bearer ${token}`,
  };
  return config;
});

export { axiosInstance };
