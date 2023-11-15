import axios from 'axios';
import { queueCall, useQueue } from './queue';

const http = axios.create({})



http.interceptors.response.use(response => {
  const config:any = response.config;
  queueCall(config.queueHash)
  return response;
},err => {
  console.log('err->',err)
  const config:any = err.config;
  queueCall(config.queueHash);
})

export function request(option:any) {
  return useQueue(http,option);
}