<script lang="ts" setup>
import { clientApi } from "api";
import { nextTick } from "vue";
const emits = defineEmits(["delete", "refreshSetting"]);

const props = withDefaults(
  defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean;
  }>(),
  {
    setting: {},
    hideSetting: false,
  }
);

const state = reactive<any>({
  detail: {}
})
const settingRef = ref();
function openSetting() {
  settingRef.value.handleOpen(props.setting);
}
function handleRefresh(chartSetting: any) {
  emits("refreshSetting", chartSetting);

}
async function handleDelete() {
  emits("delete");
}

const addCaseDialog = ref();

function handleAddCaseDialog() {
  addCaseDialog.value.handleOpen(props.setting.caseId, state.detail);
}
async function getCaseDetail(caseId: string) {
  try {
    const res = await clientApi.api.getCaseTypesCasetypeid(caseId).then((res) => res.data);
    return res
  } catch (error) {
    console.log("get cast type error", error)
    return {};
  }
}
// #region module: tableRef
  const tableRef = ref()
  function handleShowColumn(){
    const displayColumns = props.setting.displayColumns.reduce((prev: any, columnId: any) => {
      if( state?.detail?.primaryForm?.fields) {
        const column = state.detail.primaryForm.fields.find((p: any) => p.id === columnId)
        if(!!column){ 
          prev.push(column)
        }
        // check if the field is default fields
        if(columnId === 'case_id'){
          prev.push({id: 'case_id', name: 'caseManagement.name', minWidth: 200})
        }else if(columnId === 'created_date'){
          prev.push({id: 'created_date', name: 'workflow_createDate', minWidth: 200, formatter({ cellValue }: any) {
            return formatDate(cellValue)
          }})
        }else if(columnId === 'modified_date'){
          prev.push({id: 'modified_date', name: 'table_modifiedDate', minWidth: 200, formatter({ cellValue }: any) {
            return formatDate(cellValue)
          }})
        }
      }
      return prev
    }, [])
    tableRef.value.reorderColumn(displayColumns)
  }
  function handleRefreshTable() {
    
    tableRef.value.reload()
    
  }
// #endregion

watch(
  () => props.setting,
  async() => {
    if(!props.setting || !props.setting.caseId) return
    state.detail = await getCaseDetail(props.setting.caseId);
    handleShowColumn()
    handleRefreshTable()
  },
  {
    immediate: true,
    deep:true
  }
);
</script>
<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-card">
    <template #header="{ close, titleId, titleClass }">
      <h4>{{ props.setting.caseLabel }}</h4>
      <div class="flex-x-between">
        
        <SvgIcon
          id="Dashboard__Home__Detail__SingleCase__Settings"
          v-if="!hideSetting"
          src="/icons/setting.svg"
          class="el-icon--right"
          style="--icon-size: 1.14rem; --icon-color: #8796a4; font-size: 20px"
          @click="openSetting"
        />
      </div>
    </template>
    <div class="workflow-create-content">
      <PersonalCaseSingleTable ref="tableRef" :id="setting.caseId" :detail="state.detail" >
        <template #table_right>
            <el-button v-if="props.setting.caseId" type="primary" @click="handleAddCaseDialog">
              {{ $t(props.setting.newButtonLabel) }}
            </el-button>
        </template>
      </PersonalCaseSingleTable>
    </div>
    <PersonalCaseSingleSetting
      ref="settingRef"
      @delete="handleDelete"
      @refresh="handleRefresh"
    />
    
  <LazyCaseAddCaseDialog ref="addCaseDialog" :label="setting.caseLabel" @refresh="handleRefreshTable"></LazyCaseAddCaseDialog>
  </el-card>
</template>
<style lang="scss" scoped>
.workflow-create-content {
  height: 100%;
}
</style>
