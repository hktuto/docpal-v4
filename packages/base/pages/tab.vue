<script lang="ts" setup>

const route = useRoute()

const {layout, initLayout, allComponents} = useTabsManager()
const loading = ref(false);
const hightLightPanel = useCurrentTargetPanel()
function getTabsFromRouter(){
    loading.value = true;
    const obj = JSON.parse(decodeURIComponent(atob(route.query.arg as string)))
    hightLightPanel.value = "new-tab-001"
    console.log(obj)
    initLayout([
        {
            id: 'new-tab-001',
            parent: 'root',
            showingTabIndex: 0,
            size: 100,
            tabs:[
                {...obj.data, parent: 'new-tab-001',}
            ]
        }
    ])
    console.log(obj)
    // get tab from router
}

const tabDataKey = Symbol("tab");
provide(
    TabManagerKey, 
    {
        tabDataKey,
    }
)
</script>

<template>
<div class="page">

    <template v-if="!route.query.arg">
        <LoadingBg >
            no query data
            </LoadingBg>
    </template>
    <template v-else>
    <TabLayout :layout="layout" @ready="getTabsFromRouter" />
        <div class="hiddenAllComponent">
            <template v-for="component in allComponents" :key="component.id">
                <Teleport defer :to="'#' + component.parent + '_' + component.id">
                    <TabRouter :tab="component" />
                </Teleport>
            </template>
        </div>
    </template>
</div>
</template>