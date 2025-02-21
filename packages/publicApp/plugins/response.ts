import {defineNuxtPlugin} from '#imports'
import {clientApi, adminApi, publicApi} from 'api'
import {requestSuccessHelper, requestErrorHelper, responseSuccessHelper, responseErrorHelper} from '../utils/axiosResponseHelper'

export default defineNuxtPlugin(async () => {
    // set refresh token to clientApi and adminApi
    publicApi.instance.interceptors.request.use(
        (config) => requestSuccessHelper(config, publicApi.instance),
        (error) => requestErrorHelper(error, publicApi.instance)
    )
    publicApi.instance.interceptors.response.use(
        (config) => responseSuccessHelper(config, publicApi.instance),
        (error) => responseErrorHelper(error, publicApi.instance)
    )
    clientApi.instance.interceptors.request.use(
        (config) => requestSuccessHelper(config, clientApi.instance),
        (error) => requestErrorHelper(error, clientApi.instance)
    )
    clientApi.instance.interceptors.response.use(
        (config) => responseSuccessHelper(config, clientApi.instance),
        (error) => responseErrorHelper(error, clientApi.instance)
    )
    adminApi.instance.interceptors.request.use(
        (config) => requestSuccessHelper(config, adminApi.instance),
        (error) => requestErrorHelper(error, adminApi.instance)
    )
    adminApi.instance.interceptors.response.use(
        (config) => responseSuccessHelper(config, adminApi.instance),
        (error) => responseErrorHelper(error, adminApi.instance)
    )
})
