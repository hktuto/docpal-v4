import { typeAxiosInstance } from 'axios';

import { useEventBus, EventType, emitBus } from 'eventbus';

export const requestSuccessHelper = (config:any, axiosInstance:typeAxiosInstance) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
}
export const requestErrorHelper = (error:any, axiosInstance:typeAxiosInstance) => {
    return Promise.reject(error)
}

export const responseSuccessHelper = (response:any, axiosInstance:typeAxiosInstance) => {
    return response
}
export const responseErrorHelper = async(error:any, axiosInstance:typeAxiosInstance) => {
    const originalRequest = error.config;
    console.log('fetch error', error)
    if(error.response.status >= 500) {
      return Promise.reject(error);
    }
    console.log("error", error, this)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
  
      try {
        // 使用 refresh token 获取新的 access token
        const refreshToken = localStorage.getItem('refresh_token');
        localStorage.setItem("access_token", refreshToken as string);

        console.log("refresh token", refreshToken)
        const { data } = await axiosInstance.post('/api/auth/nuxeo/token',{}, {
            headers:{
                Authorization: 'Bearer ' + refreshToken
            }
        })
        console.log('retry', data)
        console.log("refresh token response", data)
        
        localStorage.setItem('access_token', data.data.access_token);
        localStorage.setItem('refresh_token', data.data.refresh_token);
        return axiosInstance(originalRequest);
      } catch (refreshError:any) {
        console.log("refresh error", refreshError)
        // 如果 refresh token 也过期了，则清除所有存储的 token，并导航到登录页面
        if (refreshError.response.status === 403) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          // notify other via event bus
          emitBus(EventType.USER_LOGIN__EXPIRE)
          // TODO : remove logout, should use event bus
          logout()
        }

        return Promise.reject(refreshError);
      }
    }
  
    return Promise.reject(error);
}