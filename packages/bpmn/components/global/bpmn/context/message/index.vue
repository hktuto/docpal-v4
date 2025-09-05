<script setup lang="ts">
import type { Node } from '@antv/x6'
import { adminApi } from 'api'

const { t } = useI18n()
const { node } = defineProps<{
  node: Node
}>()
const graphProvider = inject(BPMN_PROVIDER)
if (!graphProvider) {
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

const state = reactive({
  userField: [],
  message: ''
})

const userList = ref([])

async function getUserList() {
  try {
    const newVar: any = await adminApi.api.postNuxeoIdentityUsers().then((res) => res.data)
    userList.value = newVar.map((item: any) => ({
      id: item.id,
      name: item.userName
    }))
  } catch (e) {
    throw new Error(e)
  }
}

async function initForm() {
  await getUserList()

  const fields: any = node.data.data.extensionElements['flowable:field']

  if (fields && fields.lenght < 1) {
    return
  }

  fields.forEach((item: any) => {
    switch (item.attr_name) {
      case 'notificationUserFromVariables':
        let list: string[] = []
        const cdata: any = item['flowable:expression'].__cdata.split(',')
        if (cdata.length > 0) {
          const userIdSet = new Set(cdata)
          list = userList.value.filter((user: any) => userIdSet.has(user.id)).map(user => user.id)
        }
        state.userField = list
        break
      case 'message':
        state.message = item['flowable:string'].__cdata
        break
    }
  })
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
    newData.data.extensionElements['flowable:field'][index]['flowable:expression'].__cdata = newVal.toString() || ''
  } else if ('message' === name) {
    newData.data.extensionElements['flowable:field'][index]['flowable:string'].__cdata = newVal || ''
  }

  node.setData(newData, { overwrite: true, deep: true, silent: false })
  graphProvider?.graph.value?.stopBatch('update-send-notification-data')
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
        <el-select v-model="state.userField" clearable multiple collapse-tags collapse-tags-tooltip placeholder="Select"
                   @change="(val:any) => fieldMappingUpdate(val, 'notificationUserFromVariables')">
          <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('Message')" prop="message">
        <el-input v-model="state.message" type="textarea" :autosize="{ minRows: 6, maxRows: 9 }" clearable
                  @change="(val:string) => fieldMappingUpdate(val, 'message')" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">

</style>