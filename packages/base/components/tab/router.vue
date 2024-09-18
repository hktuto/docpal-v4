<script lang="ts" setup>
import type {TabItem, RouterParams} from '#imports';
import {MenuRouterKey, TabManagerKey} from '#imports'
const tab = defineModel<TabItem>('tab', { required: true });
const tabManager = inject(TabManagerKey)
const history = ref<RouterParams[]>([])
const forwardHistory = ref<RouterParams[]>([])

function navigateTo(param: RouterParams) {
    if(param.menuKey !== menuSymbol) return
    console.log("param from child",{...tab.value})
    history.value.push({
        menuKey: menuSymbol,
        label: tab.value.label,
        component: tab.value.component,
        props: tab.value.props
    })
    console.log(tab.value)
    if(!tab.value) throw new Error('Tab did not pass to child')
    tab.value.component =param.component
    tab.value.props = param.props
    tab.value.label = param.label
    tabManager?.panelRouteUpdate(tab.value.parent, tab.value.id, param)
}

function back(){
    if(history.value.length === 0) return
    const lastItem = history.value.pop()
    console.log("lastItem", lastItem)
    if(lastItem){
        forwardHistory.value.push({
            menuKey: menuSymbol,
            label: tab.value.label,
            component: tab.value.component,
            props: tab.value.props
        })
        console.log("lastItem", forwardHistory.value[0])
        tab.value.component =lastItem.component
        tab.value.props = lastItem.props
        tab.value.label = lastItem.label
        tabManager?.panelRouteUpdate(tab.value.parent, tab.value.id, lastItem)
    }
}

function forward() {
    if(forwardHistory.value.length === 0) return
    const lastItem = forwardHistory.value.pop()
    console.log("forward", lastItem)
    if(lastItem){
        history.value.push(lastItem)

        tab.value.component =lastItem.component
        tab.value.props = lastItem.props
        tab.value.label = lastItem.label
        tabManager?.panelRouteUpdate(tab.value.parent, tab.value.id, lastItem)
    }
}

const menuSymbol = Symbol(tab.value.id)
provide(MenuRouterKey,{
    navigateTo,
    menuSymbol
})


</script>

<template>

<div class="routerContainer">
        <Teleport :to="`[data-tab-id=${tab.id}] > .tabLeftTeleportContainer`">
            <div class="historyContainer">
                <Icon name="lucide:chevron-left" :class="{historyBtn:true, active: history.length !== 0}" @click="back"/>
                <Icon name="lucide:chevron-right" :class="{historyBtn:true, active: forwardHistory.length !== 0}" @click="forward"/>
            </div>
        </Teleport>
        <Transition appear>
            <KeepAlive>
                <Suspense>
                    <component :is="tab.component" :tab="tab" :v-bind="tab.props"/>
                    <template #fallback>
                        <LoadingBg >
                            <h1 style="color: var(--app-grey-1000)">{{ $t('loading') }}</h1>
                        </LoadingBg>
                    </template>
                </Suspense>
            </KeepAlive>
        </Transition>
</div>
</template>

<style scoped>
.historyContainer{
    line-height: 1;
}
.historyBtn{
    --btn-color:var(--app-grey-800);
    color: var(--btn-color);
    font-size: var(--app-font-size-m);
    &.active{
        --btn-color: var(--app-grey-300);
        &:hover {
            --btn-color: var(--app-success-color);
        } 
    }
}
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