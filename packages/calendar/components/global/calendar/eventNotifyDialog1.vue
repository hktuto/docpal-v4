<script setup lang="ts">
import { adminApi, clientApi } from 'api'

const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const dialogShow = ref(false)

const props = defineProps({
  categoriesOption: {},
  workflowKey: ''
})

const form = reactive({
  message: '',
  sendMessageToCreator: true
})

const state = reactive({
  event: {}
})

function openDialog(event: any) {
  state.event = event
  form.message = ''
  form.sendMessageToCreator = true
  dialogShow.value = true
}

async function openDialogByCreator(event: any) {
  state.event = event
  form.message = ''
  form.sendMessageToCreator = false
  await handleStart()
}

async function handleStart() {
  // run workflow
  if (!props.workflowKey && '' !== props.workflowKey) {
    routerProvider?.message.success(t('The corresponding calendar setting cannot be found.'))
    return
  }
  // 移除當前的user
  const userId = useUserId()
  const user = state.event.user.split(',').filter(item => item !== userId.value).join(',')

  const data = {
    eventId: state.event.id,
    eventName: state.event.eventName,
    eventDescription: state.event.eventDescription,
    eventCategory: state.event.category,
    eventLocation: state.event.location,
    startTime: state.event.startTime,
    endTime: state.event.endTime,
    eventUser: user,
    isAllDay: state.event.isAllDay,
    sendMessageToCreator: form.sendMessageToCreator,
    recipient: state.event.creator,
    eventMessage: form.message
  }

  const request = {
    processKey: props.workflowKey,
    businessKey: '',
    properties: Object.entries(data).reduce((newObj, [key, val]) => {
      if (val || val === false || val == '0') newObj[key] = val
      return newObj
    }, {})
  }

  try {
    await clientApi.api.postWorkflowProcessStart(request, { async: false }).then((res) => res.data)
  } catch (e) {
    console.log('rejectEvent', e)
  }
  dialogShow.value = false
}

defineExpose({ openDialog, openDialogByCreator })
</script>

<template>
  <el-dialog v-model="dialogShow" :title="t('Update Message')" width="30%">
    <el-form label-position="top">
      <el-form-item :label="t('Message')">
        <el-input v-model="form.message" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea"
                  :placeholder="t('vxe.base.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="t('Send Message to Creator')">
        <el-switch v-model="form.sendMessageToCreator" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="info" @click="dialogShow = false">{{ $t('dpButtom_cancel') }}</el-button>
      <el-button type="primary" @click="handleStart">{{ $t('dpButtom_confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
