<template>
    <div id="languageSwitcher" class="languageSwitchContainer">
      <ElDropdown id="languageSwitchContainerIcon"  @command="handleCommand">
        <Icon name="lucide:languages" size="var(--app-font-size-l)"/>
          <template #dropdown>
              <ElDropdownMenu >
                  <ElDropdownItem v-for="lang in locales" :key="lang.code" :command="lang.code"
                    :disabled="lang.code === locale">
                      {{$t(lang.code)}}
                  </ElDropdownItem>
              </ElDropdownMenu>
          </template>
        </ElDropdown>
    </div>
</template>

<script lang="ts" setup>
const router = useRouter()
// const { userPreference,savePreference } = useUser()
const { locales, locale, setLocale } = useI18n()
async function handleCommand(newLocale:any) {
    await setLocale(newLocale)
    // window.location.reload()
    
    // userPreference.value.language = newLocale;
    // savePreference()
    // window.location.reload();
    // languageStore.loadLanguage(newLocale)

}
</script>

<style lang="scss" scoped>
.languageSwitchContainer{
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
}
.currentLang{
    word-break: keep-all;
    line-height: 1;
    font-size: var(--el-font-size-extra-small);
    text-align: left;
    display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--app-space-xs);
    .langItem{
      display: inline-block;
    }
}
</style>
