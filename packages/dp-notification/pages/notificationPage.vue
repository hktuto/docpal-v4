<template>
  <NuxtLayout class="fit-height withPadding" :pageTitle="$t('notifications.text')">
    <Table
      ref="tableRef"
      :columns="tableSetting.columns"
      :table-data="state.tableData"
      :options="options"
      @command="handleAction"
      @pagination-change="handlePaginationChange"
      @selection-change="handleSelectionChange"
      @row-dblclick="handleDblclick"
      v-loading="state.loading"
    >

      <template #preSortButton>
        <div v-show="state.selectList?.length > 0" class="flex-x-between" style="width: 100%">
          <div class="color__primary">{{$t('notifications.fileSelected')}}({{state.selectList.length}})</div>
          <div class="flex-x-end">
            <el-button text @click="handleClearSelection">{{ $t('notifications.cleanSelection') }}</el-button>
            <el-button type="primary" @click="handleDismissSelected()">{{ $t('notifications.dismissSelected') }}</el-button>
            <el-button type="primary" @click="handleDeleteSelected()">{{ $t('notifications.deletedSelected') }}</el-button>
          </div>
        </div>
        <ResponsiveFilter v-show="!state.selectList || state.selectList?.length === 0" ref="ResponsiveFilterRef" @form-change="handleFilterFormChange"
          />
          <!-- inputKey="description" :inputPlaceHolder="$t('notification.filterByDescription')" -->
      </template>
      <template #description="{row, index}">
        {{ $t(row.content.templateId, {
            userId: row.creator,
            documentName: row.content.documentName,
            businessName: row.content.businessName,
            emailList: row.content.emailList,
            email: row.content.email,
            path: row.content.path,
            fileName: row.content.fileName
          }) }}
      </template>
      <template #readStatus="{row, index}">
        {{ row.readStatus === 'READED' ? $t('notification.read') : $t('notification.unread')}}
      </template>
      <template #moreAction="{row, index}">
        <el-dropdown-item :test-id="`noti-delete-${row.id}`" command="delete">{{ $t('common_delete') }}</el-dropdown-item>
        <el-dropdown-item v-if="row.readStatus === 'CREATE'"  :test-id="`noti-dismiss-${row.id}`" command="dismiss">{{ $t('button.dismiss') }}</el-dropdown-item>
        <el-dropdown-item v-if="notiShowView(row)" :test-id="`noti-view-${row.id}`" command="view">{{ $t('button.view') }}</el-dropdown-item>
      </template>
    </Table>
  </NuxtLayout>
</template>
<script lang="ts" setup>

import { 
  getNotificationList2Api,
  getNotiPageConditionsApi,
  notiDeleteApi,
  notiDissmissByIdsApi,
  datesFormat
} from 'dp-api'
import { notiShowView, notiHandleView } from '../utils/notificationHelper.ts'
const route = useRoute()

const state = reactive<any>({
  tableData: [],
  loading: false,
  selectList: [],
  extraParams: {}
})
// #region module: table setting
  const tableRef = ref()
  const pageParams = {
    pageNum: 0,
    pageSize: 20,
    orderBy: 'createdDate',
    isDesc: true
  }
  const options = reactive({
    multiSelect: true,
    showPagination: true,
    paginationConfig: {
      total: 0,
      currentPage: 1,
      pageSize: pageParams.pageSize
    },
    rowKey: 'id',
    sortKey: 'notification',
    mode: 'normal'
  })
  const tableSetting = {
    columns: [
      { id:0, type: 'selection' },
      { id:1, label: 'workflowEditor.date', prop: 'createdDateTimestamp', defaultColumn: true,
        formatList: [ datesFormat('createdDateTimestamp') ]
      },
      { id:2, label: 'notification.type', prop: 'type', class: 'tag' },
      { id:3, label: 'notification.action', prop: 'operate', class: 'info-tag round' },
      { id:4, label: 'docType_description', prop: 'description', slot: 'description' },
      { id:5, label: 'User', prop: 'creator' },
      { id:6, label: 'notification.read/unread', prop: 'readStatus', slot: 'readStatus'},
      { id:7, label: 'dpTable_actions', moreActionSlot: 'moreAction', "width": 100 },
    ],
    events: [],
    slots: [
    ],
    options: { pageSize: 20 }
  }
// #endregion
// #region module: page
  async function getList (param) {
    try {
      state.loading = true
      const res = await getNotificationList2Api({ ...param, ...state.extraParams })
      res.entryList.map(item => {
        if(typeof item.content === 'string') {
          item.content = JSON.parse(item.content)
          if(typeof item.content.emailList === 'string') item.content.emailList = JSON.parse(item.content.emailList).join(',')
        }
        return item
      })
      state.tableData = res.entryList
      options.paginationConfig.total = res.totalSize
      options.paginationConfig.pageSize = param.pageSize
      options.paginationConfig.currentPage = param.pageNum + 1
    } catch (error) {

    } finally {
      state.loading = false
    }
  }
  function handlePaginationChange (page: number, pageSize?: number) {
    pageParams.pageNum = (Number(page) - 1) || 0
    pageParams.pageSize = Number(pageSize) || pageParams.pageSize
    getList(pageParams)
  }
  watch(
    () => route.query,
    async (newval) => {
      const { page, pageSize } = newval
      nextTick(() => {
        pageParams.pageNum = (Number(page) - 1) || 0
        pageParams.pageSize = Number(pageSize) || pageParams.pageSize
        getList(pageParams)
      })
    },
    { immediate: true }
  )
// #endregion

function handleAction (command:string, row: any, rowIndex: number) {
  switch (command) {
    case 'delete': 
      handleDeleteSelected(row)
      break
    case 'view':
      notiHandleView(row)
    case 'dismiss':
      handleDismissSelected(row)
      break
  }
}

// #region module:select actions
  function handleSelectionChange(selectList) {
    state.selectList = [...selectList]
  }
  function handleClearSelection() {
    tableRef.value.tableRef.clearSelection()
  }
  async function handleDeleteSelected(row: any) {
    let ids: string[] = []
    if(!!row) ids = [row.id]
    else ids = state.selectList.map(item => item.id)
    await notiDeleteApi(ids)
    handlePaginationChange(1)
    if(!!row && row.readStatus === 'READED') return
    updateNotificationUnreadCount()
  }
  
  async function handleDismissSelected(row: any) {
    let ids: string[] = []
    if(!!row) ids = [row.id]
    else ids = state.selectList.map(item => item.id)
    await notiDissmissByIdsApi(ids)
    handlePaginationChange(1)
    if(!!row && row.readStatus === 'READED') return
    updateNotificationUnreadCount()
  }
  function updateNotificationUnreadCount() {
    const ev = new CustomEvent('updateNotificationUnreadCount')
    window.dispatchEvent(ev);
  }
// #endregion
// #region module:  
  const ResponsiveFilterRef = ref()
  async function initCondition () {
    let defaultFilters = []
    try {
      defaultFilters = await getNotiPageConditionsApi()
    } catch (error) {
    }
    const filters = [
      { key: "readStatus", label: "notification.read/unread", type: "string", isMultiple: false,
        options: [
          { label: 'notification.read', value: 'READED' },
          { label: 'notification.unread', value: 'CREATE' }
        ]
      },
      { key: "orderBy", label: "tableHeader.sortBy", type: "string", isMultiple: false,
        options: [
          { label: 'workflowEditor.date', value: 'createdDate' },
          { label: 'docType_description', value: 'description' },
          { label: 'notification.read/unread', value: 'status' },
          { label: 'notification.operator', value: 'createdBy' },
        ]
      },
      { key: "isDesc", label: "tableHeader.sortOrder", type: "string", isMultiple: false,
        options: [
          { label: 'tableHeader.desc', value: false },
          { label: 'tableHeader.asc', value: true }
        ]
      }
    ]
    ResponsiveFilterRef.value.init([...defaultFilters, ...filters ])
  }
  function handleFilterFormChange(formModel) {
    if (!formModel.isDesc) formModel.isDesc = true
    if (!!formModel.isDesc) formModel.isDesc = formModel.isDesc === 'false' ? false : true
    let filterParams = {
        name: formModel.name === "" ? undefined : formModel.name,
        orderBy: formModel.orderBy === undefined || formModel.orderBy === "" ? "createdDate" : formModel.orderBy
    };
    filterParams.isDesc = formModel.isDesc
    state.extraParams = formModel
    handlePaginationChange(1)
  }
// #endregion
onMounted(() => {
  initCondition()
})
</script>
<style lang="scss" scoped>
:deep .headerLeftExpand {
  width: 100%;
  margin-bottom: var(--app-padding);
  .el-input {
    width: 200px;
  }
}
</style>
