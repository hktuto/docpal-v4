
import {Client} from './generate/client'
import {Admin} from './generate/admin'



let clientBaseURL;
let adminBaseURL;
if(process.env && process.env.NODE_ENV === "development") {
    clientBaseURL = '/';
    adminBaseURL = '/'
}

export const clientApi = new Client({
    baseURL:clientBaseURL,
})

export const adminApi = new Admin({
    baseURL:adminBaseURL
})
// if node env mode is dev set proxy

clientApi.instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
    },
    error => Promise.reject(error)
  );
clientApi.instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        console.log('fetch error', error)
        if(error.response.status >= 500) {
          return Promise.reject(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
      
          try {
            // 使用 refresh token 获取新的 access token
            const refreshToken = localStorage.getItem('refresh_token');
            const refreshResponse:any = await fetch('/client/api/auth/nuxeo/token', {
                method:"POST",
                headers:{
                    Authorization: 'Bearer ' + refreshToken
                }
            }).then( res => res.json)
            console.log("refresh token response", refreshResponse)
            localStorage.setItem('access_token', refreshResponse.data.access_token);
            localStorage.setItem('refresh_token', refreshResponse.data.refresh_token);
      
            // 重新设置请求头中的 access token 并重试请求
            originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access_token}`;
            return clientApi.instance(originalRequest);
          } catch (refreshError:any) {
            // 如果 refresh token 也过期了，则清除所有存储的 token，并导航到登录页面
            if (refreshError.response.status === 401) {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }
      
        return Promise.reject(error);
      }
)



adminApi.instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
    },
    error => Promise.reject(error)
)

adminApi.instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        console.log('fetch error', error)
        if(error.response.status >= 500) {
          return Promise.reject(error);
        }
        console.log('retry', error.response.status, originalRequest._retry)
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
      
          try {
            // 使用 refresh token 获取新的 access token
            const refreshToken = localStorage.getItem('refresh_token');
            const { data } = await fetch('/client/api/auth/nuxeo/token', {
                method:"POST",
                headers:{
                    Authorization: 'Bearer ' + refreshToken
                }
            }).then( res => res.json())
            console.log('retry', data)
            console.log("refresh token response", data)
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
      
            // 重新设置请求头中的 access token 并重试请求
            originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
            return clientApi.instance(originalRequest);
          } catch (refreshError:any) {
            // 如果 refresh token 也过期了，则清除所有存储的 token，并导航到登录页面
            if (refreshError.response.status === 401) {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          }
        }
      
        return Promise.reject(error);
      }
)


 