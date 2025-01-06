
import {Client} from './generate/client'
import {Admin} from './generate/admin'
// import {logout} from '~/utils/auth'


let clientBaseURL = '/';
let adminBaseURL = '/';
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

// clientApi.instance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('access_token');
//           if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//           }
//           return config;
//     },
//     error => Promise.reject(error)
//   );
// clientApi.instance.interceptors.response.use(
//   response => {
//     console.log("response", response)
//     // if request contenttype not match with response contenttype, throw error
//     return response
//   },
//     async error => {
//         const originalRequest = error.config;
//         console.log('fetch error', error)
//         if(error.response.status >= 500) {
//           return Promise.reject(error);
//         }
//         console.log("error", error.response)
//         if (error.response.status === 401 && !originalRequest._retry) {
//           originalRequest._retry = true;
      
//           try {
//             // 使用 refresh token 获取新的 access token
//             const refreshToken = localStorage.getItem('refresh_token');
//             localStorage.setItem("access_token", refreshToken as string);

//             const { data } = await clientApi.instance.post('/api/auth/nuxeo/token',{}, {
//               headers:{
//                   Authorization: 'Bearer ' + refreshToken
//               }
//           })
//             localStorage.setItem('access_token', data.data.access_token);
//             localStorage.setItem('refresh_token', data.data.refresh_token);
      
//             return clientApi.instance(originalRequest);
//           } catch (refreshError:any) {
//             console.log(refreshError)
//             // 如果 refresh token 也过期了，则清除所有存储的 token，并导航到登录页面
//             if (refreshError.response.status === 401) {
//               localStorage.removeItem('access_token');
//               localStorage.removeItem('refresh_token');
//               window.location.href = '/login';
//             }
//             return Promise.reject(refreshError);
//           }
//         }
      
//         return Promise.reject(error);
//       }
// )



// adminApi.instance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('access_token');
//           if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//           }
//           return config;
//     },
//     error => Promise.reject(error)
// )

// adminApi.instance.interceptors.response.use(
//     response => {
//       console.log("response", response)
//       // if request contenttype not match with response contenttype, throw error
//       return response
//     },
//     async error => {
//         const originalRequest = error.config;
//         console.log('fetch error', error)
//         const instance = error.config.axiosInstance;
//         if(error.response.status >= 500) {
//           return Promise.reject(error);
//         }
//         console.log('retry', error.response.status, originalRequest._retry)
//         if (error.response.status === 401 && !originalRequest._retry) {
//           originalRequest._retry = true;
      
//           try {
//             // 使用 refresh token 获取新的 access token
//             const refreshToken = localStorage.getItem('refresh_token');
//             localStorage.setItem("access_token", refreshToken as string);

//             console.log("refresh token", refreshToken)
//             const { data } = await adminApi.instance.post('/api/auth/nuxeo/token',{}, {
//                 headers:{
//                     Authorization: 'Bearer ' + refreshToken
//                 }
//             })
//             console.log('retry', data)
//             console.log("refresh token response", data)
            
//             localStorage.setItem('access_token', data.data.access_token);
//             localStorage.setItem('refresh_token', data.data.refresh_token);
//             return adminApi.instance(originalRequest);
//           } catch (refreshError:any) {
//             console.log("refresh error", refreshError)
//             // 如果 refresh token 也过期了，则清除所有存储的 token，并导航到登录页面
//             if (refreshError.response.status === 403) {
//               localStorage.removeItem('access_token');
//               localStorage.removeItem('refresh_token');
//               logout()
//             }

//             return Promise.reject(refreshError);
//           }
//         }
      
//         return Promise.reject(error);
//       }
// )


 