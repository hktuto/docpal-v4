<script lang="ts" setup>
import { on } from 'events'

const { loggedIn } = useAuth()
const authReadyState = useAuthReadyState()
const { locale, loadLocaleMessages} = useI18n()
watch(loggedIn, (bool) => {
  if(bool) {
    loadLocaleMessages(locale.value)
    authReadyState.value = true;
  }
})


onMounted(() => {
    const route = useRoute()
    console.log(route);
})

</script>

<template>
   <AuthState>
        <template #default="{ loggedIn, logout }">
            <App>
                <template #header>
                    <div class="logoContainer">
                        <AppLogo />
                    </div>
                </template>
                <template #footer>
                    <Icon name="lucide:log-out" @click="logout"/>
                    
                </template>
            </App>
        </template>
        <template #placeholder>
            <LoadingBg >
                <h1 style="color: #fff;">{{ $t('loading') }}</h1>
            </LoadingBg>
        </template>
    </AuthState>

</template>


<style scoped lang="scss">

.logoContainer{
    // padding: var(--menu-item-padding);
    --icon-size: calc(var(--icon-font-size) + (var(--menu-item-padding) * 2));
}
</style>


