<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes'

import {clientApi} from 'api'
import {BrowseListTable} from '#components'
import { useEventBus, EventType } from 'eventbus'
import { actions, ActionsFilter } from '../../../../packages/base/utils/browseActions'
const props = defineProps<{ 
    idOrPath: string ,
    filter: any,
    home: any,
    commentId?: string
}>();

const { idOrPath } = toRefs(props)
const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
const selectedItem = ref<any[]>([])
const infoOpened = ref(false)
if(!tabProvider || !routerProvider) {
    throw createError('provider not found')
}
const tableRef = ref<InstanceType<typeof BrowseListTable>>();
const browswInfoRef = ref()
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
    console.log("selected change", selectedRows)
    selectedList.value = selectedRows
}

function closePreview({detail}:any){
    if(!detail) return
    if(detail.id === docDetail.value.id) {
        const newItem = createBrowseListPageParams({
            idOrPath: docDetail.value.parentRef
        })
        routerProvider?.navigateTo(newItem)
    }
}
const docActions = computed(() => {
  if (!docDetail.value || !docPermission.value) return {};
  if(selectedList.value.length > 0) {
    return ActionsFilter(actions, docPermission.value, "showInShare");
  }
  return ActionsFilter(actions, docPermission.value, "showInFolder");
});



function handleClearSelected(){
    if(tableRef.value) {
        tableRef.value.cleanSelected()
    }
}

function handleRefresh(){
    if(tableRef.value) {
        tableRef.value.reload()
    }
}

function itemDeleted(){

}

watch(idOrPath, () => {
    getDoc()

},{
    immediate:true,
})

onActivated(() => {
    if(tableRef.value) {
        tableRef.value.reload()
    }
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

const bus = useEventBus(EventType.FILE_NEED_REFRESH)
bus.on(({relatedIdOrPath, highlightIdOrPath}:any) => {
    console.log("relatedIdOrPath", {
        editedid: relatedIdOrPath,
        pageId: docDetail.value.id,
        pageName: docDetail.value.name
    } )
    if(relatedIdOrPath === docDetail.value.id) {
        handleRefresh()
        
    }
})

const minSize = ref(20)
function calMinWidth(){
    // panel size is 280px, check the percentage of window width
    const windowWidth = window.innerWidth
    minSize.value = 280 / windowWidth * 100

}

useEventListener(window, 'resize', calMinWidth)

useEventListener(document, 'closeFilePreview', closePreview)
</script>

<template> 
<div class="browseContainer">
    <splitpanes>

    <Pane>
    <BrowseListTable ref="tableRef" 
        :class="{'selected': selectedList.length > 0}" 
        :selectedRows="selectedItem"
        @selectedChange="selectedChangeHandler">
        <template #toolbar_buttons> 
            <slot name="toolbar_buttons">
                <div class="toolsBarContainer">
                    <template v-if="selectedList.length === 0">
                        <BrowseBreadcrumb :idOrPath="idOrPath" :home="home" />
                    </template>
                    <template v-else>
                        <div class="selectedNoteContainer">
                            {{ $t("dpDocument_fileSelected") }}({{ selectedList.length }})
                            <Icon name="mdi:close" @click="handleClearSelected" />
                        </div>
                    </template>
                </div>
            </slot>
            <slot name="toolbarTools">
                <CollapseMenu v-if="idOrPath !== '/'">
                    <template #default="{ collapse }">
                        <template v-for="(group, key) in docActions" :key="key">
                            <template v-for="item in group" :key="item.name">
                                <component
                                    :is="item.component"
                                    :doc="docDetail"
                                    :permission="docPermission"
                                    :selectedList="selectedList"
                                    @clearSelected="handleClearSelected"
                                    @success="handleRefresh"
                                    @delete="itemDeleted"
                                />
                            </template>
                            <div :class="{ actionDivider: true, collapse }"></div>
                        </template>
                    </template>
                </CollapseMenu>
                <BrowseActionsInfo
                    v-if="idOrPath !== '/'"
                    :doc="docDetail"
                    :permission="docPermission"
                    @itemClicked="infoOpened = !infoOpened"
                />
            </slot>
        </template>
    </BrowseListTable>
    </Pane>
    <Pane v-if="idOrPath !== '/' && infoOpened" :min-size="minSize" :size="minSize">
        <BrowseInfo 
            :doc="docDetail" 
            :permission="docPermission"
            :infoOpened="infoOpened" 
            :commentId="commentId" 
            @close="infoOpened = false"
            @refresh="handleRefresh"
        />
    </Pane>
    </splitpanes>
</div>
</template>

<style lang="scss" scoped>
.browseContainer{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
.selectedNoteContainer{
    padding-left: var(--app-space-s);
    line-height: 1;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: var(--app-space-xs);
}
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