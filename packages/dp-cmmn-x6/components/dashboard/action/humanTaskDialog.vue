<template>
  <el-dialog v-model="state.visible" :title="state.title" class="scroll-dialog" append-to-body
    :close-on-click-modal="false" destroy-on-close @close="handleClose">
    <MasterTableVariableForm ref="FormVariablesRendererRef" :ignoreList="ignoreList" />
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
  'refresh', 'delete'
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
    const data = await FormVariablesRendererRef.value.getData(true)
    await adminApi.api.postCaseInstanceTasksComplete({
      caseInstanceId: state.setting.caseInstanceId,
      taskId: state.setting.referenceId,
      variables: data
    })
    
    state.visible = false
    emits('refresh')
  } catch (error) {
    state.loading = false
  }
  state.loading = false
}

const FormVariablesRendererRef = ref()
async function handleOpen(taskId, actionItem) {
  state.visible = true
  state.loading = true
  state.title = actionItem.name
  state.setting = actionItem
  const { data } = await adminApi.api.getCaseInstanceTasksTaskidForm(taskId) as any
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
  // fields.push(
  //   { id: "testVo", name: "testVo", label: "testVo", required: false, dataType: "volcaboury", vocabulary:"country"},
  //   { id: "testMs", name: "testMs", label: "testMs", required: false, dataType: "master_table", masterTable:"Table Directives", displayField:"department"},
  //   { id: "testdocument", name: "testdocument", label: "testdocument", required: false, dataType: "document", documentType:"File", displayField:"dc:title" },
  //   { id: "test_user_group", name: "test_user_group", label: "test_user_group", required: false, dataType: "user_group" }
  // )
  state.loading = false
  setTimeout(() => {
    if(!!fields) FormVariablesRendererRef.value.init(fields, initData)
  })
}
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped></style>
