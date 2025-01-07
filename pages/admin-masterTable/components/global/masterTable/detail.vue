<script lang="ts" setup>
import { adminApi } from "api";
import type { MasterTableResponseDTO } from "api/src/generate/admin";
import { getIgnoreSchemas } from "~/utils/masterTableProvider";
const { id } = defineProps<{
  id: string;
}>();
const ignoreList = getIgnoreSchemas();
const state = reactive<{
  activeName: string;
  masterTable: MasterTableResponseDTO | undefined;
  templateLoading: boolean;
  importLoading: boolean;
  exportLoading: boolean;
}>({
  activeName: "records",
  masterTable: {
    name: "",
    fields: [],
    status: "A",
  },
  templateLoading: false,
  importLoading: false,
  exportLoading: false,
});
function handleClick(tab: any) {
  state.activeName = tab.name;
}
const MasterTableTabRecordsRef = ref();
async function init() {
  const res = await adminApi.api.getMasterTablesId(id);
  const detail = res.data;
  state.masterTable = detail;

  MasterTableTabRecordsRef.value.initTableColumns(detail?.fields);
}
async function handleTemplateDownload() {
  try {
    state.templateLoading = true;
    const res = await adminApi.api.getMasterTablesIdRecordTemplate(id, {},{ 
        format: 'blob',
        timeout: 0 
    })
    downloadBlob(res, state.masterTable?.name + "-template");
  } catch (error) {}
  finally {
    state.templateLoading = false;
  }
}
const inputRef = ref()
function handleImport() {
  inputRef.value.click()
}
// TODO: 导入文件接口改造
async function handleFile(event: any) {
  // try {
  //   state.importLoading = true
    // const json = await xlsxToJson(event.target.files[0])
    
    // const data = await ImportMasterTablesJsonApi({
    //     id: route.params.id,
    //     data: json
    // })
    const formData:any = new FormData()
    formData.append('file', event.target.files[0])
    formData.append('id', id)
    console.log("formData", formData)
    
    const data = await adminApi.masterTableController.postFile({requestDTO:{}},formData).then(res => res.data)
    console.log("data", data)
    // if (data?.failureNumber > 0) downloadFailList()
    event.target.value = ''
  //   handleRefresh()
  // } catch (error) {
  // } finally {
  //   state.importLoading = false
  // }
}
async function handleExport() {
  try {
    state.exportLoading = true
    const res = await adminApi.api.postMasterTablesIdRecordExport(id, {},{
      format: 'blob',
      timeout: 0
    })
    downloadBlob(res, state.masterTable?.name as string)
  } catch (error) {
  } finally {
    state.exportLoading = false
  }
}
const MasterTableNewRowDialogRef = ref()
function handleAddRow (row: any = null) {
  MasterTableNewRowDialogRef.value.handleOpen(state.masterTable?.fields, row)
}
function handleRefresh() {
  MasterTableTabRecordsRef.value.query()
}
onMounted(() => {
  init();
});
</script>

<template>
  <div class="pageContainer--padding">
    <el-tabs class="dp-tabs--auto" v-model="state.activeName" @tab-change="handleClick">
      <el-tab-pane :label="$t('masterTable.records')" name="records">
        <MasterTableRecords
          ref="MasterTableTabRecordsRef"
          :tableId="id"
        ></MasterTableRecords>
      </el-tab-pane>
      <el-tab-pane :label="$t('masterTable.schema')" name="schema">
        <MasterTableTabSchema
          ref="MasterTableTabSchemaRef"
          :masterTableDetail="state.masterTable"
          :tableId="id"
          @refresh="init"
        ></MasterTableTabSchema>
      </el-tab-pane>
      <el-tab-pane :label="$t('masterTable.log')" name="log">
        <MasterTableTabLog
          v-if="state.masterTable?.name"
          :tableName="state.masterTable.name"
          :isDetail="true"
        ></MasterTableTabLog>
      </el-tab-pane>
      <el-tab-pane :label="$t('masterTable.setting')" name="setting">
        <MasterTableTabSetting :table="state.masterTable"></MasterTableTabSetting>
      </el-tab-pane>
    </el-tabs>
    <div class="absolute-btns">
      <el-button
        :loading="state.templateLoading"
        type="info"
        @click="handleTemplateDownload()"
        >{{ $t("button.templateDownload") }}</el-button
      >
      <el-button :loading="state.importLoading" type="info" @click="handleImport()">{{
        $t("button.importXLXS")
      }}</el-button>
      <el-button :loading="state.exportLoading" type="info" @click="handleExport()">{{
        $t("button.export")
      }}</el-button>
      <el-button type="primary" @click="handleAddRow()">{{ $t("button.add") }}</el-button>
    </div>
    <MasterTableRecordAddDialog
      ref="MasterTableNewRowDialogRef"
      :ignoreList="ignoreList" :tableId="id"
      @refresh="handleRefresh()"
    />
    <input
      v-show="false"
      ref="inputRef"
      type="file"
      accept=".xlsx,.xls"
      @change="handleFile"
    />
  </div>
</template>
<style lang="scss" scoped>
.pageContainer--padding {
  position: relative;
}
.dp-tabs--auto {
  height: 100%;
  .el-tab-pane {
    height: 100%;
  }
}
.absolute-btns {
  position: absolute;
  right: calc(var(--app-space-xs) * 2);
  top: calc(var(--app-space-xs) * 2);
}
</style>
