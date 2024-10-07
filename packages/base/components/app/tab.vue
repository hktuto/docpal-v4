<script lang="ts" setup>
import {TabApp} from '#components'
const tabAppRef = ref<InstanceType<typeof TabApp>>()
const route = useRoute()

function getTabsFromRouter(){
    const obj = JSON.parse(decodeURIComponent(atob(route.query.arg as string)))
    const newTabId = 'tab-' + new Date().getTime()
    console.log(obj)
    tabAppRef.value?.setHightLightPanel(newTabId)
    tabAppRef.value?.setLayout([
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
}


</script>

<template>
    <TabApp ref="tabAppRef" @ready="getTabsFromRouter" >
        <template #sidebar>
        </template>
    </TabApp>
</template>
