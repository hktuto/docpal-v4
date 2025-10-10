<script lang="ts" setup>
import { adminApi } from 'api'
const condition = defineModel<any>('condition', { required: true })
const { disabled } = defineProps<{
  disabled: boolean
}>()
const graphProvider = inject(BPMN_PROVIDER)
if (!graphProvider) {
  throw new Error('Missing provider')
}
const emits = defineEmits(['remove'])
const allFields = computed(() => {
  return Object.keys(graphProvider.allFormField.value).map((key: string) => {
    return graphProvider.allFormField.value[key]
  })
})
function getTypeFields(type = 'string') {
  return allFields.value.filter((item) => item.attr_type === type)
}
const generateIdTemplateList = ref([])
function remove() {
  emits('remove')
}
function handleIdTemplateChange(id) {
  const idTem = generateIdTemplateList.value.find((item) => item.value === id)
  condition.value.variables = idTem.variables
}
async function getGenerateIdTemplateList() {
  const { data } = await adminApi.api.getIdTemplatesList()
  generateIdTemplateList.value =
    data?.map((item) => ({
      label: item.name,
      value: item.id,
      variables: getVariables(item)
    })) || []
  function getVariables(row) {
    const variables: any = []
    const variableList = [...row.prefix, ...row.suffix]
    const pattern = /(?<=var\()(.+?)(?=\))/g
    variableList.forEach((item) => {
      const values: RegExpExecArray | null = item.expression.match(pattern)
      if (values && !!values[0]) {
        variables.push({
          label: values[0],
          type: item.type
        })
      }
    })
    return variables
  }
}
onMounted(() => {
  getGenerateIdTemplateList()
})
</script>

<template>
  <ElForm :model="condition" label-position="top" width="100%">
    <ElFormItem :label="$t('caseManagement.idGenerator')">
      <ElSelect v-model="condition.templateId" :placeholder="$t('caseManagement.idGenerator')" :disabled="disabled" filterable @change="handleIdTemplateChange">
        <ElOption v-for="item in generateIdTemplateList" :key="item.value" :label="item.label" :value="item.value" />
      </ElSelect>
    </ElFormItem>
    <ElFormItem label="Form Info">
      <ElSelect v-model="condition.workflowInfo" placeholder="Form Info" :disabled="disabled" filterable>
        <ElOption v-for="item in getTypeFields('string')" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
      </ElSelect>
    </ElFormItem>
    <template v-if="condition.variables.length > 0">
      <el-divider content-position="left">{{ $t('caseManagement.idTemplateVariables') }}</el-divider>
      <ElFormItem v-for="item in condition.variables" :key="item.label" :label="item.label">
        <ElSelect v-model="item.value" :placeholder="item.label" :disabled="disabled" filterable>
          <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
        </ElSelect>
      </ElFormItem>
    </template>
  </ElForm>
</template>

<style lang="scss" scoped>
.cardContainer {
  width: 100%;
  padding: var(--app-space-s);
  border-radius: var(--app-border-radius-m);
  border: 1px solid var(--app-grey-800);
}
</style>
