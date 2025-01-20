<script lang="ts" setup>
import {logout} from '#imports'
const user = useUserState()

const { locales, locale, setLocale } = useI18n()


</script>

<template>
    <div class="userMenuWidgetContainer">
        <AppLogo />
        <div v-if="user" class="username">
            {{ user.username }}
        </div>
        <div class="actions">
            <ElDropdown>
                <ElButton link>
                    <ElIcon><SvgIcon src="/icons/dots.svg"/></ElIcon>
                </ElButton>
                <template #dropdown>
                    <ElDropdownItem disabled>Setting</ElDropdownItem>
                    <ElDivider />
                    <ElDropdownItem v-for="lang in locales" :key="lang.code" 
                        :disabled="lang.code === locale" @click="setLocale(lang.code)">
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
    
}
.username{
    flex: 1 0 auto;
}
</style>