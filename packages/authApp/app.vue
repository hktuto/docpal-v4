<script lang="ts" setup>
const { loggedIn } = useAuth()
const authReadyState = useAuthReadyState()
const { locale, loadLocaleMessages} = useI18n()
watch(loggedIn, (bool) => {
  if(bool) {
    loadLocaleMessages(locale.value)
    // authReadyState.value = true;
  }
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>


