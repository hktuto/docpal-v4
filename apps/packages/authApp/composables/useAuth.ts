
import {useState} from '#imports'
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
        
        const {data:{code, data}} = await clientApi.api.getKeyCloakProperty()
        if(code !== 200) {
            throw new Error('can not get keycloak property')
        }
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