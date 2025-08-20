import { Client } from './generate/client'
import { Admin } from './generate/admin'
import { Public } from './generate/public'
import { Template } from './generate/template'
import { ElMessage } from 'element-plus'
// import {logout} from '~/utils/auth'

let clientBaseURL = '/api'
let adminBaseURL = '/adminApi/api'
let publicBaseURL = '/public-api/report/v1/api'
let templateBaseURL = '/open-api/template'

export const clientApi = new Client({
  baseURL: clientBaseURL,
  timeout: 50000
})


export const adminApi = new Admin({
  baseURL: adminBaseURL,
  timeout: 50000
})

export const publicApi = new Public({
  baseURL: publicBaseURL,
  timeout: 50000
})


export const templateApi = new Template({
  baseURL: templateBaseURL,
  timeout: 50000
})
export const globalApi = window.location.pathname.includes('admin') ? adminApi : clientApi
// if node env mode is dev set proxy
