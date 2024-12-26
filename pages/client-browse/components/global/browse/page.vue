<script lang="ts" setup>
import {BrowseListProviderKey} from '#imports'
import {clientApi} from 'api'
import { ElSwitch } from 'element-plus';
import {BrowseListTable} from '#components'
const props = defineProps<{ 
    idOrPath: string ,
    filter: any,
}>();
const { idOrPath } = toRefs(props)
const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
const selectedItem = ref<any[]>([])
if(!tabProvider || !routerProvider) {
    throw createError('provider not found')
}
const tableRef = ref<InstanceType<typeof BrowseListTable>>();
function addToSelection(items: any[]){
    selectedItem.value.push(...items)
}
function removeFromSelection(items: any[]){
    selectedItem.value = selectedItem.value.filter(item => !items.includes(item))
}


function changeRoute(path:string) {
    // change route, update tab
    // clean filter
    routerProvider?.updateProps({
        idOrPath: path,
        filter: {}
    })
}
provide(BrowseListProviderKey,{
    getchildApi:(pageParams:any) => {
        return clientApi.documentNuxeo.postThumbnailV2(pageParams)
    },
    idOrPath,
    changeRoute,
    addToSelection,
    removeFromSelection,
    
})



</script>

<template>
        
    <div class="pageContainer" >
        <BrowseListTable ref="tableRef" >
            <template #toolbar_buttons>
                <div :id="routerProvider.tabData.value.id +'_action'" class="toolsBarContainer">
                    <BrowseBreadcrumb :idOrPath="idOrPath" />
                </div>
                
            </template>
        </BrowseListTable>
    </div>
</template>

<style lang="scss" scoped>
.actionRow{
    width:auto;
    display: flex;
    flex-flow: column nowrap;
}
.pageContainer{
    height: 100%;
    position: relative;
    padding: var(--app-space-s);
}
</style>