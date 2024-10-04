<script lang="ts" setup>

const route = useRoute()

const {layout, initLayout, allComponents} = useTabsManager()
const loading = ref(false);
const hightLightPanel = useCurrentTargetPanel()
function getTabsFromRouter(){
    loading.value = true;
    const obj = JSON.parse(decodeURIComponent(atob(route.query.arg as string)))
    const newTabId = 'tab-' + new Date().getTime()
    hightLightPanel.value = newTabId
    setTimeout(() => {
        initLayout([
            {
                id: newTabId,
                parent: 'root',
                showingTabIndex: 0,
                size: 100,
                tabs:[
                    {...obj.data, parent: newTabId,}
                ]
            }
        ])
    }, 200)
    loading.value = false
    // get tab from router
}
const fullscreenItem = ref<TabItem>()
function closeFullscreen(){
    fullscreenItem.value = undefined
}
function openFocusMode(tab:TabItem){
    fullscreenItem.value = tab
}
const tabDataKey = Symbol("tab");
provide(
    TabManagerKey, 
    {
        tabDataKey,
        fullscreenItem,
        openFocusMode
    }
)
</script>

<template>
 <AppWrapper>
        <template #sidebar>
            <AppMenu class="sideMenu">
                <template #header>
                    <slot name="header" />
                </template>
                <template #footer>
                    <slot name="footer" />
                </template>
            </AppMenu>
        </template>
        <template #default>
            <template  v-if="loading">
                <LoadingBg />
            </template>
            <template v-else>

                <TabLayout :layout="layout" @ready="getTabsFromRouter" />
                
                <div class="hiddenAllComponent">
                    <template v-for="component in allComponents" :key="component.id">
                        
                        <template v-if="fullscreenItem && fullscreenItem.id === component.id">
                            <Teleport defer :to="`#fullscreen-${component.parent}_${component.id}`">
                               
                                <TabRouter :tab="component" />
                            </Teleport>
                        </template>
                        <template v-else>
                            
                            <Teleport defer :to="`#${component.parent}_${component.id}`">
                                <TabRouter :tab="component" />
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