
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


 