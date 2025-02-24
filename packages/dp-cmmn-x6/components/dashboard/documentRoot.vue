<script lang="ts" setup>
import { clientApi } from 'api'
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})


const home = ref({secondId:'/'})
const idOrPath = ref('/')

function changeRoute(path:string) {
    idOrPath.value = path
}

onMounted(() => {

})

provide(BrowseListProviderKey,{
    getchildApi:(pageParams:any) => {
        return clientApi.api.postNuxeoDocumentChildrenThumbnailV2(pageParams)
    },
    idOrPath,
    changeRoute,
})

</script>

<template>
<ElCard class="o-auto">
    <h3>{{ $t('dashboard.cmmnDocumentRoot') }}</h3>
    <SvgIcon v-if="!hideSetting" class="setting--icon" src="/icons/setting.svg" @click="openSetting"/>
    <div v-else class="rootContainer">
        <BrowseMiniTable ref="tableRef" :home="props.setting.home"  >
            <template #toolbar_buttons> 
                <BrowseBreadcrumb :idOrPath="idOrPath" :home="home" />
            </template>
        </BrowseMiniTable>
    </div>
</ElCard>
</template>