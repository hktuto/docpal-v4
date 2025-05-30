<script lang="ts" setup>
import { provide } from 'vue'
import { clientApi } from 'api'
import { BrowseTable } from '#components'
import { actions, ActionsFilter, BrowseListProviderKey } from '#imports'

const emits = defineEmits(['delete', 'refreshSetting'])
const { t } = useI18n()

const props = withDefaults(defineProps<{
  idOrPath: string
  home?: any
  commentId?: string
  setting?: any
  hideSetting?: boolean
}>(), {
  idOrPath: '/',
  home: [],
  commentId: '',
  setting: {},
  hideSetting: true
})

const { idOrPath, commentId } = toRefs(props)
const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
const selectedItem = ref<any[]>([])
const infoOpened = ref(false)
if (!tabProvider || !routerProvider) {
  throw createError('provider not found')
}

const { cardRef, refresh, loading, } = useDashboardCard({
  props,
  handleRefreshAction: (setting: any) => {
    settingRef.value.handleOpen({})
  }
})

async function handleDelete() {
  emits('delete')
}

function handleRefresh(chartSetting: any) {
  emits('refreshSetting', chartSetting)
}

const tableRef = ref<InstanceType<typeof BrowseTable>>()

function addToSelection(items: any[]) {
  selectedItem.value.push(...items)
}

function removeFromSelection(items: any[]) {
  selectedItem.value = selectedItem.value.filter((item) => !items.includes(item))
}

function changeRoute(path: string) {
  routerProvider?.updateProps({
    idOrPath: path
  })
}

const docDetail = ref()
const docPermission = ref()
const selectedList = ref<any[]>([])


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

function handleClearSelected() {
  if (tableRef.value) {
    tableRef.value.cleanSelected()
  }
}

function itemDeleted() {
}

const settingRef = ref()

provide(BrowseListProviderKey, {
  getchildApi: (pageParams: any) => {
    return clientApi.api.postNuxeoDocumentChildrenThumbnailV2(pageParams)
  },
  idOrPath,
  docDetail,
  docPermission,
  changeRoute,
  addToSelection,
  removeFromSelection
})

function handleRefresh1(setting: any){
  // props.setting.idOrPath = setting.path
  // refresh()
}

function openSetting(){
  settingRef.value.handleOpen(props.setting)
}

</script>

<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    class="dp-dashboard--card__padding"
    :settingRef="settingRef"
    :hideSetting="hideSetting"
    :title="$t('dashboard.Browse')"
    :setting="setting"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <BrowseTable ref="tableRef"
                 :class="{ selected: selectedList.length > 0 }"
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
          <BrowseActionsInfo v-if="idOrPath !== '/'" :doc="docDetail" :permission="docPermission"
                             @itemClicked="infoOpened = !infoOpened" />
        </slot>
      </template>
    </BrowseTable>

    <BrowseSetting ref="settingRef" @refresh="handleRefresh" />

  </DashboardCard>
</template>

<style scoped lang="scss">

</style>
