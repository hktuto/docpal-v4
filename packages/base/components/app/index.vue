<script setup lang="ts">
import { useGlobalSetting } from '#imports'
import { TabApp } from '#components'

const tabAppRef = ref<InstanceType<typeof TabApp>>()

async function getTabsFromServer() {
    const storageTabs = localStorage.getItem('app-tab')
    if(storageTabs) {
        const newLayout = JSON.parse(storageTabs);
        console.log("storageTabs", newLayout)
        // need to delay initLayout to wait for splitpanes to render
        tabAppRef.value?.setLayout(newLayout)
    }else{
        // init a basic layout
        tabAppRef.value?.setHightLightPanel("dummy-tab-container")
        tabAppRef.value?.setLayout([
                {
                    id:"dummy-tab-container",
                    parent: "root",
                    showingTabIndex: 0,
                    size:100,
                    tabs: [
                        {
                            id: 'new-tab-001',
                            label: "New Tab",
                            parent: "dummy-tab-container",
                            component: 'LazyTabEmpty',
                        }
                    ]
                }
            ])
    }
} 


function saveHIghlightPanel(panelID:string){
    localStorage.setItem('app-tab-hightLightPanel', panelID);
    
}

async function saveTabsToLocalStorage(layout:TabPanel[]) {
    const saveData = JSON.parse(JSON.stringify(layout))
    // loop all panel and tabs to reset all initized to false
    saveData.forEach((panel:any) => {
        panel.tabs.forEach((tab:any) => {
            tab.initized = false
        })
    })
    localStorage.setItem('app-tab', JSON.stringify(saveData))
}


useGlobalSetting()


</script>

<template>
    <TabApp ref="tabAppRef" @ready="getTabsFromServer" @layoutChanged="saveTabsToLocalStorage" @highlightPanelChanged="saveHIghlightPanel">
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
        
    </TabApp>
    <Contextmenu />
</template>

<style lang="scss" scoped>
</style>