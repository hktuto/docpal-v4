<script setup lang="ts">
import type { Node } from '@antv/x6'
import { useDebounceFn } from '@vueuse/core'
import { adminApi } from 'api'

const { t } = useI18n()
const { node } = defineProps<{
  node: Node
}>()
const variablesParamsRef = ref()
const variablesHeaderRef = ref()

const graphProvider = inject(BPMN_PROVIDER)
if (!graphProvider) {
  throw createError('graph provider not found')
}

const allFieldOptions = computed(() => {
  if (!graphProvider.allFormField.value) return []

  return Object.keys(graphProvider.allFormField.value).map((key) => {
    return {
      label: graphProvider.allFormField.value[key].attr_name,
      value: '${variables:get(' + graphProvider.allFormField.value[key].attr_id + ')}'
    }
  })
})

const defaultFieldOptions = computed(() => {
  if (!graphProvider.allFormField.value) return []

  return Object.keys(graphProvider.allFormField.value).map((key) => {
    return {
      label: graphProvider.allFormField.value[key].attr_name,
      value: graphProvider.allFormField.value[key].attr_id
    }
  })
})


const state = reactive({
  method: ['GET', 'POST', 'PUT', 'PATH', 'DELETE'],
  requestMethod: '',
  requestUrl: '',
  requestParams: '',
  requestHeader: '',
  responseData: '',
  responseVariableAsJson: false
})

function initForm() {
  const fields: any = node.data.data.extensionElements['flowable:field']

  if (fields && fields.lenght < 1) {
    return
  }

  fields.forEach((item: any) => {
    switch (item.attr_name) {
      case 'requestMethod':
        state.requestMethod = item['flowable:expression'].__cdata
        break
      case 'requestUrl':
        state.requestUrl = item['flowable:expression'].__cdata
        break
      case 'responseVariableName':
        state.responseData = item['flowable:expression'].__cdata
        break
      default :
    }

  })
}

function fieldMappingUpdate(newVal: string, name: string) {
  graphProvider?.graph.value?.startBatch('update-http-field-data')

  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: (nodeData.version || 0) + 1
  }
  const index = newData.data.extensionElements['flowable:field'].findIndex((f: any) => f.attr_name === name)
  newData.data.extensionElements['flowable:field'][index]['flowable:expression'].__cdata = newVal || ''
  node.setData(newData, { overwrite: true, deep: true, silent: false })

  graphProvider?.graph.value?.stopBatch('update-http-field-data')
}

// TODO Test Data
const requestState = reactive({
  params: [
    // { key: 'a', value: 'aaa' },
    // { key: '2', value: '213' },
    // { key: 'b', value: 'bx' }
  ],
  header: [
    // { key: 'a', value: 'aaa' },
    // { key: '2', value: '213' },
    // { key: 'b', value: 'bx' }
  ]
})

function openVisible(status: string) {
  if (status === 'Params') {
    variablesParamsRef.value.openDrawer(requestState.params)
  } else {
    variablesHeaderRef.value.openDrawer(requestState.params)
  }
}

watch(() => node, async () => {
  if (node && node.data) {
    console.log('Request Node', node)
    initForm()
  }
}, {
  immediate: true,
  deep: true
})
</script>

<template>
  <BpmnSidebarEditLabel :node="node" />
  <el-form label-width="auto" label-position="top">
    <el-form-item :label="t('Request Method')">
      <el-select v-model="state.requestMethod" placeholder="please select your zone"
                 @change="(val:any) => fieldMappingUpdate(val, 'requestMethod')">
        <el-option v-for="item in state.method" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>

    <el-form-item :label="t('Request Url')">
      <el-input v-model="state.requestUrl" @change="(val:any) =>  fieldMappingUpdate(val, 'requestUrl')" />
      <!--      <el-select v-model="state.requestUrl" placeholder="please select your zone"-->
      <!--                 @change="(val:any) =>  fieldMappingUpdate(val, 'requestUrl')">-->
      <!--        <el-option v-for="item in allFieldOptions" :key="item.value" :value="item.value"-->
      <!--                   :label="item.value.replace('${variables:get(', '').replace(')}', '')" />-->
      <!--      </el-select>-->
    </el-form-item>

    <el-form-item :label="t('Request Params')" class="flex gap-4">
      <el-input disabled v-model="state.requestParams" />
      <el-button @click="openVisible('Params')">{{ t('Add Params') }}</el-button>
    </el-form-item>

    <el-form-item :label="t('Request Header')">
      <el-input disabled v-model="state.requestHeader" />
      <el-button @click="openVisible('Header')">{{ t('Add Header') }}</el-button>
    </el-form-item>

    <el-form-item :label="t('Response Variable Name')">
      <!--      <el-input v-model="state.responseData" @change="(val:any) => fieldMappingUpdate(val, 'responseVariableName')" />-->
      <el-select v-model="state.responseData" placeholder="please select your zone"
                 @change="(val:any) => fieldMappingUpdate(val, 'responseVariableName')">
        <el-option v-for="item in defaultFieldOptions" :key="item.value" :value="item.value"
                   :label="item.label" />
      </el-select>
    </el-form-item>

    <!--    <el-form-item :label="t('Response Variable As Json')">-->
    <!--      <el-switch v-model="state.responseVariableAsJson" :active-text="t('Open')" :inactive-text="t('Close')" />-->
    <!--    </el-form-item>-->
  </el-form>

  <LazyBpmnContextHttpVariables ref="variablesParamsRef" :title="t('Add Params')"></LazyBpmnContextHttpVariables>
  <LazyBpmnContextHttpVariables ref="variablesHeaderRef" :title="t('Add Header')"></LazyBpmnContextHttpVariables>
</template>

<style scoped lang="scss">

</style>
