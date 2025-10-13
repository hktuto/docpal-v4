<script setup lang="ts">
const { t } = useI18n()
const dialogShow = ref(false)
const emits = defineEmits(['submit'])
const props = defineProps<{
  type: 'create' | 'update' | 'reject',
  sendMessageText: string
}>

const state = reactive({
  event: {},
  creator: '',
  message: '',
  sendMessage: false
})

function openDialog(event: any, creator: string) {
  state.event = event
  state.creator = creator
  state.message = ''
  state.sendMessage = true
  dialogShow.value = true
}

function handleCancel() {
  if ('reject' === props.type) {
    dialogShow.value = false
    return
  }

  // create and update
  state.message = ''
  state.sendMessage = true
  handleSubmit()
}

function handleSubmit() {
  const msg = {
    title: state.event.eventName,
    data: state.message
  }

  const event = {
    ...state.event,
    eventMessage: JSON.stringify(msg),
    sendMessageToCreator: state.sendMessage
  }

  if ('reject' === props.type && state.sendMessage) {
    event.recipient = state.creator
  }

  dialogShow.value = false
  emits('submit', event)
}

defineExpose({ openDialog })
</script>

<template>
  <el-dialog v-model="dialogShow" :title="t('Update Message')" width="30%">
    <el-form label-position="top">
      <el-form-item :label="t('Message')">
        <el-input v-model="state.message" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea"
                  :placeholder="t('vxe.base.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="t(sendMessageText)">
        <el-switch v-model="state.sendMessage" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="info" @click="handleCancel">{{ $t('dpButtom_cancel') }}</el-button>
      <el-button type="primary" @click="handleSubmit">{{ $t('dpButtom_confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
