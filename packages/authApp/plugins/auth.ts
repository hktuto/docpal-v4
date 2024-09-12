import {defineNuxtPlugin, useAuth} from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {

    nuxtApp.hook('app:mounted', async() => {
        await useAuth().fetch()
    })

})