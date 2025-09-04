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
            </template>
            <template #footer>
              <AppSwitchMenu />
            </template>
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
.appFullPage{
  --app-bg: radial-gradient(72% 72% at 2% -5%, #dbe7ec 0%, #e8efef 51%, #f3f0f0 100%);
  /* --app-bg: #fff; */
  --app-accent-color: #0077ff;
}
</style>


