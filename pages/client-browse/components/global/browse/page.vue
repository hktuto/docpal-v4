<script lang="ts" setup>
import {BrowseListProviderKey} from '#imports'
import {clientApi} from 'api'
const props = defineProps<{ 
    idOrPath: string ,
    filter: any,
}>();
const { idOrPath } = toRefs(props)
const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)

if(!tabProvider || !routerProvider) {
    throw createError('provider not found')
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
})



</script>

<template>
        
    <div class="pageContainer" >
        <BrowseListTable >
            <template #toolbar_buttons>
                <BrowseListBreadcrumb :idOrPath="idOrPath" />
            </template>
        </BrowseListTable>
    </div>
</template>

<style lang="scss" scoped>

.pageContainer{
    height: 100%;
    position: relative;
    padding: var(--app-space-s);
}
</style>