/*
 * @description:
 * @author: wangxiaoer
 * @Date:  2021-04-25 09:59:06
 * @LastEditors: wangbin
 * @LastEditTime: 2021-04-26 16:29:51
 * @email: 1980738748@qq.com
 */
import axios, { AxiosRequestConfig } from 'axios';
import AxiosOptions from './options';
import _this from '@/main.ts';

const axiosConfig = new AxiosOptions().getConfig();
// 创建axios实例
let service = axios.create(axiosConfig);
// request 拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.baseURL = _this.$store.state.user.baseUrl;
    return config;
  },
  (error: any) => {
    // Do something with request error
    console.error('error:', error); // for debug
    Promise.reject(error);
  },
);
// respone拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * code:0,接口正常返回;
     */
    const res = response.data;
    return response.data;
    // if (res.code !== 200) {
    //   _this.$message.warning(res.message);
    //   return Promise.reject('error');
    // } else {
    //   return response.data;
    // }
  },
  (error) => {
    _this.$message.error(error.message);
    return Promise.reject(error);
  },
);

export default service;
