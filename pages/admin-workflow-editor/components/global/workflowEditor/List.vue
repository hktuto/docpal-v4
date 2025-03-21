<script lang="ts" setup>
import {adminApi} from 'api';

const {t} = useI18n()
const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw createError('menu manger not found')
}

const tableRef = ref()

async function openLastestVersion(data: any, openInNewTab = false) {

  // REMARK: 在列表頁面是拿不到 version 的 draftId 的，所以需要先取得 version 再打开
  // const {data:{ entryList}} = await adminApi.api.postWorkflowVersionPage({draftId:data.id, orderBy:'versionNumber', isDesc:true, pageSize:1})
  // console.log("openLastestVersion", entryList)
  const params: NewWorkflowVersionDetailParams = {
    id: data.id,
    name: data.name,
    draftId: data.id,
    versionNumber: data.latestVersion,
    versionId: data.latestVersionId
  }
  let newItem = newWorkflowEditorDetail(params) as any;
  newItem.props.currentVersion = data.latestVersion
  routerProvider?.navigateTo({...newItem}, openInNewTab)
}

function openProductionVersion(data: any, openInNewTab = false) {
  // TODO: open detail page
  const praams = {
    ...data,
    versionNumber: data.productionVersion,
    versionId: data.productionVersionId,
    draftId: data.id,
  }
  const newItem = newWorkflowEditorDetail(praams) as any;
  routerProvider?.navigateTo({...newItem}, openInNewTab)

}

const saveAsDialogRef = ref()
const newWorkflowDialogData = ref({
  latestVersion: "V1"
})

function saveAsNewWorkflow(data: any) {
  newWorkflowDialogData.value = data
  nextTick(() => {
    saveAsDialogRef.value.open()
  })
}

function openVersions(data: any, openInNewTab = false) {

  const newItem = newWorkflowEditorVerionList(data);

  routerProvider?.navigateTo({...newItem}, openInNewTab)
}

const newDialogRef = ref()

function createNewWorkflow() {
  newDialogRef.value.handleOpen()
}

function actionPermission({row, rowIndex, code}: any) {
  if (code === 'delete') {
    return {
      visible: row.status === 'A',
      disabled: false
    }
  }

  return {
    visible: true,
    disabled: false
  }
}

async function deleteWorkflow(row: any) {
  const {data} = await adminApi.api.deleteWorkflowProcessDefinitionRemoveDraftid(row.id)
  if (data) {
    routerProvider?.message?.success(t('dpMsg_success'))
    reload()
  }
}

async function activeWorkflow(row: any) {
  await adminApi.api.postWorkflowProcessDefinitionActiveDraftid(row.id)
  routerProvider?.message?.success(t('dpMsg_success'))
  reload()
}

provide(WorkflowEditorListProviderKey, {
  saveAsNewWorkflow,
  openProductionVersion,
  openLastestVersion,
  openVersions,
  createNewWorkflow,
  actionPermission,
  deleteWorkflow,
  activeWorkflow,
  getListApi: (params) => {
    // Object.keys(filter.value).forEach(key => {
    //     if(filter.value[key]) {
    //         params[key] = filter.value[key]
    //     }
    // })
    return adminApi.api.postWorkflowProcessDefinitionDraftPage(params)
  }
})

const ResponsiveFilterRef = ref()
const filter = ref<any>({});

function handleFilterFormChange(formModel: any) {
  filter.value = formModel;
  reload()
}

// async function getFilter() {
//   const data = [
//     {
//         key: "publishStatus", label: "common_status", type: "string", isMultiple: false,
//         options: [
//             { label: 'active', value: 'A' },
//             { label: 'inactive', value: 'P' }
//         ]
//     },
//   ]
//   ResponsiveFilterRef.value.init(data)

// }

onMounted(() => {
  // getFilter()
})

function handleSaveAsOrCreate(data: any) {
  const params: NewWorkflowVersionDetailParams = {
    id: data.draftId,
    name: data.name,
    draftId: data.draftId,
    versionNumber: data.latestVersion,
    versionId: data.latestVersionId,
  }
  let newItem = newWorkflowEditorDetail(params) as any;
  newItem.props.currentVersion = data.latestVersion
  routerProvider?.navigateTo({...newItem}, false)
  reload()
}

function reload() {
  console.log("reload")
  if (tableRef.value && tableRef.value.reload) {
    tableRef.value.reload()
  }
}

</script>

<template>
  <div class="pageContainer">
    <!-- <TablePage :config="tableConfig" /> -->
    <LazyWorkflowEditorWorkflowListTable ref="tableRef">
      <template #toolbar_buttons>
        <div class="flex-x-end">
          <ElButton id="WorkflowEditor__CreateNewWorkflow" type="primary" @click="createNewWorkflow">
            {{ t('workflow_editorCreate') }}
          </ElButton>
        </div>

        <div class="actions">
          <!-- <div class="filter">

              <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange"  />
          </div> -->
        </div>
      </template>
    </LazyWorkflowEditorWorkflowListTable>
    <LazyWorkflowEditorNewDialog ref="newDialogRef" @created="handleSaveAsOrCreate"/>
    <LazyWorkflowEditorSaveAsDialog ref="saveAsDialogRef" :copyVersion="newWorkflowDialogData.latestVersion"
                                    :data="newWorkflowDialogData" @close="reload" @created="handleSaveAsOrCreate"/>
  </div>
</template>

<style lang="scss" scoped>
.pageContainer {
  padding: var(--app-space-s);
  height: 100%;
  overflow: hidden;
  position: relative;
}

.actions {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content;
}

.flex-x-end {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>