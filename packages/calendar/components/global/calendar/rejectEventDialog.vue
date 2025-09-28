<script setup lang="ts">
import { adminApi, clientApi } from 'api'

const { t } = useI18n()
const dialogShow = ref(false)

const props = defineProps({
  categoriesOption: {}
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
  dialogShow.value = true
}

async function initWorkflowForm(name: string) {
  try {
    categories.value = props.categoriesOption.find((item: any) => item.id === state.event.category)
    if (!categories.value || !categories.value.flows || categories.value.flows.length === 0) {
      state.workflowId = ''
      return
    }
    // TODO：名稱之後需要重新定義
    const flow = categories.value.flows.find((item: any) => {
      if (item.name.toLowerCase().includes(name)) {
        return item
      }
    })
    if (!flow) return
    state.workflowKey = flow.key
    if (!!categories.value.location && categories.value.location.value.length > 0) {
      state.location = categories.value.location.value.map((item) => item.id).join(',')
    }

    const workflow = await adminApi.api.getWorkflowVersionKeyProcessdefinitionkey(flow.key).then((r) => r.data)
  } catch (e) {
    console.log(e)
  } finally {
  }
}

async function handleStart() {
  // run workflow

  const data = {
    eventId: state.event.id,
    eventName: state.event.eventName,
    eventDescription: state.event.eventDescription,
    category: state.event.category,
    location: state.event.location,
    startTime: state.event.startTime,
    endTime: state.event.endTime,
    user: state.event.detail.relatedUsers.user,
    isAllDay: state.event.isAllDay,
    message: form.message,
    sendMessageToCreator: form.sendMessageToCreator
  }

  const request = {
    processKey: state.workflowKey,
    businessKey: '',
    properties: Object.entries(data).reduce((newObj, [key, val]) => {
      if (val || val === false || val == '0') newObj[key] = val
      return newObj
    }, {})
  }

  await clientApi.api.postWorkflowProcessStart(request, { async: false }).then((res) => res.data)
  dialogShow.value = false
}

defineExpose({ openDialog })
</script>

<template>
  <el-dialog v-model="dialogShow" :title="t('Update Message')" width="30%">
    <el-form label-position="top">
      <el-form-item :label="t('Message')">
        <el-input v-model="form.message" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea" :placeholder="t('vxe.base.pleaseInput')" />
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
