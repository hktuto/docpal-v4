<template>
  <el-dialog
    v-model="state.visible"
    :title="$t('Add / Edit Properties')"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson"/>
    <template #footer>
      <el-button id="EasyForm__Detail__FormInformation__AddField__Submit" type="primary" :loading="state.loading"
                 @click="handleSubmit">
        {{ $t("common_submit") }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
// import caseFieldJson from './caseField.vform.json'
// import caseFlowableInJson from './caseFlowableIn.vform.json'
// import caseFlowableOutJson from './caseFlowableOut.vform.json'
// import caseHumanTaskFieldsJson from './caseHumanTaskFields.vform.json'
// import caseSentryJson from './caseSentry.vform.json'
import easyFormInfomation from './easyFormInfomation.vform.json'
import easyFormTransform from './easyFormTransform.vform.json'

const jsonMap = {
  // "cmmn/field.json": caseFieldJson,
  // "flowableIn": caseFlowableInJson,
  // "flowableOut": caseFlowableOutJson, 
  // "humanTaskFields": caseHumanTaskFieldsJson,
  // "sentry": caseSentryJson,
  "admin/easyFormInfomation.json": easyFormInfomation,
  "admin/easyFormTransform.json": easyFormTransform
}
const props = withDefaults(
  defineProps<{
    // 'cmmn/field.json'| 'flowableIn' | 'flowableOut' | 'humanTaskFields' | 'sentry' |
    formJsonUrl: 'admin/easyFormInfomation.json' | 'admin/easyFormTransform.json';
    filterList: any;
    options: any;
  }>(),
  {
    formJsonUrl: "admin/easyFormInfomation.json",
    options: {}
  }
);
const emits = defineEmits(["refresh", "edit", "create"]);
const state = reactive({
  visible: false,
  isEdit: false,
  workflowProperties: [],
});
const FormRendererRef = ref();
let formJson = jsonMap[props.formJsonUrl];

// const formJson = getJsonApi('admin/adminAclForm.json')
async function handleSubmit() {
  const data = await FormRendererRef.value.vFormRenderRef.getFormData();
  if (state.isEdit) emits("edit", {...data});
  else emits("create", {...data});
  state.visible = false;
}

function handleOpen(row: any) {
  state.isEdit = !!row ? true : false;
  state.visible = true;
  setTimeout(async () => {
    // FormRendererRef.value.vFormRenderRef.setFormJson(formJson)
    FormRendererRef.value.vFormRenderRef.resetForm();
    setFormOptions(row)
    if (state.isEdit && !!row)
      await FormRendererRef.value.vFormRenderRef.setFormData({...row});
  });
}

function getFilterList(row: any = {}, uniqueName: string = "name") {
  let list;
  try {
    if (!!row)
      list = props.filterList.filter((item) => item[uniqueName] !== row[uniqueName]);
    else list = [...props.filterList];
  } catch (error) {
    list = [];
  }
  return list;
}

function setFileterList(row: any, uniqueName: string = "filterList") {
  const filterList = getFilterList(row);
  const filterListRef = FormRendererRef.value.vFormRenderRef.getWidgetRef(uniqueName);
  filterListRef.loadOptions(filterList);
  return filterList;
}

async function setFormOptions(row: any) {
  switch (props.formJsonUrl) {
    case "admin/easyFormInfomation.json":
      setFileterList(row);
      break;
    case "admin/easyFormTransform.json":
      setFileterList(row);
      const formList = props.options.information.map(item => ({
        label: item.name,
        value: item.name
      }))

      loadInfomationOptions('source', formList, props.filterList, 'source')
      loadInfomationOptions('target', props.options.workflowInformation, props.filterList, 'target')
      break;
    default:
      break;
  }
}

async function loadInfomationOptions(uniqueName: string, sourceList: any, filterList: any = null, prop: string = 'source') {
  const widgetRef = FormRendererRef.value.vFormRenderRef.getWidgetRef(uniqueName)
  let resultList = sourceList
  if (!!filterList) {
    resultList = sourceList.filter(item => !filterList.find(f => f[prop] === item.value))
  }
  widgetRef.loadOptions(resultList)
}

defineExpose({handleOpen});
</script>
<style lang="scss" scoped></style>
