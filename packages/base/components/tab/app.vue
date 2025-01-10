<script setup lang="ts">
import 'splitpanes/dist/splitpanes.css'
import { TabDialog } from '#components'
const emits = defineEmits(['ready', 'layoutChanged', 'highlightPanelChanged'])
const {layout, initLayout, allComponents, allComponentRef} = useTabsManager()
const loading = ref(false);
const hightLightPanel = useCurrentTargetPanel()

const fullscreenItem = ref<TabItem>()
const dialogRef = ref<InstanceType<typeof TabDialog>>(false)
const dialogItem = ref<TabItem>()

const dialogOpened = ref(false)
function closeFullscreen(){
    fullscreenItem.value = undefined
}
function openFocusMode(tab:TabItem){
    fullscreenItem.value = tab
}
function closeDialog(){
    dialogOpened.value = false
}
function openNewDialog(tab:TabItem){
    dialogOpened.value = true;
    dialogItem.value = tab
}

const tabDataKey = Symbol("tab");
provide(
    TabManagerKey, 
    {
        tabDataKey,
        fullscreenItem,
        dialogOpened,
        closeDialog,
        openFocusMode,
        openNewDialog,
        openInCurrentTab,
        openTab
    }
)

async function openTab(tab:TabItem){
    // check if tab is already open
    try{
        await focusExistingTab(tab)
    }catch(error){
        addTabInCurrentPanel({...tab})
    } 
}

function focusExistingTab(tab:TabItem):Promise<void>{
    const existingTab = allComponents.value.find(item => item.name === tab.name)
    if(existingTab){
        const panelIndex = layout.value.findIndex(panel => panel.id === existingTab.parent)
        if(panelIndex !== -1) {
            console.log("can find index")
            layout.value[panelIndex].showingTabIndex = layout.value[panelIndex].tabs.findIndex(item => item.id === existingTab.id)
            // if panel is not initized, set it to initized
            if(!layout.value[panelIndex].tabs[layout.value[panelIndex].showingTabIndex].initized) {
                layout.value[panelIndex].tabs[layout.value[panelIndex].showingTabIndex].initized = true
            }
            return Promise.resolve()
        }else{
            return Promise.reject(new Error("can not find index"))
        }
    }else{
        return Promise.reject(new Error("no existingTab"))
    }
}

async function openInCurrentTab(tab:TabItem){
    try{
        await focusExistingTab(tab)
    }catch(error){
        const panel = layout.value.find( panel => panel.id === hightLightPanel.value)

        const tabIndex = panel.showingTabIndex
        const highLightItem = panel.tabs[tabIndex]
        if(highLightItem){
            const indexInAllComponent = allComponents.value.findIndex(item => item.name === highLightItem.name)
            console.log("indexInAllComponent", indexInAllComponent, allComponentRef.value[indexInAllComponent])
            if(allComponentRef.value[indexInAllComponent]){
                console.log(allComponentRef.value[indexInAllComponent])
                allComponentRef.value[indexInAllComponent].navigateTo(tab)
            }
        }
        
        
    }
    // const existingTab = allComponents.value.find(item => item.name === tab.name)
}

function setLayout(layout:TabPanel[]){
    loading.value = true;
    initLayout(layout);
    loading.value = false

    // get tab from router
}

function setHightLightPanel(panelId:string){
    hightLightPanel.value = panelId
}


watch(hightLightPanel,(item) => {
    emits('highlightPanelChanged', item)
})

watch(layout, (newVal) => {
    emits('layoutChanged', newVal)
},{
    deep:true
})

defineExpose({
    setLayout,
    setHightLightPanel
})
</script>

<template>
<AppWrapper>
        <template #sidebar>
            <slot name="sidebar" />
            
        </template>
        <template #default>
            <template  v-if="loading">
                <LoadingBg />
            </template>
            <template v-else>

                <TabLayout :layout="layout" @ready="$emit('ready')" />
                
                <div class="hiddenAllComponent">
                    <template v-for="component in allComponents" :key="component.id">
                        
                        <template v-if="fullscreenItem && fullscreenItem.id === component.id">
                            <Teleport defer :to="`#fullscreen-${component.parent}_${component.id}`">
                               
                                <TabRouter ref="allComponentRef" :tab="component" />
                            </Teleport>
                        </template>
                        <template v-else>
                            
                            <Teleport defer :to="`#${component.parent}_${component.id}`">
                                <TabRouter ref="allComponentRef" :tab="component" />
                            </Teleport>
                        </template>
                        
                    </template>
                </div>

                <div v-if="fullscreenItem" class="fullScreenContainer" >
                    <div class="header" :data-tab-id="fullscreenItem.id" :id="`fullscreen-tab-header-${fullscreenItem.parent}-${fullscreenItem.id}`">
                        <div class="tabLeftTeleportContainer" >

                        </div>
                        <div class="icon"></div>
                        <div class="label">
                            
                        </div>
                        <Icon class="closeIcon" name="ic:round-close" @click.stop="closeFullscreen"></Icon>
                    </div>
                    <div class="fullscreenContent" :id="'fullscreen-' + fullscreenItem.parent + '_' + fullscreenItem.id">
                      
                    </div>
                </div>

            </template>
        </template>
    </AppWrapper>
    <TabDialog ref="dialogRef"  v-model="dialogOpened" :item="dialogItem" />
</template>


<style lang="scss" scoped>
.fullScreenContainer{
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    background: var(--app-grey-975);
    z-index: 1000;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: column nowrap;
    z-index: 4;
    border-radius: var(--app-border-radius-m);
    overflow: hidden;
    .header{
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        overflow: auto;
        overflow-y:hidden ;
        isolation: isolate;
        position: relative;
        // background: var(--app-grey-900);
        justify-content: flex-start;
        align-items: center;
        padding-block: var(--app-space-xs);
        &:after {
            content: '';
            height: 1px;
            background: var(--app-grey-850);
            width:100%;
            display: block;
            z-index: -1;
            position: absolute;
            left: 0;
            bottom: 0;
        }
    }
    .fullscreenContent{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        background: var(--app-grey-1000);
    }
}
</style>