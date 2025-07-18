import { Client } from './generate/client'
import { Admin } from './generate/admin'
import { Public } from './generate/public'
import { Template } from './generate/template'
import { ElMessage } from 'element-plus'
// import {logout} from '~/utils/auth'

let clientBaseURL = '/api'
let adminBaseURL = '/api'
let publicBaseURL = '/public-api/report/v1/api'
let templateBaseURL = '/open-api/template'

export const clientApi = new Client({
  baseURL: clientBaseURL,
  timeout: 50000
})
export const safeClientAPI = new Proxy(clientApi.api, {
  get(target, prop: string) {
    if (typeof target[prop] === 'function') {
      return target[prop]
    }
    ElMessage.error(`API method '${prop}' not implemented. `)
    return () => {
      throw new Error(`API method '${prop}' not implemented. ` + `Check code generation or backend swagger spec.`)
    }
  }
})

export const adminApi = new Admin({
  baseURL: adminBaseURL,
  timeout: 50000
})
export const safeAdminAPI = new Proxy(adminApi.api, {
  get(target, prop: string) {
    if (typeof target[prop] === 'function') {
      return target[prop]
    }
    ElMessage.error(`API method '${prop}' not implemented. `)
    return () => {
      throw new Error(`API method '${prop}' not implemented. ` + `Check code generation or backend swagger spec.`)
    }
  }
})
export const publicApi = new Public({
  baseURL: publicBaseURL,
  timeout: 50000
})
export const safePublicAPI = new Proxy(publicApi.api, {
  get(target, prop: string) {
    if (typeof target[prop] === 'function') {
      return target[prop]
    }
    ElMessage.error(`API method '${prop}' not implemented. `)
    return () => {
      throw new Error(`API method '${prop}' not implemented. ` + `Check code generation or backend swagger spec.`)
    }
  }
})

export const templateApi = new Template({
  baseURL: templateBaseURL,
  timeout: 50000
})

// if node env mode is dev set proxy
