
import {useState} from '#imports'
import Keycloak from 'keycloak-js'

import type { User } from '../types/user'

export const useAuthReadyState = () => useState('auth-ready', () => false)
const useUserState = () => useState<User | null>('auth-user');
const useKeyCloakState = () => useState<Keycloak |null>('keycloak-state')
export const usePublicPageState = () => useState<string[]>('auth-public-page', () => ([]))
export const useLoginHook = () => useState<any>(() => shallowRef([]));
export const useIsSSO = () => useState<boolean>(() => false);
export const useIsLDAP = () => useState<boolean>(() => false);


export const useAuth = () => {
    const authReadyState = useAuthReadyState()
    const userState = useUserState()
    const loggedIn = computed(() => Boolean(userState.value))

    return {
        loggedIn ,
        logout,
        fetch,
        ready : computed(() => authReadyState.value)
    }
}

export async function fetch() {
    const authReadyState = useAuthReadyState()
    const keyCloakState = useKeyCloakState()
    const publicPageState = usePublicPageState()
    const userState = useUserState()
    const isSSO = useIsSSO()
    const isLDAP = useIsLDAP()
    const route = useRoute()
    if(publicPageState.value.includes(route.path)){
        console.log('public page')
        authReadyState.value = true;
        userState.value = null;
        return;
    }
    if(!keyCloakState.value) {
        const config = await $fetch('/api/docpal/relation/getKeyCloakProperty').then( (res:any) => res.data)
        keyCloakState.value = new Keycloak({
            "url": config.keyCloakProperty.url,
            "realm": config.keyCloakProperty.realm, // ldap: docpal_third_party
            "clientId": config.keyCloakProperty.clientId,
            // @ts-ignore
            "ssl-required": config.keyCloakProperty.sslRequired,
            "public-client": config.keyCloakProperty.publicClient,
            "confidential-port": config.keyCloakProperty.confidentialPort
        })
        isSSO.value = !!config?.keyCloakProperty?.enableSSO
        isLDAP.value = !!config.isLdap
    }
    const authenticated = await keyCloakState.value.init({
        onLoad:'login-required'
    })
    console.log("authenticated", authenticated)
    userState.value = {
        username: "username",
        userId: "username"
    }
}
export function logout() {

}