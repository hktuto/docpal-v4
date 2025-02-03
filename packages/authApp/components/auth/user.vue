<script lang="ts" setup>
import {emitBus, EventType} from 'eventbus';
import {logout} from '#imports'
const user = useUserState()
const config = useRuntimeConfig()
const { locales, locale, setLocale } = useI18n()

function changeLanguage(langCode:string) {
    setLocale(langCode);
    // nextTick(() => {
    //     window.location.reload()
    // })
}

function openSetting(){

    emitBus(EventType.OPEN_SETTINGS, "");
}

</script>

<template>
    <div class="userMenuWidgetContainer">
        <AppLogo />
        <div v-if="user" class="username">
            {{ user.username }}
        </div>
        <div class="actions">
            <ElDropdown>
                <ElButton size="small" link >
                    <ElIcon><SvgIcon class="dropdownIcon" src="/icons/dots.svg"/></ElIcon>
                </ElButton>
                <template #dropdown>
                    <ElDropdownItem @click="openSetting">Setting</ElDropdownItem>
                    <!-- TODO: remove this part from prodction, or mark it avalible only for super admin -->
                    <Language />
                    <template v-if="config.public.NODE_ENV === 'development'">
                        <!-- <Language /> -->
                    </template>
                    <ElDivider />
                    <ElDropdownItem v-for="lang in locales" :key="lang.code" 
                        :disabled="lang.code === locale" @click="changeLanguage(lang.code)">
                        {{$t(lang.code)}}
                    </ElDropdownItem>
                    <ElDivider />
                    <ElDropdownItem @click="logout">Logout</ElDropdownItem>
                </template>
            </ElDropdown>
        </div>
    </div>

</template>

<style scoped lang="scss">
.userMenuWidgetContainer{
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: var(--app-space-s);
    line-height: 1;
    padding-right: var(--app-space-xs);
    
}
.dropdownIcon{
    --icon-size: var(--app-font-size-m);
}
.username{
    flex: 1 0 auto;
}
</style>