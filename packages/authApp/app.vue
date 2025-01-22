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



</script>

<template>
   <AuthState>
        <template #default="{ loggedIn, logout }">
            <AppEntry>
                <template #sidebar>
                    <AppMenu class="sideMenu">
                        <template #header>
                            <AuthUser />
                            <AuthSetting />
                        </template>
                        <template #footer>
                        </template>
                    </AppMenu>
                </template>
            </AppEntry>
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


