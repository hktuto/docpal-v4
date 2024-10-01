<script lang="ts" setup>
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
<App>
    <template #header>
        <div class="logoContainer">
            <AppLogo />
        </div>
    </template>
    <template #footer>
        <Icon name="lucide:log-out"/>
        <LangSwitch />
    </template>
</App>

</template>


<style scoped lang="scss">

.logoContainer{
    // padding: var(--menu-item-padding);
    --icon-size: calc(var(--icon-font-size) + (var(--menu-item-padding) * 2));
}
</style>


