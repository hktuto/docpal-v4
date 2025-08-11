<script lang="ts" setup>
const {public : { platform , defaultTab}} = useRuntimeConfig()
const localeReady = ref(false)
const appPlatform = useAppPlatform()
appPlatform.value = platform || 'client'
const defaultTabStore = useAppDefaultTab()
defaultTabStore.value =  defaultTab
</script>

<template>
  <AuthState>
    <template #default="{ loggedIn, logout }">
      <AppEntry @ready="localeReady = true" mode="client" :defaultTab="defaultTabStore">
        <template v-if="localeReady" #sidebar>
          <AppMenu class="sideMenu" :admin="appPlatform === 'admin'">
            <template #header>
              <AuthUser />
              <AuthSetting />
            </template>
            <template #footer> </template>
          </AppMenu>
        </template>
      </AppEntry>
    </template>
    <template #placeholder>
      <LoadingBg>
        <h1 style="color: #fff">{{ $t('loading') }}</h1>
      </LoadingBg>
    </template>
  </AuthState>
</template>


<style scoped lang="scss">
.logoContainer {
  // padding: var(--menu-item-padding);
  --icon-size: calc(var(--icon-font-size) + (var(--menu-item-padding) * 2));
}
</style>


