<script lang="ts" setup>
import type {TabItem, RouterParams} from '#imports';
import {MenuRouterKey, TabManagerKey, panelRouteUpdate} from '#imports'
const {allComponents} = useTabsManager()

const tab = defineModel<TabItem>('tab', { required: true });
const tabManager = inject(TabManagerKey)
if(!tabManager) {    
    throw createError('no '+ TabManagerKey.toString + "provided")
}
const history = ref<RouterParams[]>([])
const forwardHistory = ref<RouterParams[]>([])


const isFullscreen = computed(() => {
    if(!tabManager.fullscreenItem.value) return false
    return tabManager.fullscreenItem.value?.id === tab.value.id
})


function navigateTo(param: RouterParams, openInNewTab:boolean = false) {
    if(openInNewTab){
        tabManager?.openTab(param)
        return;
    }
    const existingTab = allComponents.value.find(item => item.name === param.name)
    if(existingTab){
        console.log('existingTab', existingTab)
        tabManager?.openTab(param)
        return;
    }
    
    history.value.push({
        menuKey: menuSymbol,
        id: tab.value.id,
        name: tab.value.name,
        icon: tab.value.icon,
        label: tab.value.label,
        component: tab.value.component,
        props: tab.value.props
    })
    if(!tab.value) throw new Error('Tab did not pass to child')
    tab.value.icon =  param.icon
    tab.value.name = param.name
    tab.value.component = param.component
    tab.value.props = param.props
    tab.value.label = param.label
    tab.value.initized = true
   
    panelRouteUpdate(tab.value.parent, tab.value.id, param)
}

function back(){
    if(history.value.length === 0) return
    const lastItem = history.value.pop()
    if(lastItem){
        forwardHistory.value.push({
            menuKey: menuSymbol,
            name: tab.value.name,
            id: tab.value.id,
            icon: tab.value.icon,
            label: tab.value.label,
            component: tab.value.component,
            props: tab.value.props
        })
        console.log("lastItem", forwardHistory.value[0])
        tab.value.component =lastItem.component
        tab.value.name = lastItem.name
        tab.value.icon =lastItem.icon
        tab.value.props = lastItem.props
        tab.value.label = lastItem.label
        tab.value.initized = true
        panelRouteUpdate(tab.value.parent, tab.value.id, lastItem)
    }
}

function forward() {
    if(forwardHistory.value.length === 0) return
    const lastItem = forwardHistory.value.pop()
    if(lastItem){
        // no need to push history, tab history push in watch function
        tab.value = {
            ...lastItem,
            initized: true
        }
        panelRouteUpdate(tab.value.parent, tab.value.id, lastItem)
    }
}

function updateProps(newProps:any){
    tab.value.props = { ...tab.value.props, ...newProps }
}

function updateTabName(newName:string){
    tab.value.label = newName
    // add tab name to allComponents 
    allComponents.value.forEach( item => {
        if(item.id === tab.value.id){
            item.label = newName
            item.name = newName
        }
    })
   
}

const menuSymbol = Symbol(tab.value.id)
provide(MenuRouterKey,{
    navigateTo,
    updateProps,
    updateTabName,
    tabData: tab
})

watch(tab, (newTab, oldTab) => {

},{
    deep:true
})


</script>

<template>

<div class="routerContainer">
        <Teleport defer :to="`#${isFullscreen? 'fullscreen-':''}tab-header-${tab.parent}-${tab.id} > .tabLeftTeleportContainer`" >
            <div class="historyContainer">
                <Icon name="lucide:chevron-left" :class="{historyBtn:true, active: history.length !== 0}" @click="back"/>
                <Icon name="lucide:chevron-right" :class="{historyBtn:true, active: forwardHistory.length !== 0}" @click="forward"/>
            </div>
        </Teleport>
        <Teleport  v-if="tab.icon" defer :to="`#${isFullscreen? 'fullscreen-':''}tab-header-${tab.parent}-${tab.id} > .icon`">
            <Icon :name="tab.icon" />
        </Teleport>
        <Teleport  v-if="tab.label" defer :to="`#${isFullscreen? 'fullscreen-':''}tab-header-${tab.parent}-${tab.id} > .label`">
            <div class="label">
                {{  tab.label }} 
            </div>  
        </Teleport>
        
        <template v-if="tab.initized">
            <Transition >
                <KeepAlive :exclude="/Dead/">
                    <Suspense>
                        <component :is="tab.component" :tab="tab" v-bind="tab.props"/>
                        <template #fallback>
                            <LoadingBgInline />
                        </template>
                    </Suspense>
                </KeepAlive>
            </Transition>
    </template>
</div>
</template>

<style scoped>
.loadingContainer{
    position: relative;
    width:100%;
    height: 100%;
    display: grid;
    place-items: center;
}
.historyContainer{
    line-height: 1;
    display: flex;
    flex-flow: row nowrap;
    gap: var(--app-space-xxs);
    align-items: center;
    justify-content: flex-start;
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