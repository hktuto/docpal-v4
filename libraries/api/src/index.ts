
import {Client} from './generate/client'
import {Admin} from './generate/admin'
import {Public} from './generate/public'
// import {logout} from '~/utils/auth'


let clientBaseURL = '/api';
let adminBaseURL = '/api';
let publicBaseURL = '/public-api/report/v1/api'
if(process.env && process.env.NODE_ENV !== "development") {
    clientBaseURL = '/api';
    adminBaseURL = '/api'
    publicBaseURL = process.env.DASHBOARD_PROXY
}

console.log("publicBaseURL", publicBaseURL)

export const clientApi = new Client({
    baseURL:clientBaseURL,
})

export const adminApi = new Admin({
    baseURL:adminBaseURL
})

export const publicApi = new Public({
    baseURL:publicBaseURL
})
// if node env mode is dev set proxy


 