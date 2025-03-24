<script lang="ts" setup>
import {clientApi} from 'api'

const {caseInstanceId, actionStepId, backItem} = defineProps<{
  caseInstanceId: string,
  actionStepId: string,
  backItem?: any
}>();
const routerProvider = inject(MenuRouterKey);
defineOptions({
  name: 'CaseProcessTaskStartFullPageDead'
})
if (!routerProvider) {
  throw new Error("MenuRouterKey is not provided");
}
const {t} = useI18n();
const formJson = ref()
const formData = ref()
const additionalButton = ref<any[]>([])
const vFormRef = ref()
const inParameters = ref<any>({})
const primaryForm = ref<any>([])
async function setUpForm() {
  try {
    loading.value = true
    // get action item detail from case instance
    const stepDetail = await clientApi.api.postCaseDashboardInstanceActionPreRequisite({
      id: actionStepId
    }).then(res => res.data) as any

    // get latest case detail
    const caseData = await clientApi.api.getCaseDashboardInstanceCaseidPrimaryformData(caseInstanceId)
      .then(res => res.data) as any
    primaryForm.value = caseData.rows
    inParameters.value = stepDetail.inParameters as { [key: string]: string }

    // get form xml
    const xml = await clientApi.api.getWorkflowVersionVersionidBpmnxml(stepDetail.processDefinitionVersionId)
    // get form data
    formData.value = Object.keys(inParameters.value).reduce((prev: any, key) => {
      const valueItem = caseData.rows.find(c => c.id === key)
      if (valueItem) {
        prev[inParameters.value[key]] = valueItem.value
      }
      return prev
    }, {})
    // set case info into form data
    formData.value.caseInstanceId = caseInstanceId
    formData.value.case_id = caseInstanceId

    // get form json with lateset versiion
    formJson.value = await clientApi.api.getRelationQuery({
      userTaskId: 'start',
      processKey: stepDetail.processDefinitionKey,
      versionId: stepDetail.processDefinitionVersionId
    }).then((res: any) => {
      return res.data.length > 0 ? res.data[0].jsonValue ? JSON.parse(res.data[0].jsonValue) : {} : {}
    })
    // get additional element
    const {buttons, components} = getBpmnAddtionalElement(xml, 'start', stepDetail, formJson.value)
    additionalButton.value = buttons
    nextTick(() => {
      console.log("set form data", formData.value)
      vFormRef.value.setForm(formJson.value, formData.value, [], xml)
    })
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

function handelCancel() {
  routerProvider?.back(backItem)
}

async function handleSubmit() {
  const data = await vFormRef.value.getFormData(false, false);
  const variables = Object.keys(inParameters.value).reduce((prev: any, item: any) => {
    const otherKeys = inParameters.value[item]
    if (data[otherKeys]) {
      prev[item] = data[otherKeys]
    } else {
      const orginValue = primaryForm.value.find(item => item.id === otherKeys)
      if (orginValue && orginValue.value) {
        prev[item] = orginValue.value
      }
    }
    return prev
  }, {}) as any
  if (!variables.user_creator_id) {
    variables.user_creator_id = useUserId().value
  }
  await clientApi.api.postCaseInstanceProcessStart({
    id: actionStepId,
    variables
  })
  handelCancel()
}

async function additionSubmit(formData: any) {
  const variables = Object.keys(inParameters.value).reduce((prev: any, item: any) => {
    const otherKeys = inParameters.value[item]
    prev[item] = formData[otherKeys]
    return prev
  }, {}) as any
  const res = await clientApi.api.postCaseInstanceProcessStart({
    id: actionStepId,
    variables
  })
  handelCancel()
}

onMounted(() => {
  setUpForm()
})

const loading = ref(false);
</script>

<template>
  <div v-loading="loading" class="pageContianer">
    <WorkflowDetailFormRender ref="vFormRef">
      <template #action>
        <div class="workflow-detail-pane--btns">
          <template v-for="(item,index) in additionalButton" :key="index">
            <component :is="item.component" v-bind="{...item.props, formData}" @submit="additionSubmit"/>
          </template>
          <el-button id="CaseManagement__Detail__Form_Cancel" @click="handelCancel">
            {{ $t("cancelText") }}
          </el-button>
          <el-button id="CaseManagement__Detail__Form_Submit" type="primary" @click="handleSubmit">
            {{ $t("common_submit") }}
          </el-button>
        </div>
      </template>
    </WorkflowDetailFormRender>
  </div>
</template>


<style lang="scss" scoped>
.pageContianer {
  width: 100%;
  height: 100%;
  padding: var(--app-space-s);
  position: relative;
}
</style>