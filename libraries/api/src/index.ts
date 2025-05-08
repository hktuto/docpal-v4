
import {Client} from './generate/client'
import {Admin} from './generate/admin'
import {Public} from './generate/public'
// import {logout} from '~/utils/auth'


let clientBaseURL = '/api';
let adminBaseURL = '/api';
let publicBaseURL = '/public-api/report/v1/api'



export const clientApi = new Client({
    baseURL:clientBaseURL,
    timeout: 30000,
})

export const adminApi = new Admin({
    baseURL:adminBaseURL,
    timeout: 30000,
})

export const publicApi = new Public({
    baseURL:publicBaseURL,
    timeout: 30000,
})
// if node env mode is dev set proxy


 