<script setup lang="ts">
const { t } = useI18n()
const dialogShow = ref(false)
const emits = defineEmits(['submit', 'rejectOrAccept'])
const props = defineProps<{
  notifyType: 'create' | 'update' | 'reject' | 'accept';
  sendMessageText: 'Send Message to Participants' | 'Send Message to Creator'
}>()

const state = reactive({
  message: '',
  sendMessage: true
})

function openDialog() {
  state.message = ''
  state.sendMessage = true
  dialogShow.value = true
}

function handleCancel() {
  if ('reject' === props.notifyType || 'accept' === props.notifyType) {
    dialogShow.value = false
    return
  }

  // create and update
  state.message = ''
  state.sendMessage = true
  handleSubmit()
}

function handleSubmit() {
  const data = {
    message: state.message,
    sendMessage: state.sendMessage
  }

  if (state.sendMessage) {
    if ('reject' === props.notifyType || 'accept' === props.notifyType) {
      emits('rejectOrAccept', data)
      dialogShow.value = false
      return
    }
  }

  dialogShow.value = false
  emits('submit', data)
}

defineExpose({ openDialog })
</script>

<template>
  <el-dialog v-model="dialogShow" :title="t('Update Message')" width="30%" append-to-body>
    <el-form label-position="top">
      <el-form-item :label="t('Message')">
        <el-input v-model="state.message" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea"
                  :placeholder="t('Please enter the content displayed in the notification.')" />
      </el-form-item>
      <el-form-item v-show="'create'!== notifyType" :label="t(sendMessageText)" label-position="right">
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
