import {Client} from './generate/client'
import {Admin} from './generate/admin'

export const clientApi = new Client({
    baseURL:"/client/"
})

export const adminApi = new Admin({
    baseURL:"/admin/"
})

 