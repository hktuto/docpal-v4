<template>
  <el-dropdown @command="handleExport">
    <el-button type="primary"> {{ $t('button.export', { name: $t('data') }) }} </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="excel">{{ $t('button.export', { name: 'Excel' }) }}</el-dropdown-item>
        <el-dropdown-item command="csv">{{ $t('button.export', { name: 'CSV' }) }}</el-dropdown-item>
        <el-dropdown-item command="vcf">{{ $t('button.export', { name: 'vCard(VCF)' }) }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { globalApi } from 'api'

const props = defineProps<{
  id: string
  name: string
  detail: any
}>()
const { t } = useI18n()
async function handleExport(command: string) {
  console.log(command)
  const res = await globalApi.api.postContactgroupIdContactdetailExport(
    props.id,
    {
      fileType: command
    },
    {},
    {
      format: 'blob'
    }
  )
  console.log(res, props.name)
  downloadBlob(res, props.name)
  ElMessage.success(t('dpMsg_success'))
}
</script>
<style lang="scss" scoped></style>
