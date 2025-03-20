<script lang="ts" setup>
import { clientApi } from "api";
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
    return {};
  }
}
// #region module: tableRef
  const tableRef = ref()
  function handleShowColumn(){
    const displayColumns = props.setting.displayColumns.reduce((prev: any, columnId: any) => {
      const column = state.detail.primaryForm.fields.find((p: any) => p.id === columnId)
      if(!!column) prev.push(column)
      return prev
    }, [])
    tableRef.value.reorderColumn(displayColumns)
  }
  function handleRefreshTable() {
    tableRef.value.reload()
  }
// #endregion

watch(
  () => props.setting.caseId,
  async(newVal, oldVal) => {
    if(!newVal) return
    state.detail = await getCaseDetail(newVal);
    handleShowColumn()
    handleRefreshTable()
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-card">
    <template #header="{ close, titleId, titleClass }">
      <h4>{{ props.setting.caseLabel }}</h4>
      <div class="flex-x-between">
        <el-button v-if="props.setting.caseId" type="primary" @click="handleAddCaseDialog">
              {{ $t(props.setting.newButtonLabel) }}
            </el-button>
        <SvgIcon  v-if="!hideSetting"
          src="/icons/setting.svg"
          class="el-icon--right"
          style="--icon-size: 1.14rem; --icon-color: #8796a4"
          @click="openSetting"
        />
      </div>
    </template>
    <div class="workflow-create-content">
      <PersonalCaseSingleTable ref="tableRef" :id="setting.caseId" :detail="state.detail" />
    </div>
    <PersonalCaseSingleSetting
      ref="settingRef"
      @delete="handleDelete"
      @refresh="handleRefresh"
    />
    
  <LazyCaseAddCaseDialog ref="addCaseDialog" @refresh="handleRefreshTable"></LazyCaseAddCaseDialog>
  </el-card>
</template>
<style lang="scss" scoped>
.workflow-create-content {
  height: 100%;
}
</style>
