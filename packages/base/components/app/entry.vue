<script setup lang="ts">
import { useGlobalSetting } from '#imports'
import { TabApp } from '#components'
const tabAppRef = ref<InstanceType<typeof TabApp>>()
const emits = defineEmits(['ready'])
import {getLocale} from '../../utils/languageHelper'
async function getTabsFromServer() {
    // check if new tab
    const route = useRoute()

    let storageTabs = localStorage.getItem('app-tab')
    // storageTabs = null
    try{
        if(storageTabs) {
            const newLayout = JSON.parse(storageTabs);
            // TODO : check if storageTabs is array, and handle restore other tabs
            tabAppRef.value?.setLayout(newLayout)
        }else{
            // init a basic layout
            tabAppRef.value?.setHightLightPanel("dummy-tab-container")
            const config = useRuntimeConfig() as any
            const defaultTab = config.public.defaultTab || {
                id: 'new-tab-001',
                label: "New Tab",
                name: "new-tab-001",
                parent: "dummy-tab-container",
                component: 'LazyTabEmpty', 
            }
            defaultTab.parent = "dummy-tab-container"

            tabAppRef.value?.setLayout([
                    {
                        id:"dummy-tab-container",
                        parent: "root",
                        showingTabIndex: 0,
                        size:100,
                        tabs: [
                            defaultTab
                        ]
                    }
                ])
        }
    }catch(error){
        const config = useRuntimeConfig() as any
            const defaultTab = config.public.defaultTab || {
                id: 'new-tab-001',
                label: "New Tab",
                name: "new-tab-001",
                parent: "dummy-tab-container",
                component: 'LazyTabEmpty', 
            }
        tabAppRef.value?.setLayout([
                    {
                        id:"dummy-tab-container",
                        parent: "root",
                        showingTabIndex: 0,
                        size:100,
                        tabs: [
                            defaultTab
                        ]
                    }
                ])
        console.log("getTabsFromServer", error)
    }
    const router = useRouter();
    const additionalPath = localStorage.getItem('additionalPath')
    if(additionalPath){
        try{
            const item = JSON.parse(additionalPath)
            tabAppRef.value?.openTab(item)
            // remove localStorage
            localStorage.removeItem('additionalPath')
        }catch(error){
            // do nothing
        }
    }
    router.push({
        hash:"",
        query:{},
    })
} 


function saveHighlightPanel(panelID:string){
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
const { t } = useI18n()
const languageReady = ref(false)

const { globalSlots } = useGlobalSetting()


onMounted(async() => {
    await getLocale();
    languageReady.value = true
    emits('ready')
    getTabsFromServer()
})

</script>

<template>
    <template v-if="languageReady">

        <TabApp ref="tabAppRef" @ready="getTabsFromServer" @layoutChanged="saveTabsToLocalStorage" @highlightPanelChanged="saveHighlightPanel">
            <template #sidebar>
                <slot name="sidebar" />
                <component v-for="s in globalSlots" v-show=s.show :key="s.name" :is="s.component" v-bind="$props" />
            </template>
        </TabApp>
        <Contextmenu />
        
    </template>
    <template v-else>
        <LoadingBg >
            <h1 style="color: #fff;">{{ $t('loading') }}</h1>
        </LoadingBg>
    </template>
</template>

<style lang="scss" scoped>
</style>