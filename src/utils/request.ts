import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { ApiResponse } from '@/types/common';

// 创建axios实例
const instance: AxiosInstance = axios.create({
  baseURL: '/api', // 基础URL，会通过Vite代理转发
  timeout: 10000, // 请求超时时间10秒
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等认证信息
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    console.log('发送请求:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    console.log('响应数据:', response.config.url, response.data);
    
    // 统一处理API响应格式
    if (response.data && typeof response.data === 'object') {
      if (response.data.success === false) {
        throw new Error(response.data.message || '请求失败');
      }
    }
    
    return response;
  },
  (error) => {
    console.error('响应错误:', error);
    
    // 统一错误处理
    let message = '网络请求失败';
    
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response;
      switch (status) {
        case 400:
          message = data?.message || '请求参数错误';
          break;
        case 401:
          message = '未授权，请重新登录';
          break;
        case 403:
          message = '禁止访问';
          break;
        case 404:
          message = '请求的资源不存在';
          break;
        case 500:
          message = '服务器内部错误';
          break;
        default:
          message = data?.message || `请求失败 (${status})`;
      }
    } else if (error.request) {
      // 请求发出但没有收到响应
      message = '网络连接失败，请检查网络';
    } else {
      // 请求配置错误
      message = error.message || '请求配置错误';
    }
    
    return Promise.reject(new Error(message));
  }
);

// 封装常用请求方法
export const request = {
  // GET请求
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.get(url, config).then(response => response.data);
  },
  
  // POST请求
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.post(url, data, config).then(response => response.data);
  },
  
  // PUT请求
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.put(url, data, config).then(response => response.data);
  },
  
  // DELETE请求
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return instance.delete(url, config).then(response => response.data);
  }
};

export default instance;