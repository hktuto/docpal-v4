<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { clientApi } from 'api'
import { routeWorkflowPage } from '~/utils/routerHelper'

const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw new Error('MenuRouterKey is not provided')
}
const { id, workflowType, backItem } = defineProps<{
  id: string
  workflowType: string
  backItem?: any
}>()
// @ts-ignore
const userId: string = useUserId().value
const isMobile = false
const { t } = useI18n()
const state = reactive<any>({
  processState: {
    completeTask: 'completeTask'
  },
  isCompleted: false,
  activeTab: 'form',
  taskDetail: {},
  activityList: [],
  loading: false,
  submitShow: false,
  error: null
})

async function getDetail() {
  try {
    state.loading = true
    state.error = null
    switch (workflowType) {
      case state.processState.completeTask:
        const historyList: any = await clientApi.api.postWorkflowHistoryProcess({
          processInstanceId: id,
          completed: true
        }).then((res) => res?.data?.entryList)
        if (!!historyList && historyList.length > 0) {
          state.taskDetail = historyList[0]
        }
        break
      default:
        state.taskDetail = await clientApi.api.postWorkflowTask({ taskId: id }).then((res) => res.data)
        if (!state.taskDetail) {
          // handle if workflow task is already complete ,and should use history api
          state.taskDetail = await clientApi.api.postWorkflowHistoryProcess({
            processInstanceId: id,
            completed: true
          }).then((res) => res.data)
          state.isCompleted = true
        }
    }
    handleGetActivity()
  } catch (error) {
    state.error = error
  }
  setTimeout(async () => {
    try {
      await handleFormDataGet()
      handleDisabledForm()
    } catch (error) {
      console.log(error)
    }
    state.loading = false
  }, 100)
}

async function handleGetActivity() {
  const processInstanceId = state.taskDetail.instanceId || state.taskDetail.processInstanceId
  state.activityList = await clientApi.api
    .postWorkflowHistoryActivity({
      processInstanceId
    })
    .then((res: any) => res.data?.list.filter((i) => i.activityName).reverse())
}

// #region module: form
const vFormRef = ref()
const displayMode = ref<'form' | 'signature'>('')
async function handleFormDataGet() {
  let formJson
  let formData
  let xml
  switch (workflowType) {
    case state.processState.completeTask:
      formData = state.taskDetail.processVariables
      formJson = await formJsonGet('end', state.taskDetail.processDefinitionKey, state.taskDetail.processDefinitionVersionId)
      if (!formJson.formConfig) {
        formJson = await formJsonGet('complete', state.taskDetail.processDefinitionKey, state.taskDetail.processDefinitionVersionId)
        if (!formJson.formConfig) {
          if (!state.activityList || state.activityList.length === 0) await handleGetActivity()
          const lastActivity = state.activityList[0]
          formJson = await formJsonGet(lastActivity.activityId, state.taskDetail.processDefinitionKey, state.taskDetail.processDefinitionVersionId)
        }
      }
      xml = await clientApi.api.getWorkflowVersionVersionidBpmnxml(state.taskDetail.processDefinitionVersionId)
      console.log('formData', formData)
      vFormRef.value.setForm(formJson, formData, [], xml)
      handleAdditionalSetting(xml, state.taskDetail, formData)
      break
    default:
      const properties = await clientApi.api.postWorkflowProperties({ taskId: id }).then((res) => res.data)

      formData = formDataGetFromProps(properties)
      formJson = await formJsonGet(
        state.taskDetail.taskDefinitionKey,
        state.taskDetail.taskInstance.processDefinitionKey,
        state.taskDetail.processDefinitionVersionId
      )
      xml = await clientApi.api.getWorkflowVersionVersionidBpmnxml(state.taskDetail.processDefinitionVersionId)
      vFormRef.value.setForm(formJson, formData, [], xml)
      handleAdditionalSetting(xml, state.taskDetail, formData)
      break
  }
}

function formDataGet(obj: any) {
  if (!obj) obj = {}
  return Object.keys(obj).reduce((prev: any, key: string) => {
    prev[key] = String(obj[key])
    return prev
  }, {})
}

function formDataGetFromProps(list: any) {
  return list.reduce((prev: any, item: any) => {
    // if item type is boolean, convert string to boolean
    if (item.type === 'boolean' && (item.value === 'true' || item.value === 'false')) {
      item.value = item.value === 'true'
    }
    if (item.value !== null && item.value !== undefined) {
      prev[item.id] = item.value
    }
    return prev
  }, {})
}

async function formJsonGet(userTaskId: string, processKey: string, versionId: string) {
  // @ts-ignore
  const response: any = await clientApi.api
    .getRelationQuery({
      userTaskId,
      processKey,
      versionId
    })
    .then((res) => res.data)
  if (!response || !response[0] || (response[0] && !response[0].jsonValue)) return {}
  return JSON.parse(response[0].jsonValue)
}

function handleDisabledForm() {
  if (!isAssigneeUser.value || workflowType === 'completeTask') {
    vFormRef.value.disableForm()
  }
}

async function handleSave() {
  try {
    const data = await vFormRef.value.getFormData(false, false)
    state.loading = true
    const param = {
      taskId: id,
      properties: { ...data }
    }
    await clientApi.api.postWorkflowPropertiesSave(param)
    routerProvider?.message.success(`${t('msg_successfulOperation')}`)
  } catch (error) {
    console.log(error)
    // routerProvider?.message.error(error)
  }
  state.loading = false
}

async function handleSubmit() {
  state.loading = true
  try {
    // FIXME : auto assign workflow to user if assigee is not user, API should auto do this step, if so remove this step
    if (state.taskDetail?.assignee !== userId) {
      await clientApi.api.postWorkflowTaskClaim({ taskId: id, userId }).then((res) => res.data)
    }
    // get form data
    let data = await vFormRef.value.getFormData(true, false)
    // return;
    if (!data) throw new Error(`${t('incompleteData')}`)
    // check additional button
    // if additional button has expose "beforeSubmit" method, call it
    const additionButtonActions: any = []
    additionalButtonRef.value.forEach((item) => {
      if (item && item.beforeSubmit) {
        additionButtonActions.push(item.beforeSubmit())
      }
    })
    const buttonResults = await Promise.all(additionButtonActions)
    console.log('additionButtonActions', buttonResults)
    // after check all actions, if any addtional data need to set to from data, set it
    buttonResults.forEach((item: any) => {
      if (item && typeof item === 'object') {
        data = { ...data, ...item }
      }
    })
    // end addtional button actions

    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'object') {
        data[key] = JSON.stringify(data[key])
      }
    })
    const param = {
      taskId: id,
      properties: { ...data }
    }
    const res: any = await clientApi.api.postWorkflowFormSubmit(param).then((res) => res.data)
    routerProvider?.message.success(`${t('msg_successfulOperation')}`)
    const fallbackRoute = routeWorkflowPage({
      workflowType: workflowType
    })
    routerProvider?.back(fallbackRoute)
  } catch (error) {
    console.log('error', error)
    // routerProvider?.message.error(error.message)
  } finally {
    state.loading = false
  }
}

// #endregion

type AdditionalButton = {
  props: any
  component: string
}
const additionalButton = ref<AdditionalButton[]>([])
const additionalButtonRef = ref<any[]>([])

async function handleAdditionalSetting(xml: any, taskDetail: any, formData: any) {
  const { buttons, components, signatureSetting } = await getBpmnAddtionalElement(xml, state.taskDetail.taskDefinitionKey, taskDetail, formData)
  additionalButton.value = buttons
  if(signatureSetting) {
    displayMode.value = 'signature'
  }else{
    displayMode.value = 'form'
  }
}

async function addtionalSubmit(formData: any) {
  if (state.taskDetail?.assignee !== userId) {
    await clientApi.api.postWorkflowTaskClaim({ taskId: id, userId }).then((res) => res.data)
  }
  const param = {
    taskId: id,
    properties: { ...formData }
  }
  const res: any = await clientApi.api.postWorkflowFormSubmit(param).then((res) => res.data)
  routerProvider?.message.success(`${t('msg_successfulOperation')}`)
  if (backItem) {
    routerProvider?.back(backItem)
  } else {
    const fallbackRoute = routeWorkflowPage({
      workflowType: workflowType
    })
    routerProvider?.back(fallbackRoute)
  }
}

const handleTaskInfoChange = async (taskDetailRes: any, isClaim: boolean) => {
  try {
    state.taskDetail = { ...taskDetailRes }
    handleGetActivity()
    if (!isAssigneeUser.value) {
      state.loading = true
      await handleFormDataGet()
    } else {
      vFormRef.value.disableForm()
    }
  } catch (error) {
  }
  state.loading = false
}

function tabChange(tab: string) {
  // router.push({query: { tab, state: workflowType }})
}

function handleBack() {
  routerProvider?.navigateTo(
    routeWorkflowPage({
      workflowType: workflowType
    }),
    false
  )
}

const isAssigneeUser = computed(() => {
  return !state.taskDetail?.assignee || state.taskDetail?.assignee === userId
})
onMounted(() => {
  const backLinks = routerProvider?.getHistory()
  if (!backItem && backLinks && backLinks.length > 0) {
    routerProvider?.updateProps({
      backItem: backLinks[backLinks.length - 1]
    })
  }
  if (backItem && backLinks.length === 0) {
    routerProvider?.addToHistory(backItem)
  }
  getDetail()
})
</script>
<template>
  <div v-if="!state.error" class="pageContainer--padding workflow-detail">
    <el-tabs v-model="state.activeTab" class="dp-tabs--auto" @tab-change="tabChange">
      <el-tab-pane class="workflow-detail-pane" :label="$t('workflow_info')" name="info" v-loading="state.loading">
        <WorkflowDetailCompleteInfo v-if="state.processState[workflowType]" :taskDetail="state.taskDetail"
                                    :state="workflowType"></WorkflowDetailCompleteInfo>
        <WorkflowDetailInfo v-else :taskDetail="state.taskDetail" :id="id"
                            @change="handleTaskInfoChange"></WorkflowDetailInfo>
      </el-tab-pane>
      <el-tab-pane class="workflow-detail-pane" :label="$t('workflow_form')" name="form" v-loading="state.loading">
          <div :class="{workflowFormContainer:true, [displayMode]:true ,glass: displayMode === 'signature'}">
            <WorkflowDetailFormRender ref="vFormRef" :taskDetail="state.taskDetail">
                <template #action>
                  <div class="workflow-detail-pane--btns" v-if="isAssigneeUser">
                    <template v-for="(item, index) in additionalButton" :key="index">
                      <component :is="item.component" ref="additionalButtonRef" v-bind="item.props"
                                @submit="addtionalSubmit" />
                    </template>
                    <el-button id="Workflow__AvailableTask__Detail__Form__SaveDraft" :disabled="workflowType === 'completeTask'" @click="handleSave">
                      {{ $t('workflow_save') }}
                    </el-button>
                    <el-button id="Workflow__AvailableTask__Detail__Form__Submit" type="primary" :disabled="workflowType === 'completeTask'" @click="handleSubmit">
                      {{ $t('common_submit') }}
                    </el-button>
                  </div>
                </template>
              </WorkflowDetailFormRender>
          </div>
          <template v-if="displayMode === 'signature'">
            <!-- template viewer -->
            <div class="templateViewerContainer">
              <DocTemplateViewer ref="templateViewerRef" v-if="!state.isEdit" :options="documentOptions"
                               :json="jsonData" />
            </div>

          </template>
      </el-tab-pane>
      <el-tab-pane :label="$t('workflow_graph')" name="graph">
        <!-- need to use v-if for bpmn, if not  svg graph will not show -->
        <WorkflowDetailGraph
          v-if="state.activeTab === 'graph'"
          :processDefinitionId="state.taskDetail?.processDefinitionId || state.taskDetail?.taskInstance?.processDefinitionId"
          :processDefinitionVersionId="state.taskDetail?.processDefinitionVersionId"
          :deploymentId="state.taskDetail?.deploymentId || state.taskDetail?.taskInstance?.deploymentId"
          :steps="state.activityList"
        />
      </el-tab-pane>
      <el-tab-pane v-if="state.taskDetail && state.taskDetail.instanceId && isMobile"
                   :label="$t('common_discussionChannel')" name="command">
        <WorkflowDetailDiscussionChannel :id="state.taskDetail.instanceId" :noToggle="true" />
      </el-tab-pane>
    </el-tabs>
    <WorkflowDetailDiscussionChannel v-if="state.taskDetail && state.taskDetail.instanceId && !isMobile"
                                     :id="state.taskDetail.instanceId" />
  </div>
  <div v-else>
    Workflow id not found, workflow id : {{ id }}.
    <el-button id="Workflow__AvailableTask__Detail__Form__Back" type="primary" @click="handleBack">
      {{ $t('common_back') }}
    </el-button>
  </div>
</template>
<style lang="scss" scoped>
.pageContainer--padding.workflow-detail {
  display: grid;
  grid-template-columns: 1fr min-content;
  height: 100%;
  gap: var(--app-space-xs);
  overflow: hidden;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
  }
}

.dp-tabs--auto {
  height: 100%;
  overflow: hidden;

  .el-tab-pane {
    height: 100%;
  }
}

.workflow-detail-pane {
  display: grid;
  grid-template-rows: 1fr min-content;

  &--btns {
    box-shadow: var(--el-box-shadow-light);
    padding: var(--app-space-s);
    // text-align: right;
  }
}

.workflowFormContainer{
  &.form{}
  &.signature{
    position: absolute;
    top: var(--app-space-xs);
    right: var(--app-space-xs);
    width: clamp(220px, 40vw, 600px);
    height: calc( 100% - var(--app-space-xs) * 2);
    padding: var(--app-space-s);
  }
}
</style>
