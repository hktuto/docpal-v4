<script lang="ts" setup>
import type {TabItem, RouterParams} from '#imports';
import {ElMessage, ElNotification } from 'element-plus';
import {MenuRouterKey, TabManagerKey, panelRouteUpdate} from '#imports'
const { current } = useMagicKeys()
import { use } from 'vxe-table';
const {allComponents} = useTabsManager()


const tab = defineModel<TabItem>('tab', { required: true });
const tabManager = inject(TabManagerKey)
if(!tabManager) {    
    throw createError('no '+ TabManagerKey.toString + "provided")
}
const { t } = useI18n()
const history = ref<RouterParams[]>([])
const forwardHistory = ref<RouterParams[]>([])



const isFullscreen = computed(() => {
    if(!tabManager.fullscreenItem.value) return false
    return tabManager.fullscreenItem.value?.id === tab.value.id
})


function navigateTo(param: RouterParams, openInNewTab:boolean = false, ignoreExist:boolean = false) {
    if(current.has('meta') || current.has('ctrl') || openInNewTab){
        tabManager?.openTab(param)
        return;
    }
    if(!ignoreExist){
        const existingTab = allComponents.value.find(item => item.name === param.name)
        if(existingTab){
            tabManager?.openTab(param)
            return;
        }
    }
    // forwardHistory.value = [];
    const lastId = tab.value.id
    history.value.push({
        ...tab.value,
    })
    tab.value = {
        ...param,
        parent: tab.value.parent,
        id: tab.value.id,
        initized: true,
    }
    panelRouteUpdate(tab.value.parent, lastId, tab.value)
}

function back(fallback:any){
    if(history.value.length === 0) {
        if(fallback){
            navigateTo(fallback)
        }    
        return
    }
    const lastItem = history.value.pop()
    if(lastItem){
    const lastId = tab.value.id

        forwardHistory.value.push({
            name: tab.value.name,
            id: tab.value.id,
            icon: tab.value.icon,
            label: tab.value.label,
            component: tab.value.component,
            props: tab.value.props
        })
        tab.value = {
            ...lastItem,
            parent: tab.value.parent,
            id: tab.value.id,
            initized: true,
        }
        panelRouteUpdate(tab.value.parent, lastId, tab.value)
    }
}

function forward() {
    if(forwardHistory.value.length === 0) return
    const lastItem = forwardHistory.value.pop()

    if(lastItem){
        const lastId = tab.value.id

        history.value.push({
            ...tab.value,
        })
        tab.value = {
            ...lastItem,
            parent: tab.value.parent,
            id: tab.value.id,
            initized: true
        }
        panelRouteUpdate(tab.value.parent, lastId, tab.value)
    }
}

function updateProps(newProps:any){
    tab.value.props = { ...tab.value.props, ...newProps }
    panelRouteUpdate(tab.value.parent, tab.value.id, tab.value)
}

function updateTabName(newName:string){
    tab.value.label = newName
    // add tab name to allComponents 
    allComponents.value.forEach( item => {
        if(item.id === tab.value.id){
            item.label = newName
        }
    })
   
}

const showError = ref(false);
const errorMessage = ref("");
function showErrorPage(error:Error){
    showError.value = true
    errorMessage.value = error.message
}
function retryError(){
    showError.value = false
}
const routerContainer = computed(( ) => {
    return document.getElementById(tab.value.parent + "_" + tab.value.id)
})
const menuSymbol = Symbol(tab.value.id)

function createMessage(type:string, ...args:any[]){
    if(args.length === 1 && typeof args[0] === 'string'){
        console.log("createMessage", args[0], routerContainer.value)
        ElMessage({
            type,
            message: args[0],
            appendTo: '#'+ tab.value.parent + "_" + tab.value.id,
        },)
    }else{
        ElMessage({
            type,
            appendTo: routerContainer.value,
            ...args,
        })
    }
}

function createNotification(type:string, ...args:any[]){
    if(args.length === 1 && typeof args[0] === 'string'){
        ElNotification({
            type,
            message:args[0]
        },{
            appendTo: routerContainer.value,
        })
    }else{
        ElNotification({
            type,

            ...args
        },{
            appendTo: routerContainer.value,
        })
    }
}

provide(MenuRouterKey,{
    navigateTo,
    updateProps,
    updateTabName,
    routerContainer,
    message:{
        success: (...args) => createMessage('success', ...args),
        error: (...args) => createMessage('error', ...args),
        warning: (...args) => createMessage('warning', ...args),
        info: (...args) => createMessage('info', ...args),
        loading: (...args) => createMessage('loading', ...args)
    },
    notification:{
        success: (...args) => createNotification('success', ...args),
        error: (...args) => createNotification('error', ...args),
        warning: (...args) => createNotification('warning', ...args),
        info: (...args) => createNotification('info', ...args),
        loading: (...args) => createNotification('loading', ...args)
    },
    showErrorPage,
    tabData: tab
})

const historyClass = computed(() => {
    if(isFullscreen.value) return `#fullscreen-tab-header-${tab.value.parent}-${tab.value.id} > .tabLeftTeleportContainer`
    return `#tab-header-${tab.value.parent}-${tab.value.id} > .tabLeftTeleportContainer`
})

defineExpose({
    navigateTo,
})

</script>

<template>

<div :class="['routerContainer', [tab.name]]">
        <Teleport :to="historyClass" defer>
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
                {{  t(tab.label) }} 
            </div>  
        </Teleport>
        
        <template v-if="tab.initized && !showError">
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
    <template v-else>
        <div class="errorContainer">
            <div class="errorIcon">
                <Icon name="lucide:alert-triangle" size="24" />
            </div>
            <div class="errorMessage">
                {{ errorMessage }}
            </div>
            <div class="errorRetry" @click="retryError">
                Retry
            </div>
        </div>
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