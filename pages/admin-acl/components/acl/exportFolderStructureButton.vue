<template>
  <SvgIcon src="/icons/file/export.svg" round @click="handleExport" />
</template>

<script lang="ts" setup>
import { Loading } from '@element-plus/icons-vue'
import { ElNotification, ElMessage } from 'element-plus'
import { adminApi } from 'api'
const props = defineProps<{
  exportId: string
  exportName: string
}>()
async function handleExport() {
  const noti = ElNotification({
    title: '',
    dangerouslyUseHTMLString: true,
    icon: Loading,
    message: props.exportName,
    showClose: false,
    customClass: 'loading-notification',
    duration: 0,
    position: 'bottom-right'
  })
  try {
    const data = await adminApi.api.postNuxeoFolderstructureExport(
      { idOrPath: props.exportId },
      {
        format: 'blob'
      }
    )
    downloadBlob(data, props.exportName + '.zip', 'application/zip')
  } catch (error: any) {
    throw new Error(error)
  } finally {
    noti.close()
  }
  // downloadBlob(res, props.exportName)
}
</script>

<style lang="scss" scoped></style>
