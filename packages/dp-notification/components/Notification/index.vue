<template>
  <el-badge :value="unreadCount" :hidden="unreadCount === 0" :max="99" is-dot class="actionIcons">
    <SvgIcon src="/icons/notification.svg" @click="handleOpen"></SvgIcon>
  </el-badge>
  <!-- <NotificationDialog ref="NotificationDialogRef" :unreadCount="unreadCount" @unreadCountChange="handleUnreadCountChange"></NotificationDialog> -->
  <NotificationTabDialog ref="NotificationDialogRef" :unreadCount="unreadCount" @unreadCountChange="handleUnreadCountChange"></NotificationTabDialog>
</template>

<script lang="ts" setup>
import { ElNotification, ElButton } from 'element-plus'
import { clientApi } from 'api'
import { allowFeature, caseManageDashboardPage } from '#imports'
import { TabManagerKey } from '#imports'
const tabProvider = inject(TabManagerKey)

const unreadCount = ref(0)
const notificationStore = ref()
const NotificationDialogRef = ref()
const { uploadState } = useUploadAIStore()
const { messageHandlers } = useNotification()

const userId = useUserId()
const failList = ['FAIL']
function handleOpen() {
  NotificationDialogRef.value.handleOpen()
}
async function getUnreadCount() {
  const { data: res } = await clientApi.api.getNotificationUnreadNumber()
  unreadCount.value = res
}
function handleUnreadCountChange(count: number) {
  console.log('handleUnreadCountChange', count)
  if (count >= 0) unreadCount.value = count
  else getUnreadCount()
}
function messageChange(notiData) {
  console.log('messageChange', notiData)
  getUnreadCount()
  NotificationDialogRef.value.initData()
  try {
    const messageJson = notiData.messageJson
    const content = JSON.parse(messageJson.content)
    switch (messageJson.functionPoint) {
      case 'Ai-analysis_UPLOAD_FOLDER':
        handleAiUpload(content)
        break
      case 'Ai-analysis_REPLACE_FILE':
        handleReplaceFileWithAi(content)
        break
      default:
        if (messageJson.showNotification){
          handleShowNotification(content)
          break
        }

        if(messageJson.type==='Workflow'){
          handleOpenCaseDashboard(content)
          break
        }
        break
    }
  } catch (error) {}
}
function handleAiUpload(content) {
  if (content.uploadId) {
    const message = content['upload status'] === 'FAIL' ? 'ai.uploadCompleteAndAIFail' : 'ai.uploadClick'
      // : 'ai.uploadAndAIComplete'
    const noti = ElNotification({
      title: $i18n.t('ai.uploadcomplete'),
      message: allowFeature('AI_CLASSIFICATION') ? $i18n.t(message) : '',
      type: 'success',
      duration: 0,
      customClass: 'cursorPointer',
      onClick: () => {
        tabProvider.openTab(
          createAiUploadDetail({
            id: content.uploadId
          })
        )
        const ev = new CustomEvent('closeUploadDrawer')
        document.dispatchEvent(ev)
        noti.close()
      }
    })
    const requetUpload = uploadState.value.uploadRequestList.find((item) => item.uploadAiId === content.uploadId)
    if (requetUpload) requetUpload.aiFinish = true
  }
}
function handleReplaceFileWithAi(content) {
  if (content.idOrPath) {
    const noti = ElNotification({
      title: $i18n.t('status.completed'),
      message: $i18n.t('ai.confirmAiMetadataExtractionViewDocument'),
      type: 'success',
      duration: 0,
      onClick: () => {
        openFileDetail(content.idOrPath, {
          showInfo: true,
          showHeaderAction: true,
          openEdit: true
        })
        noti.close()
      }
    })
    const requetUpload = uploadState.value.uploadRequestList.find((item) => item.uploadAiId === content.uploadId)
    if (requetUpload) requetUpload.aiFinish = true
  }
}
function handleShowNotification(content) {
  let type = 'success'
  if (content.notiStatus && failList.includes(content.notiStatus)) type = 'error'
  const noti = ElNotification({
    title: $i18n.t('tip.notification'),
    message: $i18n.t(content.templateId),
    type,
    duration: 6000,
    onClick: () => {
      noti.close()
    }
  })
}
function handleOpenCaseDashboard(content){
  const noti = ElNotification({
    title: $i18n.t('tip.notification'),
    message: 'Open Case Dashboard.',
    type: 'success',
    duration: 6000,
    onClick: async () => {
      console.log(2222,content)
      // const caseInstance = await clientApi.api.getCaseInstanceCaseidCaseid(content.additionalContent).then((res) => res.data)
      // const data = {
      //   instanceId: content.additionalContent,
      //   versionId: caseInstance.cmmnVersionId
      // }
      // const newItem = caseManageDashboardPage(data)
      // tabProvider?.openTab(newItem, true)
      noti.close()
    }
  })
}

onMounted(() => {
  getUnreadCount()
  messageHandlers.value.push({
    name: 'localMessageDialog',
    handler: messageChange
  })
})

onBeforeUnmount(() => {
  messageHandlers.value = messageHandlers.value.filter((item) => item.name !== 'localMessageDialog')
})
</script>

<style lang="scss" scoped>
.actionIcons {
  --icon-size: var(--app-font-size-xl);
}
</style>
