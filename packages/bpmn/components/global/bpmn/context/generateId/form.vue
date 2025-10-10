<script lang="ts" setup>
import { adminApi } from 'api'
const condition = defineModel<any>('condition', { required: true })
const { disabled } = defineProps<{
  disabled: boolean
}>()
const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER)
if (!graphProvider || !editorProvider) {
  throw new Error('Missing provider')
}
const { bpmnGlobalRules } = editorProvider.BpmnRule
const emits = defineEmits(['remove'])

const stringFields = computed(() => {
  if (!bpmnGlobalRules.value || bpmnGlobalRules.value.length === 0) return []

  return bpmnGlobalRules.value.filter((item: any) => item.validationRule.type === 'text')
})

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

watch(condition,(newCondition, oldCondition) => {
  if(newCondition && newCondition.templateId && (!!oldCondition && oldCondition.templateId !== newCondition.templateId)){
    handleIdTemplateChange(newCondition.templateId)
  }
},{
  immediate:true,
  deep:true
})

onMounted(async () => {
  await getGenerateIdTemplateList()
  if(!!condition.value.templateId){
    handleIdTemplateChange(condition.value.templateId)
  }
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
        <ElOption v-for="item in stringFields" :key="item.id" :label="item.name" :value="item.id" />
      </ElSelect>
    </ElFormItem>

    <template v-if="!!condition && !!condition.variables && condition.variables.length > 0">
      <el-divider content-position="left">{{ $t('caseManagement.idTemplateVariables') }}</el-divider>
      <ElFormItem v-for="item in condition.variables" :key="item.label" :label="item.label">
        <ElSelect v-model="item.value" :placeholder="item.label" :disabled="disabled" filterable>
          <ElOption v-for="item in stringFields" :key="item.id" :label="item.name" :value="item.id" />
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
