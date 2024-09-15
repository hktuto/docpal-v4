
import {useState, createError} from '#imports'
import Keycloak from 'keycloak-js'
import {clientApi} from 'api'



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

    return {
        loggedIn :computed(() => Boolean(userState.value)),
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
        const {data} = await clientApi.api.getKeyCloakProperty()
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
    }
    await keyCloakState.value.init({
        onLoad:'login-required'
    })
    keyCloakState.value.updateToken(10)
    localStorage.setItem('access_token', keyCloakState.value.token || "");
    const {data} = await clientApi.api.verifyKeycloakToken()
    if(!data){
        throw new Error('token not valid')
    }
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)
    userState.value = {
        username: "username",
        userId: "username"
    }
}
export function logout() {
    const keyCloakState = useKeyCloakState()

    const userState = useUserState()
    keyCloakState.value?.logout()
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    userState.value = null;
}