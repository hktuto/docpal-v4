<script lang="ts" setup>
import type {TabItem, RouterParams} from '#imports';
import {MenuRouterKey, TabManagerKey} from '#imports'
const tab = defineModel<TabItem>('tab', { required: true });
const tabManager = inject(TabManagerKey)
const history = ref<RouterParams[]>([])

function navigateTo(param: RouterParams) {
    if(param.menuKey !== menuSymbol) return
    console.log("param from child",param)
    history.value.push(param)
    if(!tab.value) throw new Error('Tab did not pass to child')
    tab.value.component =param.component
    tab.value.props = param.props
    tab.value.label = param.label
    tabManager?.panelRouteUpdate(tab.value.parent, tab.value.id, param)
}

const menuSymbol = Symbol(tab.value.id)
provide(MenuRouterKey,{
    navigateTo,
    menuSymbol
})


</script>

<template>

<div class="routerContainer">
    <Suspense>
        <component :is="tab.component" :tab="tab" :v-bind="tab.props"/>
        <template #fallback>
            <LoadingBg >
                <h1 style="color: var(--app-grey-1000)">{{ $t('loading') }}</h1>
            </LoadingBg>
        </template>
    </Suspense>
</div>
</template>

<style scoped>
.routerContainer{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    --gradient-color-1: #b5daef;
    --gradient-color-2: #b6c0e3;
    --gradient-color-3: #9ceee6;
    --gradient-color-4: #def5fa;
}
</style>