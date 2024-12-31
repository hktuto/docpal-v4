

import {useState, createError} from '#imports'

import {clientApi} from 'api'
import type Keycloak from 'keycloak-js'

import type { UserDTO } from 'api/src/generate/client'

export const useAuthReadyState = () => useState('auth-ready', () => false)
export const useUserState = () => useState<UserDTO | null>('auth-user');
export const useKeyCloakState = () => useState<Keycloak |null>('keycloak-state')
export const usePublicPageState = () => useState<string[]>('auth-public-page', () => ([]))
export const useLoginHook = () => useState<any>(() => shallowRef([]));
export const useIsSSO = () => useState<boolean>(() => false);
export const useIsLDAP = () => useState<boolean>(() => false);
export const useUserPreference = () => useState<Record<string,any>>();
export const useFeature = () => useState<Record<string,boolean>>('app-feature');

export const useAuth = () => {
    const authReadyState = useAuthReadyState()
    const userState = useUserState()
    const perference = useUserPreference()


    return {
        loggedIn :computed(() => Boolean(userState.value)),
        logout,
        login,
        ready : computed(() => authReadyState.value)
    }
}


export const userDisplayTimeSetting = () => {
    const userPreference = useUserPreference()
    
    return userPreference.value.metaDateFormat ? userPreference.value.metaDateFormat : 'YYYY-MM-DD'
}

/**
 *  從 keycloak 拿回用戶 token, 放到 localStorage, 
 *  登陸後先  {@link useFeature} 
 *  再  
 */
export async function login() {
    const keyCloakState = useKeyCloakState()

    if(!keyCloakState.value) {
       throw createError('Keycloak is not define') 
    }
    await keyCloakState.value.init({
        onLoad:'login-required'
    })
    keyCloakState.value.updateToken(10)
    localStorage.setItem('access_token', keyCloakState.value.token || "");
    const {data} = await clientApi.systemFeatureController.getKeycloakTokenVerification()
    if(!data){
        throw new Error('token not valid')
    }
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('refresh_token', data.refresh_token)

    await Promise.all([
        getUser(),        
        getFeature(),
        getUserPreference()
    ])
}


export function logout() {
    const keyCloakState = useKeyCloakState()

    const userState = useUserState()
    keyCloakState.value?.logout()
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    userState.value = null;
}

/**
 *  從Backend 拿回當前環境有的 feature, 并存到 `useFeature` 裡
 */
async function getFeature() {
    const features = useFeature()
    const {data} = await clientApi.systemFeatureController.getGetfeatures()
    if(!data) throw new Error('get license feature error')
    features.value = data
}

/**
 * 
 * @param requireFeatures  string | string[] // 單個或多個需要的 Feature
 * @returns boolean 
 */
export function checkLicenseFeatures(requireFeatures: string[] | string) {
    const features = useFeature()
    if (typeof requireFeatures === 'string') return features.value[requireFeatures]
    let result = false
    if (Array.isArray(requireFeatures)) {
        requireFeatures.forEach(item => {
            if (features.value[item]) result = true
        })
    }
    return result
}


const colorModeOption = [
    {
        id: '1',
        value: 'system',
        name: 'System',
    },
    {
        id: '2',
        value: 'light',
        name: 'Light',
    },
    {
        id: '3',
        value: 'dark',
        name: 'Dark',
    },
]
const uiSize = [
    {
        label: 'small',
        value: '14px',
    },
    {
        label: 'normal',
        value: '18px',
    },
    {
        label: 'large',
        value: '20px',
    },
]
/**
 *  從後台拿回 user 的 setting, 包括文字大小，color mode ...
 */
async function getUserPreference()  {
    const preference = useUserPreference()
    const {data} = await clientApi.nuxeoUserController.getSetting()
    if(!data ) {throw new Error('get user preference fail')}
    const userSetting = JSON.parse(data) || {}
    // normalize user preference , user may be come from old version
    const userSizeValid = uiSize.find((c) => c.value === userSetting.size);
    if(!userSizeValid) {
        delete userSetting.size;
      }
    const userColorValid = colorModeOption.find( c => c.value === userSetting.color);
    if(!userColorValid) {
        delete userSetting.color;
    }
      // normalize uploadFileMaxSize
    if(userSetting.uploadFileMaxSize && typeof userSetting.uploadFileMaxSize === 'string') {
        userSetting.uploadFileMaxSize = Number(userSetting.uploadFileMaxSize.replace('M','').replace('G',''))
    }
    // normalize userSetting
    if(userSetting.userSetting) {
        delete userSetting.userSetting
    }
    preference.value = Object.assign(
        {
            size: '14px',
            folderView: 'tree',
            language: navigator.language,
            color: 'light',
            tableSettings: {},
            uploadFileMaxSize: 1200
        },
        userSetting
    )
}

async function getUser(){
    const user = useUserState()
    const {data} = await clientApi.userNuxeo.getGetapplication()
    
    if(!data) throw new Error('Get user info fail');
    user.value = data
}

