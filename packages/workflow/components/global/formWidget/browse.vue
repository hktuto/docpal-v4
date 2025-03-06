<script lang="ts" setup>

import { clientApi } from 'api'
const home = ref({secondId:'/default-domain/sean test'})
const idOrPath = ref('/default-domain/sean test')

const tableRef = ref()
function handleRefresh(){
    if(tableRef.value) {
        tableRef.value.reload()
    }
}

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
    if(options.data.folderCabinetId && formData[options.data.folderCabinetId]) {
        // console.log({formData});
        home.value = {
            secondId: formData[options.data.folderCabinetId]
        }
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
     <BrowseMiniTable v-if="home.secondId" ref="tableRef" :home="home" >
        <template #toolbar_buttons> 
            <BrowseBreadcrumb :idOrPath="idOrPath" :home="home" />
        </template>
    </BrowseMiniTable>
    <template v-else>
        No data
    </template>
    </div>
</template>

<style lang="scss" scoped>
.browse-cabinet-container{
    height: 600px;
    position: relative;
}
</style>