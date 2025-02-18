<script lang="ts" setup>
import {BrowseListProviderKey} from '#imports'
import {clientApi} from 'api'
import {BrowseListTable} from '#components'
import { actions, ActionsFilter } from '../../../../packages/base/utils/browseActions'
const props = defineProps<{ 
    idOrPath: string ,
    filter: any,
    home: any,
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

const docDetail = ref()
const docPermission = ref()
const selectedList = ref<any[]>([])

async function getDoc(){
    docDetail.value = null
    docPermission.value = null
    selectedList.value = []
    const userId = useUserId()
    const { doc, permission } = await getDocDetail(idOrPath.value, userId.value);
    docDetail.value = doc
    docPermission.value = permission
}
function selectedChangeHandler(selectedRows:any[]) {
    selectedList.value = selectedRows
}
const folderActions = computed(() => {
  if (!docDetail.value || !docPermission.value) return {};
  return ActionsFilter(actions, docPermission.value, docDetail.value.isFolder ? "showInFolder" : "showInDetail");
});

const shareActions = computed(() => {
    if (!docDetail.value || !docPermission.value) return {};
  return ActionsFilter(actions, docPermission.value, "showInShare");
});



function handleRefresh(){

}

function itemDeleted(){

}

watch(idOrPath, () => {
    getDoc()
},{
    immediate:true,
})

provide(BrowseListProviderKey,{
    getchildApi:(pageParams:any) => {
        return clientApi.api.postNuxeoDocumentChildrenThumbnailV2(pageParams)
    },
    idOrPath,
    docDetail,
    docPermission,
    changeRoute,
    addToSelection,
    removeFromSelection,
})



</script>

<template> 
    <BrowseListTable ref="tableRef" @selectedChange="selectedChangeHandler">
        <template #toolbar_buttons> 
            <slot name="toolbar_buttons">
                <div class="toolsBarContainer">
                    <BrowseBreadcrumb :idOrPath="idOrPath" :home="home" />
                </div>
            </slot>
            <slot name="toolbarTools">
                <template v-if="selectedList.length === 0">
                    <CollapseMenu>
                        <template #default="{ collapse }">
                            <template v-for="(group, key) in folderActions" :key="key">
                            <template v-for="item in group" :key="item.name">
                                <component
                                :is="item.component"
                                :doc="docDetail"
                                :permission="docPermission"
                                @success="handleRefresh"
                                @delete="itemDeleted"
                                />
                            </template>
                            <div :class="{ actionDivider: true, collapse }"></div>
                            </template>
                        </template>
                    </CollapseMenu>
                </template>
                <template v-else>
                    <CollapseMenu>
                        <template #default="{ collapse }">
                            <template v-for="(group, key) in shareActions" :key="key">
                                <template v-for="item in group" :key="item.name">
                                    <component
                                    :is="item.component"
                                    :doc="docDetail"
                                    :permission="docPermission"
                                    @success="handleRefresh"
                                    @delete="itemDeleted"
                                    />
                                </template>
                                <div :class="{ actionDivider: true, collapse }"></div>
                            </template>
                        </template>
                    </CollapseMenu>
                </template>
            </slot>
        </template>
    </BrowseListTable>
</template>

<style lang="scss" scoped>
.toolsBarContainer{
    flex: 1 0 auto;
}
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
.actionDivider {
    --icon-size: 1.14rem;
  height: calc(var(--icon-size) + 16px);
  width: 1px;
  background: var(--app-grey-950);
  &.collapse {
    width: 100%;
    height: 1px;
  }
}
</style>