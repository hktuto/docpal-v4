import {defineNuxtPlugin, useAuth, useKeyCloakState} from '#imports'
import Keycloak from 'keycloak-js'
export default defineNuxtPlugin(async (nuxtApp) => {
    const keyCloakState = useKeyCloakState()
    const { fetch, loggedIn } = useAuth()
    nuxtApp.hook('app:mounted', async() => {
        // check session storage 
        const storageToken = sessionStorage.getItem('keycloakConfig')
        console.log('is login', loggedIn.value)
        if(storageToken) {
            console.log('set config from session storage')
            const config = JSON.parse(storageToken)
            keyCloakState.value = new Keycloak({
                "url": config.keyCloakProperty.url,
                "realm": config.keyCloakProperty.realm, // ldap: docpal_third_party
                "clientId": config.keyCloakProperty.clientId,
                // @ts-ignore
                "ssl-required": config.keyCloakProperty.sslRequired,
                "public-client": config.keyCloakProperty.publicClient,
                "confidential-port": config.keyCloakProperty.confidentialPort
            })
            await fetch()
            return
        }
        await $fetch('/api/docpal/relation/getKeyCloakProperty', {
            method:'GET',
        }).then( async(res:any) => {
            if(res.code !== 200){
                throw new Error("getKeyCloakProperty fail")
            }
            const config = res.data

            keyCloakState.value = new Keycloak({
                "url": config.keyCloakProperty.url,
                "realm": config.keyCloakProperty.realm, // ldap: docpal_third_party
                "clientId": config.keyCloakProperty.clientId,
                // @ts-ignore
                "ssl-required": config.keyCloakProperty.sslRequired,
                "public-client": config.keyCloakProperty.publicClient,
                "confidential-port": config.keyCloakProperty.confidentialPort
            })
            await fetch()
            sessionStorage.setItem('keycloakConfig', JSON.stringify(config))
        }).catch(err => {
            throw new Error("getKeyCloakProperty fail")
        }) 
        // await useAuth().fetch()
    })

})