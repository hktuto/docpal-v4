<template>
  <el-dialog
    v-model="state.visible"
    :title="$t('dashboard.setting')"
    class="big caseStatistics-table-dialog"
    append-to-body
    :close-on-click-modal="false"
    @close="state.visible = false"
  >
  <slot>
    <CaseStatisticsTable ref="tableRef" :setting="setting" :dates="dates" />
  </slot>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
const { setting, dates } = defineProps<{
  setting: any
  dates: any
}>()
const state = reactive({
  loading: false,
  setting: {}
})

function handleOpen() {
  if (!setting.fields) return
  console.log('setting', setting)
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
