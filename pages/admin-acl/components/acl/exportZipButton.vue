<template>
    <SvgIcon :src="'/icons/bulkExport.svg'" @click="handleExport" />
</template>


<script lang="ts" setup>
import { Loading } from '@element-plus/icons-vue';
import { adminApi } from 'api'
import {ElNotification} from 'element-plus'
    const props = defineProps<{
        exportId:string,
        exportName: string,
    }>()

  async function handleExport(){
    const noti = ElNotification({
        title: '',
        dangerouslyUseHTMLString: true,
        icon: Loading,
        message: `downloading ~ ${props.exportName}`,
        showClose: false,
        customClass: 'loading-notification',
        duration: 0,
        position: 'bottom-right'
      });
      const data = await adminApi.configurationNuxeo.postExport({idOrPath:props.exportId}, {
        format: 'blob'
        })
        downloadBlob(data, props.exportName + '.zip', 'application/zip' )
      noti.close()
  }

  </script>
