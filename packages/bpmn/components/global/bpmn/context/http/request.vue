<script setup lang="ts">
import type { Node } from '@antv/x6'
import { useDebounceFn } from '@vueuse/core'
import { adminApi } from 'api'

const { t } = useI18n()
const { node } = defineProps<{
  node: Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
if (!graphProvider) {
  throw createError('graph provider not found')
}

const allFieldOptions = computed(() => {
  if (!graphProvider.allFormField.value) return []

  return Object.keys(graphProvider.allFormField.value).map((key) => {
    return {
      label: graphProvider.allFormField.value[key].attr_name,
      value: graphProvider.allFormField.value[key].attr_id
    }
  })
})

const state = reactive({
  method: ['GET', 'POST'],
  requestMethod: '',
  requestUrl: '',
  requestHeader: '',
  responseData: '',
  responseVariableAsJson: ''
})

function initForm() {
  const fields: any = node.data.data.extensionElements['flowable:field']

  if (fields && fields.lenght < 1) {
    return
  }

  fields.forEach((item: any) => {
    switch (item.attr_name) {
      case 'requestMethod':
        state.requestMethod = item['flowable:string'].__cdata
        break
      case 'requestUrl':
        state.requestUrl = item['flowable:string'].__cdata
        break
      case 'responseVariableName':
        state.responseData = item['flowable:string'].__cdata
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
  newData.data.extensionElements['flowable:field'][index]['flowable:string'].__cdata = newVal || ''
  node.setData(newData, { overwrite: true, deep: true, silent: false })

  graphProvider?.graph.value?.stopBatch('update-http-field-data')
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
      <el-select v-model="state.requestUrl" placeholder="please select your zone"
                 @change="(val:any) =>  fieldMappingUpdate(val, 'requestUrl')">
        <el-option v-for="item in allFieldOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>

    <!--    <el-form-item :label="t('Request Header')">-->
    <!--      <el-select v-model="state.requestHeader" placeholder="please select your zone"-->
    <!--                 @change="(val:any) => fieldMappingUpdate(val, 'requestHeader')">-->
    <!--        <el-option v-for="item in allFieldOptions" :key="item.value" :label="item.label" :value="item.value" />-->
    <!--      </el-select>-->
    <!--    </el-form-item>-->

    <el-form-item :label="t('Response Variable Name')">
      <el-select v-model="state.responseData" placeholder="please select your zone"
                 @change="(val:any) => fieldMappingUpdate(val, 'responseVariableName')">
        <el-option v-for="item in allFieldOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>

    <!--    <el-form-item :label="t('Response Variable As Json')">-->
    <!--      <el-select v-model="state.requestMethod" placeholder="please select your zone"-->
    <!--                 @change="(val:any) => fieldMappingUpdate(val, 'requestMethod')">-->
    <!--        <el-option v-for="item in state.method" :key="item.value" :label="item.label" :value="item.value" />-->
    <!--      </el-select>-->
    <!--    </el-form-item>-->
  </el-form>
</template>

<style scoped lang="scss">

</style>