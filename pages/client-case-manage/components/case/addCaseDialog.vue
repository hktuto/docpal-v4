<script setup lang="ts">
import {clientApi} from "api";
import {ElMessage} from 'element-plus'

const {t} = useI18n()
const state = reactive({
  id: '',
  loading: false,
  visible: false,
  title: t('masterTable.newRow')
})
const FromVariablesRendererRef = ref()
const MasterTableVariableFormRef = ref()
const isWorkflowForm = ref(false)

async function handleOpen(id: string, caseDetail: any) {
  try {
    state.id = id;
    const {data: startForm} = await clientApi.api.getCaseInstanceCasetypeidStarttask(id);
    // get cmmn xml
    const form = await clientApi.api.getRelationQuery({
      processKey: caseDetail.caseDefinitionKey,
      userTaskId: startForm[0].key,
      versionId: caseDetail.productionVersionId
    })
    state.visible = true
    state.loading = true
    // if form is not empty
    if (form.data[0]) {
      isWorkflowForm.value = true
      const json = JSON.parse(form.data[0].jsonValue || "{}")


      nextTick(() => {
        console.log("form", json, FromVariablesRendererRef.value)
        FromVariablesRendererRef.value.setForm(json, [])

      })
      return;
    }
    isWorkflowForm.value = false
    // other, use old form

    if (!startForm) throw new Error("no data");
    const first = startForm[0];
    state.title = first.name

    const fields = first.fields?.reduce((prev, item) => {
      prev.push({
        ...item,
        name: item.id,
        label: item.name,
        required: item.required || false,
        dataType: item.type
      })
      return prev
    }, [])
    const initData = first.fields?.reduce((prev, item) => {
      if (item.value) prev[item.id] = item.value
      return prev
    }, {})
    setTimeout(() => {
      if (!!fields) MasterTableVariableFormRef.value.init(fields, initData)
    })

  } catch (error) {
    ElMessage.error('no data')
    state.visible = false
  } finally {
    state.loading = false
  }
}

const emits = defineEmits([
  'refresh', 'delete'
])

async function handleSubmit() {
  state.loading = true
  try {
    let data: any;
    if (isWorkflowForm.value) {
      data = await FromVariablesRendererRef.value.getFormData(true)
    } else {
      data = await MasterTableVariableFormRef.value.getData(true)
    }
    await clientApi.api.postCaseInstanceStart({
      caseTypeId: state.id,
      parameters: data
    })
    state.visible = false
    emits('refresh')
  } catch (error) {
    state.loading = false
  }
  state.loading = false
}

const props = withDefaults(defineProps<{
  ignoreList?: string[],
}>(), {
  ignoreList: [],
})

defineExpose({handleOpen})
</script>

<template>
  <el-dialog v-model="state.visible" :title="state.title" class="scroll-dialog" append-to-body
             :close-on-click-modal="false" destroy-on-close @close="handleClose">
    <WorkflowDetailFormRender v-if="isWorkflowForm" ref="FromVariablesRendererRef"/>
    <MasterTableVariableForm v-else ref="MasterTableVariableFormRef" :ignoreList="ignoreList"/>
    <template #footer>
      <div class="footer-grid">
        <el-button id="clientCaseManagementDetailsAddNewRowSubmit" type="primary" :loading="state.loading"
                   @click="handleSubmit">
          {{ $t('common_submit') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>