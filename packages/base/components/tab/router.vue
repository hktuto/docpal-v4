<script lang="ts" setup>
import type {TabItem, RouterParams} from '#imports';
import {MenuRouterKey, TabManagerKey, panelRouteUpdate} from '#imports'
const tab = defineModel<TabItem>('tab', { required: true });
const tabManager = inject(TabManagerKey)
const history = ref<RouterParams[]>([])
const forwardHistory = ref<RouterParams[]>([])

function navigateTo(param: RouterParams) {
    if(param.menuKey !== menuSymbol) return
    
    history.value.push({
        menuKey: menuSymbol,
        id: tab.value.id,
        icon: tab.value.icon,
        label: tab.value.label,
        component: tab.value.component,
        props: tab.value.props
    })
    if(!tab.value) throw new Error('Tab did not pass to child')
    tab.value.icon =  param.icon
    tab.value.component = param.component
    tab.value.props = param.props
    tab.value.label = param.label
    console.log("navigateTo", tab.value)
    panelRouteUpdate(tab.value.parent, tab.value.id, param)
}

function back(){
    if(history.value.length === 0) return
    const lastItem = history.value.pop()
    if(lastItem){
        forwardHistory.value.push({
            menuKey: menuSymbol,
            id: tab.value.id,
            icon: tab.value.icon,
            label: tab.value.label,
            component: tab.value.component,
            props: tab.value.props
        })
        console.log("lastItem", forwardHistory.value[0])
        tab.value.component =lastItem.component
        tab.value.icon =lastItem.icon
        tab.value.props = lastItem.props
        tab.value.label = lastItem.label
        panelRouteUpdate(tab.value.parent, tab.value.id, lastItem)
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
        panelRouteUpdate(tab.value.parent, tab.value.id, lastItem)
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
        <Teleport  v-if="tab.icon" :to="`[data-tab-id=${tab.id}] > .icon`">
            <Icon :name="tab.icon" />
        </Teleport>
        <Teleport  v-if="tab.label" :to="`[data-tab-id=${tab.id}] > .label`">
            <div class="label">
                {{ tab.label }} 
            </div>  
        </Teleport>
        <Transition >
            <KeepAlive>
                <Suspense>
                    <component :is="tab.component" :tab="tab" v-bind="tab.props"/>
                    <template #fallback>
                        <div class="loadingContainer">
                            {{ $t('loading') }}
                        </div>
                    </template>
                </Suspense>
            </KeepAlive>
        </Transition>
</div>
</template>

<style scoped>
.loadingContainer{
    position: relative;
    width:100%;
    height: 100%;
    background-color: var(--app-primary-color);
    display: grid;
    place-items: center;
}
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>