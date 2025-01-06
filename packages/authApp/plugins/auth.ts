import {defineNuxtPlugin, useAuth, useKeyCloakState} from '#imports'
import {clientApi} from 'api'
import Keycloak from 'keycloak-js'

export default defineNuxtPlugin(async (nuxtApp) => {
    const keyCloakState = useKeyCloakState()
    const isSSO = useIsSSO()
    const isLDAP = useIsLDAP()
    nuxtApp.hook('app:created', async() => {
        const {data} = await clientApi.api.getRelationGetkeycloakproperty()
        keyCloakState.value = new Keycloak({
            "url": data?.keyCloakProperty?.url,
            "realm": data?.keyCloakProperty?.realm || "", // ldap: docpal_third_party
            "clientId": data?.keyCloakProperty?.clientId || "",
            // @ts-ignore
            "ssl-required": data?.keyCloakProperty.sslRequired || "",
            "public-client": data?.keyCloakProperty?.publicClient || "",
            "confidential-port": data?.keyCloakProperty?.confidentialPort || ""
        })
        isSSO.value = !!data?.keyCloakProperty?.enableSSO
        isLDAP.value = !!data?.isLdap
    })

    nuxtApp.hook('app:mounted', async() => {
        await useAuth().login()
    })

})