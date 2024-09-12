
import {useState} from '#imports'
import Keycloak from 'keycloak-js'

import type { User } from '../types/user'

const useAuthReadyState = () => useState('auth-ready', () => false)
const useUserState = () => useState<User | null>('auth-user');
const useKeyCloakState = () => useState<Keycloak |null>('keycloak-state')
export const usePublicPageState = () => useState<string[]>('auth-public-page', () => ([]))

export const useAuth = () => {
    const authReadyState = useAuthReadyState()
    const userState = useUserState()

    return {
        loggedIn: computed(() => Boolean(userState.value)),
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
    const route = useRoute()
    if(publicPageState.value.includes(route.path)){
        console.log('public page')
        authReadyState.value = true;
        userState.value = null;
        return;
    }
    if(!keyCloakState.value) {
        // setup
        const runtimeConfig = useRuntimeConfig()

        keyCloakState.value = new Keycloak({
            "url": runtimeConfig.public.keycloakPublicUrl,
            "realm": runtimeConfig.public.keycloakRealm, // ldap: docpal_third_party
            "clientId": runtimeConfig.public.keycloakClientId,
            // @ts-ignore
            "ssl-required": runtimeConfig.public.keycloakSSLRequired,
            "public-client": runtimeConfig.public.keycloakPublicClient,
            "confidential-port": runtimeConfig.public.keyCloakConfidentialPort
        })
    }
    const authenticated = await keyCloakState.value.init({
        onLoad:'login-required'
    })
    console.log("authenticated", authenticated)
    authReadyState.value = true;
}
export function logout() {

}