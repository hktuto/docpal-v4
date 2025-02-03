<script setup lang="ts">
import { useGlobalSetting } from '#imports'
import { TabApp } from '#components'
import { clientApi } from 'api'
const tabAppRef = ref<InstanceType<typeof TabApp>>()
const emits = defineEmits(['ready'])
async function getTabsFromServer() {
    const storageTabs = localStorage.getItem('app-tab')
    if(storageTabs) {
        const newLayout = JSON.parse(storageTabs);
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
                            name: "new-tab-001",
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
const languageReady = ref(false)
async function getLocale(){
    const { locale, availableLocales, setLocaleMessage } = useI18n()
    await Promise.all( availableLocales.map( async(code) => {

            const { data:clientData } = await clientApi.api.getRelationQuerylanguage({
                    locale:code, 
                    languageKey: 'client'
                }) as any
            const clientJson = JSON.parse(clientData[0].languageContent)

            const { data:adminData } = await clientApi.api.getRelationQuerylanguage({
                    locale:code, 
                    languageKey: 'admin'
                }) as any
            const adminJson = JSON.parse(adminData[0].languageContent)

            const { data:metaData } = await clientApi.api.getRelationQuerylanguage({
                    locale:code, 
                    languageKey: 'meta'
                }) as any
            const metaJson = JSON.parse(metaData[0].languageContent)
            setLocaleMessage(code, {
                ...clientJson,
                ...adminJson,
                ...metaJson
            })
            
        })
    )
    emits('ready')
}


useGlobalSetting()


onMounted(async() => {
    await getLocale();
    getTabsFromServer()
})

</script>

<template>
    <TabApp ref="tabAppRef" @ready="getTabsFromServer" @layoutChanged="saveTabsToLocalStorage" @highlightPanelChanged="saveHIghlightPanel">
        <template #sidebar>
            <slot name="sidebar" />
        </template>
    </TabApp>
    <Contextmenu />
</template>

<style lang="scss" scoped>
</style>