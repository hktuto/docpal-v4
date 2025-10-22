<script lang="ts" setup>
import type { Node } from '@antv/x6'
import { adminApi } from 'api'

const { node } = defineProps<{
  node: Node
}>()
const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER)
if (!graphProvider || !editorProvider) {
  throw createError('graph provider not found')
}
const { bpmnGlobalRules } = editorProvider.BpmnRule

const { t } = useI18n()
const allEmailTemplates = ref<any>([])

const contactBookFieldList = ref<any>([])

const form = reactive({
  emailTemplateId: '',
  attachmentsFilePath: [],
  tos: [],
  ccs: [],
  bcc: []
})

graphProvider?.graph.value?.on('history:change', async () => {
  console.log('on-history:change')
  await getField()
})

const staticStringFields = computed(() => {
  if (!bpmnGlobalRules.value || bpmnGlobalRules.value.length === 0) return []

  return bpmnGlobalRules.value.filter((item: any) => item.validationRule.type === 'text').map((item: any) => {
    return {
      id: '${variables:get(' + item.id + ')}',
      name: item.name
    }
  })
})

function updateFieldData(key: string, data: string) {
  graphProvider?.graph.value?.startBatch('update-email-data')

  const nodeData = node.getData()
  const newData = {
    ...nodeData,
    version: (nodeData.version || 0) + 1
  }
  const index = newData.data.extensionElements['flowable:field'].findIndex((f: any) => f.attr_name === key)
  if ('notificationType' === key) {
    newData.data.extensionElements['flowable:field'][index]['flowable:string'].__cdata = data || ''
  } else {
    newData.data.extensionElements['flowable:field'][index]['flowable:expression'].__cdata = data || ''
  }
  node.setData(newData, { overwrite: true, deep: true })

  graphProvider?.graph.value?.stopBatch('update-email-data')
}

async function getContactBookFieldList() {
  contactBookFieldList.value = await adminApi.api.getContactgroupList().then(r => r.data)
}

async function getField() {
  if (allEmailTemplates.value.length === 0) {
    allEmailTemplates.value = await adminApi.api.getTemplateEmailAll().then(r => r.data)
  }

  const fields: any = node.data.data.extensionElements['flowable:field']

  if (fields && fields.lenght < 1) {
    return
  }

  fields.forEach((item: any) => {
    const name = item.attr_name
    const itemList: any = item['flowable:expression']?.__cdata.split(',').filter((item: string) => item.trim() !== '')
    switch (name) {
      case 'notificationType':
        form.emailTemplateId = item['flowable:string'].__cdata
        break
      case 'tos':
        form.tos = itemList.length > 0 ? itemList : []
        break
      case 'ccs':
        form.ccs = itemList.length > 0 ? itemList : []
        break
      case 'bcc':
        form.bcc = itemList.length > 0 ? itemList : []
        break
      case 'attachmentsFilePath':
        form.attachmentsFilePath = itemList.length > 0 ? itemList : []
        break
    }
  })
}

onMounted(async () => {
  await getContactBookFieldList()
})
watch(() => node, async () => {
    console.log('watch node from email', node)
    await getField()
  }, {
    immediate: true,
    deep: true
  }
)
</script>

<template>
  <div class="fromContainer">
    <BpmnSidebarEditLabel :node="node" />
    <el-form label-position="top" label-width="80px" :disabled="editorProvider.readonly.value">
      <el-form-item label="Email template" required>
        <ElSelect v-model="form.emailTemplateId" :placeholder="t('common_selectedIsRequiredMsg')" class="fullwidth"
                  @change="(val: string) => updateFieldData('notificationType', form.emailTemplateId)" filterable>
          <ElOption v-for="item in allEmailTemplates" :key="item.id" :label="item.label" :value="item.id"></ElOption>
        </ElSelect>
      </el-form-item>
      <el-form-item label="TOS" required>
        <el-select v-model="form.tos" :placeholder="t('common_selectedIsRequiredMsg')" clearable multiple
                   @change="(val: any) => updateFieldData('tos', form.tos.join(','))">
          <El-Option-Group label="Form Fields">
            <el-option v-for="item in staticStringFields" :key="item.id" :label="item.name" :value="item.id" />
          </El-Option-Group>
          <el-option-group :label="$t('adminMenu.contactBook')">
            <ElOption v-for="item in contactBookFieldList" :key="item.value" :label="item.name"
                      :value="item.id"></ElOption>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="CCS">
        <el-select v-model="form.ccs" :placeholder="t('common_selectOccupancyContent')" clearable multiple
                   @change="(val: any) => updateFieldData('ccs',form.ccs.join(','))">
          <El-Option-Group label="Form Fields">
            <el-option v-for="item in staticStringFields" :key="item.id" :label="item.name" :value="item.id" />
          </El-Option-Group>
          <el-option-group :label="$t('adminMenu.contactBook')">
            <ElOption v-for="item in contactBookFieldList" :key="item.value" :label="item.name" :value="item.id" />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="BCC">
        <el-select v-model="form.bcc" :placeholder="t('common_selectOccupancyContent')" clearable multiple
                   @change="(val: any) => updateFieldData('bcc', form.bcc.join(','))">
          <El-Option-Group label="Form Fields">
            <el-option v-for="item in staticStringFields" :key="item.id" :label="item.name" :value="item.id" />
          </El-Option-Group>
          <el-option-group :label="$t('adminMenu.contactBook')">
            <ElOption v-for="item in contactBookFieldList" :key="item.value" :label="item.name" :value="item.id" />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="Attached">
        <el-select v-model="form.attachmentsFilePath" :placeholder="t('common_selectOccupancyContent')"
                   @change="(val:any) => updateFieldData('attachmentsFilePath', form.attachmentsFilePath.join(','))"
                   clearable multiple>
          <el-option v-for="item in staticStringFields" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.fromContainer {
  overflow: auto;
}
</style>
