
import {useState} from '#imports'
import Keycloak from 'keycloak-js'

import type { User } from '../types/user'

const useAuthReadyState = () => useState('auth-ready', () => false)
const useUserState = () => useState<User | null>('auth-user');
export const useKeyCloakState = () => useState<Keycloak |null>('keycloak-state')
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
    const authenticated = await keyCloakState.value.init({
        onLoad:'login-required'
    })
    console.log("authenticated", authenticated)
    authReadyState.value = true;
}
export function logout() {

}