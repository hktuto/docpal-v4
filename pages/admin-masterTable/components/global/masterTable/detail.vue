<script lang="ts" setup>
import { adminApi } from 'api';
import type { MasterTableResponseDTO } from 'api/src/generate/admin'
import { getIgnoreSchemas } from '~/utils/masterTableProvider';
const { id } = defineProps<{
  id: string;
}>();
const ignoreList = getIgnoreSchemas()
const state = reactive<{
  activeName: string,
  masterTable: MasterTableResponseDTO | undefined
}>({
  activeName: "records",
  masterTable: {
    name: "",
    fields: [],
    status: "A"
  }
})
function handleClick(tab: any) {
  state.activeName = tab.name
}
const MasterTableTabRecordsRef = ref()
async function init() {
  const res = await adminApi.masterTableController.getTables1(id)
  const detail = res.data
  state.masterTable = detail
  console.log("detail", detail) 
  MasterTableTabRecordsRef.value.initTableColumns(detail?.fields)
}
onMounted(() => {
  init()
})
</script>

<template>
  <div class="pageContainer--padding">
    <el-tabs class="dp-tabs--auto" v-model="state.activeName" @tab-change="handleClick">
      <el-tab-pane :label="$t('masterTable.records')" name="records">
        <MasterTableRecords
          ref="MasterTableTabRecordsRef" :tableId="id"
        ></MasterTableRecords>
      </el-tab-pane>
      <el-tab-pane :label="$t('masterTable.schema')" name="schema">
        <!-- <MasterTableTabSchema
          ref="MasterTableTabSchemaRef"
          :masterTableDetail="state.masterTable"
          @refresh="init"
        ></MasterTableTabSchema> -->
      </el-tab-pane>
      <el-tab-pane :label="$t('masterTable.log')" name="log">
        <!-- <MasterTableTabLog
          :tableName="state.masterTable.name"
          :isDetail="true"
        ></MasterTableTabLog> -->
      </el-tab-pane>
      <el-tab-pane :label="$t('masterTable.setting')" name="setting">
        <!-- <MasterTableTabSetting :table="state.masterTable"></MasterTableTabSetting> -->
      </el-tab-pane>
    </el-tabs>
    <div class="absolute-btns">
      <!-- <el-button
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
      <el-button type="primary" @click="handleAddRow()">{{ $t("button.add") }}</el-button> -->
    </div>
    <!-- <MasterTableRecordAddDialog
      ref="MasterTableNewRowDialogRef"
      :ignoreList="ignoreList"
      @refresh="handleRefresh()" -->
    <!-- /> -->
    <!-- <MasterTableRecordDialog ref="MasterTableNewRowDialogRef" :ignoreList="ignoreList" @refresh="handleRefresh()"/> -->
    <!-- <input
      v-show="false"
      ref="inputRef"
      type="file"
      accept=".xlsx,.xls"
      @change="handleFile"
    /> -->
  </div>
</template>
<style lang="scss" scoped></style>
