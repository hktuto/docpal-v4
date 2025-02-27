<script setup lang="ts">
import { useGlobalSetting } from '#imports'
import { TabApp } from '#components'
import { clientApi } from 'api'
const tabAppRef = ref<InstanceType<typeof TabApp>>()
const emits = defineEmits(['ready'])
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
import enUS from 'vxe-table/lib/locale/lang/en-US'
import zhHK from 'vxe-table/lib/locale/lang/zh-HK'


async function getTabsFromServer() {
    // check if new tab
    const route = useRoute()

    let storageTabs = localStorage.getItem('app-tab')
    // storageTabs = null
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
async function getLocale(){
    const { locale, availableLocales, setLocaleMessage } = useI18n()
    const config = useRuntimeConfig()
    await Promise.all( availableLocales.map( async(code) => {
            const vxeLang = code === 'zh-CN' ? zhCN : code === 'en-US' ? enUS : zhHK
            let clientJson;
            if(config.public.isProduction){
                const { data:clientData } = await clientApi.api.getRelationQuerylanguage({
                        locale:code, 
                        languageKey: 'client'
                    }) as any
                clientJson = JSON.parse(clientData[0].languageContent)
            }else{
                const config = useRuntimeConfig() as any
                clientJson = code === 'en-Us' ? config.public.enJson : code === 'zh-CN' ? config.public.zhJson : config.public.zhHKJson
                // const jsonFile = await fetch(`/defaultLang/${code}.json`).then(res => res.json())
                // clientJson = jsonFile
            }
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
                ...metaJson,
                ...vxeLang
            })
            
        })
    )
    languageReady.value = true
    emits('ready')
}
const { globalSlots } = useGlobalSetting()


onMounted(async() => {
    await getLocale();
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