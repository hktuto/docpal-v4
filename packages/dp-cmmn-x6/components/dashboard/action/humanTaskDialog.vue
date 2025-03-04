<template>
  <el-dialog v-model="state.visible" :title="state.title" class="scroll-dialog" append-to-body
    :close-on-click-modal="false" destroy-on-close @close="handleClose">
    <WorkflowDetailFormRender v-if="isWorkflowForm" ref="FromVariablesRendererRef" />
    <MasterTableVariableForm v-else ref="MasterTableVariableFormRef" :ignoreList="ignoreList"/>
    <template #footer>
      <div class="footer-grid">
        <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{ $t('common_submit') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
const props = withDefaults(defineProps<{
  ignoreList: string[],
}>(), {
  ignoreList: []
})
const emits = defineEmits([
  'refresh', 'delete', 'submit'
])
const { t } = useI18n()
const state = reactive({
  loading: false,
  visible: false,
  setting: {},
  fields: [],
  edit: false,
  title: t('masterTable.newRow')
})
const route = useRoute()
const router = useRouter()
async function handleSubmit() {
  state.loading = true
  try {
    let data:any;
        if(isWorkflowForm.value) {
            data = await FromVariablesRendererRef.value.getFormData(true)
        }else {
            data = await MasterTableVariableFormRef.value.getData(true)
        }
    await adminApi.api.postCaseInstanceTasksComplete({
      caseInstanceId: state.setting.caseInstanceId,
      taskId: state.setting.referenceId,
      variables: data
    })
    
    state.visible = false
    emits('submit')
  } catch (error) {
    state.loading = false
  }
  state.loading = false
}
const CMDProvider = inject(CaseManagementDashboardKey)
const FromVariablesRendererRef = ref()
const MasterTableVariableFormRef = ref()
const isWorkflowForm = ref(false)
async function handleOpen(taskId, actionItem, actionList) {
  state.visible = true
  state.loading = true
  state.title = actionItem.name
  state.setting = actionItem
  const { data } = await adminApi.api.getCaseInstanceTasksTaskidForm(taskId) as any
  // console.log(taskId,actionItem,CMDProvider?.versionId)
        // get cmmn xml
  const fields = data.fields.reduce((prev,item) => {
    prev.push({
      ...item,
      name: item.id,
      label: item.name,
      required: item.required || false,
      dataType: item.type
    })
    return prev
  }, [])
  const initData = data.rows.reduce((prev,item) => {
    if(item.value) prev[item.id] = item.value
    return prev
  }, {})
  const form = await adminApi.api.getRelationQuery({
      processKey: CMDProvider?.caseDefinitionKey.value,
      userTaskId: actionItem.planItemDefinitionId,
      versionId: CMDProvider?.versionId.value
  })
  console.log(data.rows)
  if(form.data[0]) {
      isWorkflowForm.value = true
      const json = JSON.parse(form.data[0].jsonValue || "{}")
      const formData = data.rows.reduce((prev, item) => {
        if(item.value) prev[item.id] = item.value
        return prev
      }, {})
      state.loading = false
      nextTick(() => {
          console.log("form", json, FromVariablesRendererRef.value)
          FromVariablesRendererRef.value.setForm(json, formData)
          
      })
      return;
  }
  isWorkflowForm.value = false

  state.loading = false
  nextTick(() => {
    if(!!fields) MasterTableVariableFormRef.value.init(fields, initData)
  })
}
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped></style>
