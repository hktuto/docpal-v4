<template>
  <el-dialog
    v-model="state.visible"
    :title="setting.dialogSettingTitle"
    class="big caseStatistics-table-dialog"
    append-to-body
    :close-on-click-modal="false"
    @close="state.visible = false"
  >
    <slot>
      <CaseStatisticsTable ref="tableRef" :sql="state.sql" :setting="setting" :dates="dates" @close="state.visible = false" />
    </slot>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { PostgREST_Decorate } from 'api'
const { setting, dates } = defineProps<{
  setting: any
  dates: any
}>()
const state = reactive({
  visible: false,
  sql: ''
})
const tableRef = ref()
function handleOpen(sqlParams: any) {
  if (!setting.fields) return
  if (sqlParams) {
    const _sqlParams = JSON.parse(JSON.stringify(sqlParams))
    const displayColumns = setting.displayColumns.map((item: any) => item.value || item)
    const columns = [...displayColumns, 'case_id'].join(',')
    const selectSql = _sqlParams.find((item) => item.type === 'select')
    if (!selectSql) {
      _sqlParams.push({
        type: 'select',
        value: columns
      })
    } else {
      selectSql.value += `,${columns}`
    }
    state.sql = PostgREST_Decorate(_sqlParams)
    setTimeout(() => {
      tableRef.value.reload()
    }, 100)
  }
  state.visible = true
}

defineExpose({ handleOpen })
</script>
<style lang="scss">
.caseStatistics-table-dialog {
  height: 70vh;
  .el-dialog__body {
    height: calc(100% - 2rem);
    overflow: hidden;
  }
}
</style>
