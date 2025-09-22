<script setup lang="ts">
import type { Node } from '@antv/x6'
import { linter } from '@codemirror/lint'
import { Codemirror } from 'vue-codemirror'
import { json, jsonParseLinter } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'

const { t } = useI18n()
const { node } = defineProps<{
  node: Node
}>()
const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER)
if (!graphProvider || !editorProvider) {
  throw createError('graph provider not found')
}
const formRef = ref()
const rules = reactive({
  userField: [{
    required: true,
    message: t('render.hint.fieldRequired', { name: t('userField') }),
    trigger: 'change'
  }],
  message: [{
    required: true,
    message: t('render.hint.fieldRequired', { name: t('message') }),
    trigger: 'change'
  }]
})
const levelList = ref([
  { label: 'Primary', value: 'primary' },
  { label: 'Success', value: 'success' },
  { label: 'Info', value: 'info' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' }])

const state = reactive({
  userField: '',
  message: '',
  messageObject: {
    templateId: 'notification.workflow.custom',
    level: '',
    // isShowDefaultMessage: true,
    additionalContent: '',
    showNotification: true,
    notiStatus: 'SUCCESS'
  }
})

const defaultFieldOptions = computed(() => {
  if (!graphProvider.allFormField.value) return []

  const allField = Object.fromEntries(
    Object.entries(graphProvider.allFormField.value).filter(([key, value]) => value.attr_type === 'string')
  )

  return Object.keys(allField).map((key) => {
    return {
      label: graphProvider.allFormField.value[key].attr_name,
      value: '${variables:get(' + graphProvider.allFormField.value[key].attr_id + ')}'
    }
  })
})

const codeMirror = reactive({
  extensions: [json(), linter(jsonParseLinter()), oneDark],
  errorMessage: ''
})

async function initForm() {
  const fields: any = node.data.data.extensionElements['flowable:field']

  if (fields && fields.lenght < 1) {
    return
  }
  fields.forEach((item: any) => {
    switch (item.attr_name) {
      case 'notificationUserFromVariables':
        state.userField = item['flowable:expression'].__cdata
        break
      case 'message':
        state.message = item['flowable:string'].__cdata
        break
    }
  })
}

function handleJsonFormat() {
  if (!checkJsonFormat()) {
    state.message = JSON.stringify(JSON.parse(state.message), null, 2)
    codeMirror.errorMessage = ''
    fieldMappingUpdate(state.message, 'message')
  }
}

function checkJsonFormat() {
  try {
    JSON.parse(state.message)
    codeMirror.errorMessage = ''
    return false
  } catch (e) {
    codeMirror.errorMessage = 'Unable to format JSON: ' + e.message
    return true
  }
}

function fieldMappingUpdate(newVal: any | string, name: string) {
  graphProvider?.graph.value?.startBatch('update-send-notification-data')

  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: (nodeData.version || 0) + 1
  }

  const index = newData.data.extensionElements['flowable:field'].findIndex((f: any) => f.attr_name === name)
  if ('notificationUserFromVariables' === name) {
    newData.data.extensionElements['flowable:field'][index]['flowable:expression'].__cdata = newVal || ''
  } else if ('message' === name) {
    newData.data.extensionElements['flowable:field'][index]['flowable:string'].__cdata = newVal || ''
  }

  node.setData(newData, { overwrite: true, deep: true, silent: false })
  graphProvider?.graph.value?.stopBatch('update-send-notification-data')
}

function handleUpdateAdditionalContent(item: string) {
  state.messageObject.additionalContent = item
  state.message = JSON.stringify(state.messageObject)
  fieldMappingUpdate(state.message, 'message')
}

function handelMessageObject() {
  state.message = JSON.stringify(state.messageObject)
  fieldMappingUpdate(state.message, 'message')
}

watch(() => node, async () => {
  if (node && node.data) {
    console.log(node, node.data)
    await initForm()
  }
}, {
  immediate: true,
  deep: true
})
</script>

<template>
  <div>
    <BpmnSidebarEditLabel :node="node" />
    <el-form ref="formRef" label-width="auto" :model="state" label-position="top" :rules="rules">
      <el-form-item :label="t('User Field')" prop="userField">
        <el-select v-model="state.userField" placeholder="Select" :disabled="editorProvider.readonly.value"
                   @change="(val:any) => fieldMappingUpdate(val, 'notificationUserFromVariables')">
          <el-option v-for="item in defaultFieldOptions" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('Message')" prop="message">
        <el-input v-model="state.message" v-show="false" disabled />
      </el-form-item>
      <div v-if="codeMirror.errorMessage" class="error">{{ codeMirror.errorMessage }}</div>
      <codemirror
        v-model="state.message"
        :style="{top: '-16px' ,width: '300px', height: '20vh' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="codeMirror.extensions"
        :disabled="editorProvider.readonly.value"
        @change="checkJsonFormat"
        @blur="handleJsonFormat"
      />

      <!--  ------------------- -->
      <el-form-item :label="t('Level')">
        <el-select v-model="state.messageObject.level" @change="handelMessageObject">
          <el-option v-for="item in levelList" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>

      <!--      <el-form-item :label="t('Show Default Message')">-->
      <!--        <el-switch v-model="state.messageObject.isShowDefaultMessage" active-text="Open" inactive-text="Off" />-->
      <!--      </el-form-item>-->
      <!--      <BpmnContextMessageAdditionalContent @update="handleUpdateAdditionalContent" />-->
    </el-form>
  </div>
</template>

<style scoped lang="scss">

</style>