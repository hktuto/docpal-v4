<script setup lang="ts">
import type { Node } from '@antv/x6'
import { getUserPermissionSelectOption } from '#imports'
import { ElMessage } from 'element-plus'

const { t } = useI18n()
const { node } = defineProps<{
  node: Node
}>()
const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER)
if (!graphProvider || !editorProvider) {
  throw createError('graph provider not found')
}
const { bpmnGlobalRules } = editorProvider.BpmnRule
const userFields = ref<any[]>([])

async function getUserFields() {
  const userList = await getUserPermissionSelectOption()
  userFields.value = userList.map((item) => {
    return {
      id: '${variables:get(' + item.value + ')}',
      name: item.label
    }
  })
}

const tableData = ref<any[]>([])

const categoryFields = ref([
  { id: 'case', name: 'Case' },
  { id: 'workflow', name: 'Workflow' }
])

const allFields = computed(() => {
  if (!bpmnGlobalRules.value || bpmnGlobalRules.value.length === 0) return []

  return bpmnGlobalRules.value.map((item: any) => {
    return {
      id: '${variables:get(' + item.id + ')}',
      name: item.name
    }
  })
})

const form = ref<any>({})

async function init() {
  await getUserFields()

  const fields = node.getData().data.extensionElements['flowable:field']
  fields.forEach((item: any) => {
    form.value[item.attr_name] = item['flowable:expression'].__cdata

    if (item.attr_name !== 'userId' && item.attr_name !== 'category') {
      tableData.value.push({
        id: item.attr_name,
        name: item.attr_name.split('_').map((name: string) => name.charAt(0).toUpperCase() + name.slice(1)).join(' ')
      })
    }
  })
}

const showDialog = ref(false)

function openAddColumnsDialog() {
  showDialog.value = true
}

const newColumnName = ref('')

function handleAddColumns() {
  if (!newColumnName.value || '' === newColumnName.value) {
    return
  }

  if (!/^[a-zA-Z0-9 ]+$/.test(newColumnName.value)) {
    ElMessage.error('Only English letters, numbers and single space are allowed')
    return
  }

  if (/\s{2,}/.test(newColumnName.value) || (newColumnName.value.match(/ /g) || []).length > 1) {
    ElMessage.error('Only one space is allowed')
    return
  }

  const index = tableData.value.findIndex((item: any) => item.name === newColumnName.value)
  if (index !== -1) {
    ElMessage.error('Column name already exists')
    return
  }

  const id = newColumnName.value.toLocaleLowerCase().replace(/ /g, '_')
  tableData.value.push({
    id: id,
    name: newColumnName.value
  })
  newColumnName.value = ''

  form.value[id] = ''
  updateData()
}

function deleteRow(index: number) {
  delete form.value[tableData.value[index].id]
  tableData.value.splice(index, 1)
  updateData()
}

function updateData() {
  graphProvider?.graph.value?.startBatch('update-auditLog-field-data')
  const nodeData = node.getData()

  const newData = {
    ...nodeData,
    version: nodeData.versioin + 1 || 1,
    data: {
      ...nodeData.data,
      extensionElements: {
        ...nodeData.data.extensionElements
      }
    }
  }

  const fields = newData.data.extensionElements['flowable:field']

  // update and insert
  Object.keys(form.value).forEach((key: any) => {
    const field = fields.find((item: any) => item.attr_name === key)
    if (field) {
      field['flowable:expression'].__cdata = form.value[key]
    } else {
      fields.push({
        attr_name: key,
        'flowable:expression': {
          __cdata: form.value[key]
        }
      })
    }
  })
  // delete
  fields.forEach((item: any) => {
    if (!Object.keys(form.value).includes(item.attr_name)) {
      fields.splice(fields.indexOf(item), 1)
    }
  })

  newData.data.extensionElements['flowable:field'] = fields

  node.setData(newData, {
    overwrite: true,
    deep: true
  })

  graphProvider?.graph.value?.stopBatch('update-auditLog-field-data')
  console.log(22, fields, node.data.data)
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <BpmnSidebarEditLabel :node="node" />
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <h4>Audit Log</h4>
    <el-button @click="openAddColumnsDialog" type="primary">Column</el-button>
  </div>

  <el-form label-position="top" :disabled="editorProvider.readonly.value">
    <el-form-item label="User ID" required>
      <el-select v-model="form.userId" filterable :placeholder="t('common_selectedIsRequiredMsg')" @change="updateData">
        <el-option v-for="item in userFields" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="Category">
      <el-select v-model="form.category" :placeholder="t('common_selectedIsRequiredMsg')" @change="updateData">
        <el-option v-for="item in categoryFields" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <template v-for="item in tableData" :key="item.id">
      <el-form-item :label="item.name">
        <el-select v-model="form[item.id]" clearable filterable :placeholder="t('common_selectOccupancyContent')"
                   @change="updateData">
          <el-option v-for="item in allFields" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </template>
  </el-form>

  <el-dialog v-model="showDialog" calss="big" :label="t('Add Columns')" append-to-body>
    <template #header>
      <h4>Add Columns Name</h4>
    </template>

    <el-form-item label="Column Name">
      <div style="width: 100%; display: flex;  align-items: center;">
        <el-input v-model="newColumnName" />
        <el-button type="primary" @click="handleAddColumns">Add Column</el-button>
      </div>
    </el-form-item>

    <el-table :data="tableData" style="width: 100%" max-height="300">
      <el-table-column prop="id" label="ID" width="220" />
      <el-table-column prop="name" label="Name" width="220" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
