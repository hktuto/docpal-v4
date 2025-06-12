<script lang="ts" setup>
import { Pane, Splitpanes } from 'splitpanes'

import { clientApi } from 'api'
import { EventType, useEventBus, emitBus } from 'eventbus'
import { actions, ActionsFilter } from '~/../base/utils/browseActions'

const props = withDefaults(defineProps<{
  idOrPath: string
  home?: any
  commentId?: string
  expandedItems: any[]
  isReload?: boolean
}>(), {
  idOrPath: '/',
  expandedItems: [],
  isReload: false
})

const { idOrPath, commentId, expandedItems } = toRefs(props)
const currentIdOrPath = ref(idOrPath.value)
const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
const selectedItem = ref<any[]>([])
const infoOpened = ref(false)
if (!tabProvider || !routerProvider) {
  throw createError('provider not found')
}
const tableRef = ref<InstanceType<typeof BrowseTable>>()
const browswInfoRef = ref()

function addToSelection(items: any[]) {
  selectedItem.value.push(...items)
}

function removeFromSelection(items: any[]) {
  selectedItem.value = selectedItem.value.filter((item) => !items.includes(item))
}

function changeRoute(path: string) {
  currentIdOrPath.value = path
  if(props.isReload) {
    routerProvider?.updateProps({
        idOrPath: path
    })
  }
}

const docDetail = ref()
const docPermission = ref()
const selectedList = ref<any[]>([])

async function getDoc() {
  docDetail.value = null
  docPermission.value = null
  selectedList.value = []
  const userId = useUserId()
  const { doc, permission } = await getDocDetail(idOrPath.value, userId.value)
  if (!doc.isFolder) {
    tabProvider?.openInCurrentTab(
      createDetailPageParams({
        docName: doc.name,
        idOrPath: doc.id,
        commentId: commentId,
        showHeaderAction: true
      })
    )
  } else {
    docDetail.value = doc
    docPermission.value = permission
    console.log("docDetail", docDetail.value)
  }
}

function selectedChangeHandler(selectedRows: any[]) {
  selectedList.value = selectedRows
}

function closePreview({ detail }: any) {
  if (!detail) return
  if (detail.id === docDetail.value.id) {
    const newItem = createBrowseListPageParams({
      idOrPath: docDetail.value.parentRef
    })
    routerProvider?.navigateTo(newItem)
  }
}

const docActions = computed(() => {
  if (!docDetail.value || !docPermission.value) return {}
  if (selectedList.value.length > 0) {
    return ActionsFilter(actions, docPermission.value, 'showInShare')
  }
  return ActionsFilter(actions, docPermission.value, 'showInFolder')
})

function handleSelectAll() {
  if (tableRef.value) {
    tableRef.value.selectAll()
  }
}

function handleClearSelected() {
  if (tableRef.value) {
    tableRef.value.cleanSelected()
  }
}

async function handleRefresh() {
  getDoc()
  if (tableRef.value) {
    tableRef.value.reload()
    setTimeout(() => {
      if(tableRef.value) {
        tableRef.value.tableConfig.loading = false
      }
    },2000)
  }
}

async function handleRefreshChild(childId: string) {
  if (tableRef.value) {
    const tableData: any = tableRef.value?.tableRef?.getData()
    const cItem = findNodeById({children:tableData}, childId)
    if (!!cItem) tableRef.value?.tableRef?.reloadTreeExpand(cItem)
    console.log('handleRefreshChild', cItem);
  }
  
  function findNodeById(node: any, targetId) {
    // 当前节点匹配时直接返回
    if (node.id === targetId) {
      return node
    }
    // 遍历子节点递归查找
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const found = findNodeById(child, targetId)
        if (found) {
          return found // 找到则立即返回
        }
      }
    }
    return null // 未找到返回null
  }
}

function itemDeleted() {}

watch(
  [idOrPath, commentId],
  (newVal, oldVal) => {
    getDoc()
    currentIdOrPath.value = newVal[0]
    if (newVal && newVal[1]) {
      infoOpened.value = true
    } else if (oldVal && oldVal[1]) {
      infoOpened.value = false
    }
  },
  {
    immediate: true
  }
)

onMounted(() => {
  if (tableRef.value) {
    tableRef.value.reload()
  }
})

provide(BrowseListProviderKey, {
  getchildApi: (pageParams: any) => {
    return clientApi.api.postNuxeoDocumentChildrenThumbnailV2(pageParams)
  },
  idOrPath : currentIdOrPath,
  docDetail,
  docPermission,
  changeRoute,
  addToSelection,
  removeFromSelection
})




const bus = useEventBus(EventType.FILE_NEED_REFRESH)
bus.on((ids: any) => {
  if(!ids) return
  const relatedIdOrPath = ids?.relatedIdOrPath
  emitBus(EventType.FILE_CLEAN_SELECTED_ROWS)
  // console.log(relatedIdOrPath, docDetail.value.id)
  if(!relatedIdOrPath || !docDetail.value?.id) return
  if (relatedIdOrPath !== docDetail.value?.id) {
    handleRefreshChild(relatedIdOrPath)
  }
  // check id relatedIdOrPath is chidlren of current page
  // TODO: check if highlightIdOrPath is chidlren of current page
  else if (relatedIdOrPath === docDetail.value.id) {
    console.log('relatedIdOrPath')
    handleRefresh()
  }
})

const minSize = ref(30)

const browseContainer = ref()
function calMinWidth() {
  // panel size is 280px, check the percentage of window width
  const containerSize = browseContainer.value?.getBoundingClientRect() as any
  if(!containerSize) return;
  minSize.value = Number(((400 / containerSize.width) * 100).toFixed(0))
}
function expandedItemsChangeHandler(updateEexpandedItems: any[]) {
  if(props.isReload) {
    routerProvider?.updateProps({
        expandedItems: updateEexpandedItems
    })
  }
}

useEventListener(window, 'resize', calMinWidth)

useEventListener(document, 'closeFilePreview', closePreview)
</script>

<template>
  <div ref="browseContainer" class="browseContainer">
    <splitpanes>
      <Pane>
        <BrowseTable ref="tableRef"
          :class="{ selected: selectedList.length > 0 }" 
          :selectedRows="selectedItem" 
          :expandedItems="expandedItems"
          @selectedChange="selectedChangeHandler"
          @expandedItemsChange="expandedItemsChangeHandler" >
          <template #toolbar_buttons>
            <slot name="toolbar_buttons">
              <div class="toolsBarContainer">
                <template v-if="selectedList.length === 0">
                  <BrowseBreadcrumb :idOrPath="currentIdOrPath" :home="home" />
                </template>
                <template v-else>
                  <div class="selectedNoteContainer">
                    {{ $t('dpDocument_fileSelected') }}: {{ selectedList.length }}
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
              <BrowseActionsInfo v-if="idOrPath !== '/'" :doc="docDetail" :permission="docPermission" @itemClicked="infoOpened = !infoOpened" />
            </slot>
          </template>
        </BrowseTable>
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
.browseContainer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.selectedNoteContainer {
  padding-left: var(--app-space-s);
  line-height: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: var(--app-space-xs);
}

.toolsBarContainer {
  flex: 1 0 auto;
}

.actionRow {
  width: auto;
  display: flex;
  flex-flow: column nowrap;
}

.pageContainer {
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
