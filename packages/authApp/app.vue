<script lang="ts" setup>
// Unregister all service workers in development mode
import { clientApi } from 'api'

// Call the function when the app mounts
onMounted( async() => {
  // unregisterServiceWorkers()
  if(!window.location.pathname.startsWith('/public')) return

  const { locale, availableLocales, setLocaleMessage, setLocale } = useI18n()

    const { data:clientData } = await clientApi.api.getRelationQuerylanguage({
                locale:locale.value, 
                languageKey: 'client'
            }) as any
    const  clientJson = JSON.parse(clientData[0].languageContent)
    const { data:adminData } = await clientApi.api.getRelationQuerylanguage({
            locale:locale.value, 
            languageKey: 'admin'
        }) as any
    const adminJson = JSON.parse(adminData[0].languageContent)

    const { data:metaData } = await clientApi.api.getRelationQuerylanguage({
            locale:locale.value, 
            languageKey: 'meta'
        }) as any
    const metaJson = JSON.parse(metaData[0].languageContent)
    setLocaleMessage(locale.value, {
        ...clientJson,
        ...adminJson,
        ...metaJson
    })

})
</script>

<template>
    <NuxtPage />
    <AppUpdateToast />  
</template>


