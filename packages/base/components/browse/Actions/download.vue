<script lang="ts" setup>
import { Download } from '@element-plus/icons-vue'
import { ElNotification, ElMessage } from 'element-plus'
import { useEventListener } from '@vueuse/core'
import { downloadFileHandler } from '~/utils/browseHelper'
import * as mime from 'mime-types'
const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
  doc?: any,
  blob?: any,
  selected?: any[],
  isPdf?: boolean
}>()
const { doc } = toRefs(props)
const popupOpened = ref(false)

// #region module: download
async function downloadAsPdfHandler() {
  // TODO : impelment action
  const notification = ElNotification({
    title: '',
    icon: Download,
    dangerouslyUseHTMLString: true,
    message: `${props.doc.name}`,
    showClose: false,
    customClass: 'download-notification',
    duration: 0,
    position: 'bottom-right'
  })
  try {
    const ev = new CustomEvent('downloadPdf')
    document.dispatchEvent(ev)
    // await downloadDocRecord({ idOrPath: props.doc.id, type: 'PDF'})
    popupOpened.value = false
  } catch (error: any) {
    routerProvider?.message.error($i18n.t('download_noFile') as string)
  }
  setTimeout(() => {
    notification.close()
  }, 1000)
}

async function downloadPdfAndAnnotationHandler() {
  // TODO : impelment action
  const ev = new CustomEvent('downloadPdfAndAnnotation', { detail: props.doc })
  window.dispatchEvent(ev)
}

async function handleDownload(doc) {
  downloadFileHandler(doc)
  popupOpened.value = false
}

// #endregion

// useEventListener(document, 'isDocPdf', () => {
//     console.log('isDocPdf')
//     isPdf.value = true;
// })
// useEventListener(document, 'notDocPdf', () => {
//     console.log('notDocPdf')
//     isPdf.value = false;
// })

</script>
<template>
  <BrowseActionsButton id="downloadActionButton" :label="$t('dpTool_download')" @click="popupOpened = true">
    <SvgIcon src="/icons/file/download.svg" round :content="$t('dpTool_download')"
    ></SvgIcon>
  </BrowseActionsButton>
  <ElDialog v-model="popupOpened" width="280" append-to-body>
    <div class="popoverContent">
      <!-- download button -->
      <el-button type="text" @click="handleDownload(doc)">Download original</el-button>
      <!-- download as pdf button -->
      <el-button v-if="isPdf" type="text" @click="downloadAsPdfHandler">Download as PDF</el-button>
      <!-- download pdf and annotation -->
      <el-button v-if="isPdf" type="text" @click="downloadPdfAndAnnotationHandler">Download PDF with annotation
      </el-button>
      <BrowseActionsDownloadConversion v-if="checkLicenseFeatures('DOCUMENT_CONVERSION')"
                                       :doc="doc"></BrowseActionsDownloadConversion>
    </div>
  </ElDialog>
</template>


<style lang="scss" scoped>
.popoverContent {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: var(--app-space-xs);

  > button {
    width: 100%;
    text-align: left;
  }
}
</style>
