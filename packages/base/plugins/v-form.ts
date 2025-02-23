
// @ts-ignore
import VForm3 from 'v-form' 
import 'v-form/dist/designer.style.css' 
import {clientApi } from 'api'
import dayjs from 'dayjs'
// @ts-ignore
export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp
    nuxtApp.vueApp.use(VForm3);
    if(window){
        // @ts-ignore
        window.$api = clientApi.instance;

        // @ts-ignore
        window.$i18n = nuxtApp.$i18n

        // @ts-ignore
        window.$formatDate = (date:string) => {
            return dayjs(date).format('YYYY-MM-DD')
        }
        // @ts-ignore
        window.$t = nuxtApp.$i18n.t
        // @ts-ignore
        window.$getCookie = (name) => {
            const cookie = useCookie(name)
            return cookie.value || {}
        }
    }
})

