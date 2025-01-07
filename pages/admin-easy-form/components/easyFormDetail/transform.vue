<template>
  <el-card>
    <h3 class="title">{{ $t("easyForm.formResult") }}</h3>
    <el-form ref="FormRef" label-position="top" :model="form">
      <el-formItem
        :label="$t('easyForm.startWorkflow')"
        prop="processDefinitionKey"
      >
        <el-select
          v-model="form.processDefinitionKey"
          filterable
          clearable
          @change="handleChange"
        >
          <template v-for="item in state.workflows">
            <el-option
              v-if="item.key"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            ></el-option>
          </template>
        </el-select>
      </el-formItem>
    </el-form>
    <EasyFormDraggable
      :list="detail.formResult"
      :dragHeader="dragHeader"
      :showDrag="false"
      :options="{
        information: detail.information,
        workflowInformation: state.workflowInformation
      }"
      formJsonUrl="admin/easyFormTransform.json"
      @change="handleSave()"
    >
    </EasyFormDraggable>
  </el-card>
</template>
<script lang="ts" setup>
import { SaveEasyFormFieldsApi, GetWorkflowListApi, getFormPropsApi } from "dp-api";
const props = defineProps(["detail"]);
const route = useRoute();
const state = reactive<any>({
  workflows: [],
  workflowInformation: []
});
const form = ref({
  processDefinitionKey: "",
});
const dragHeader = [
  { name: "source", label: $i18n.t("easyForm.formInfomation") },
  { name: "target", label: $i18n.t("easyForm.workflowInfomation") },
];
async function handleSave() {
  try {
    await SaveEasyFormFieldsApi({
      processDefinitionKey: form.value.processDefinitionKey,
      formResult: props.detail.formResult,
      id: route.params.id,
    });
  } catch (error) {
    
  }
}
async function handleChange() {
  if(form.value.processDefinitionKey) await getWorkflowInformationList(form.value.processDefinitionKey)
  handleSave()
}
async function getWorkflowInformationList(workflow: string) {
  const res = await getFormPropsApi({ processKey: workflow });
  state.workflowInformation = res.map(item => ({
    label: item.id,
    value: item.id
  }))
}
async function getOptions() {
  state.workflows = await GetWorkflowListApi();
}
onMounted(() => getOptions());

watch(() => props.detail, (newValue, oldValue) => {
  if(!!oldValue && oldValue.processDefinitionKey === newValue.processDefinitionKey) return
  if(!!newValue.processDefinitionKey) {
    form.value.processDefinitionKey = newValue.processDefinitionKey
    getWorkflowInformationList(form.value.processDefinitionKey)
  }
}, {
  immediate: true
})
</script>
<style lang="scss" scoped></style>
