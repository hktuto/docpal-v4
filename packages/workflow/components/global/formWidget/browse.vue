<script lang="ts" setup>

import { useEventBus, EventType } from 'eventbus'
import { clientApi } from 'api'
const bus = useEventBus(EventType.FILE_NEED_REFRESH)
const home = ref({secondId:'8fbbac85-5998-429f-ab00-a0e67f3f5ff8'})
const idOrPath = ref('8fbbac85-5998-429f-ab00-a0e67f3f5ff8')

bus.on(({relatedPath}) => {
    if(relatedPath === idOrPath.value) {
        handleRefresh()
    }
})

const {disabled, formData, options} = defineProps<{
    disabled: boolean,
    formData: any
    options?: Object,
}>();

function getFormData(){
    console.log("getFormData")
    // if no data , return empty
    return {}
}

function changeRoute(path:string) {
    idOrPath.value = path
}

function getInfo(){
    // get options
    console.log("getInfo", options.data.folderCabinetId, formData)
    if(options.data.folderCabinetId && formData[options.data.folderCabinetId]) {
        // console.log({formData});
        home.value = formData[options.data.folderCabinetId]
    }
}

defineExpose({ getFormData })

provide(BrowseListProviderKey,{
    getchildApi:(pageParams:any) => {
        return clientApi.api.postNuxeoDocumentChildrenThumbnailV2(pageParams)
    },
    idOrPath,
    changeRoute,
})

onMounted(() => {
    getInfo()
})
</script>

<template>
    <div class="browse-cabinet-container">
     <BrowseMiniTable :home="home" >
        <template #toolbar_buttons> 
            <BrowseBreadcrumb :idOrPath="idOrPath" :home="home" />
        </template>
    </BrowseMiniTable>
    </div>
</template>

<style lang="scss" scoped>
.browse-cabinet-container{
    height: 600px;
    position: relative;
}
</style>