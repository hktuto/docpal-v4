
import {clientApi, adminApi, publicApi} from 'api'
import {ElMessage} from "element-plus";

function handleApiErrot(error:any) {
    if(error.response.status >= 500) {
        const message = error.response.data.message || error.message
        ElMessage.error(message)
        return Promise.reject(error)
    }
}


export default defineNuxtPlugin(async (nuxtApp) => {

    publicApi.instance.interceptors.response.use(
        (config) => config,
        (error) => handleApiErrot(error)
    )

    adminApi.instance.interceptors.response.use(
        (config) => config,
        (error) => handleApiErrot(error)
    )

    clientApi.instance.interceptors.response.use(
        (config) => config,
        (error) => handleApiErrot(error)
    )

})