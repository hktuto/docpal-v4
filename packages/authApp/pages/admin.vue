
<script lang="ts" setup>

const localeReady = ref(false)
const appPlatform = useAppPlatform()
appPlatform.value = 'admin'
const { public: { platform }} = useRuntimeConfig()
const defaultTab = useAppDefaultTab()
const router = useRouter()

defaultTab.value =  {
  id: 'admin-user',
  name: 'admin-user-list',
  label: 'adminMenu.User',
  icon: 'lucide:user',
  component: 'LazyAdminUserList',
  props: {}
}
if(platform === 'admin') {
  // if the platform on runtime config is admin, then no need to use this page, router back to index
  router.replace({
    path: '/'
  })
}

</script>

<template>
  <AuthState>
    <template #default="{ loggedIn, logout }">
      <AppEntry @ready="localeReady = true" mode="admin" :defaultTab="defaultTab">
        <template v-if="localeReady" #sidebar>
          <AppMenu class="sideMenu" admin>
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
</style>


