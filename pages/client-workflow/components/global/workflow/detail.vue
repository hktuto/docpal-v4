<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { clientApi } from "api";
import { routeWorkflowPage } from "~/utils/routerHelper";
const routerProvider = inject(MenuRouterKey);
if (!routerProvider) {
  throw new Error("MenuRouterKey is not provided");
}
const { id, workflowType } = defineProps<{
  id: string;
  workflowType: string;
}>();
// @ts-ignore
const userId: string = useUserId().value;
const isMobile = false
const { t } = useI18n();
const state = reactive<any>({
  processState: {
    completeTask: "completeTask",
  },
  isCompleted: false,
  activeTab: "info",
  taskDetail: {},
  activityList: [],
  loading: false,
  submitShow: false,
  error: null,
});
async function getDetail() {
  try {
    state.loading = true;
    state.error = null;
    switch (workflowType) {
      case state.processState.completeTask:
        const historyList: any = await clientApi.api
          .postWorkflowHistoryProcess({ processInstanceId: id, completed: true })
          .then((res) => res?.data?.entryList);
        if (!!historyList && historyList.length > 0) {
          state.taskDetail = historyList[0];
        }
        console.log(state.taskDetail);
        break;
      default:
        state.taskDetail = await clientApi.api
          .postWorkflowTask({ taskId: id })
          .then((res) => res.data);
        if (!state.taskDetail) {
          // handle if workflow task is already complete ,and should use history api
          state.taskDetail = await clientApi.api
            .postWorkflowHistoryProcess({ processInstanceId: id, completed: true })
            .then((res) => res.data);
          state.isCompleted = true;
        }
    }
    handleGetActivity();
  } catch (error) {
    state.error = error;
  }
  setTimeout(async () => {
    try {
      await handleFormDataGet();
      handleDisabledForm();
    } catch (error) {}
    state.loading = false;
  }, 100);
}
async function handleGetActivity() {
  const processInstanceId =
    state.taskDetail.instanceId || state.taskDetail.processInstanceId;
  state.activityList = await clientApi.api.postWorkflowHistoryActivity({
    processInstanceId,
  }).then((res: any) => res.data?.list.filter(i => i.activityName).reverse());
}
// #region module: form
const vFormRef = ref();
async function handleFormDataGet() {
  let formJson;
  let formData;
  let xml;
  switch (workflowType) {
    case state.processState.completeTask:
      formData = state.taskDetail.processVariables;
      formJson = await formJsonGet("end", state.taskDetail.processDefinitionKey, state.taskDetail.processDefinitionVersionId);
      xml = await clientApi.api.getWorkflowVersionVersionidBpmnxml(state.taskDetail.processDefinitionVersionId)
      vFormRef.value.setForm(formJson, formData, [], xml);
      handleAdditionalSetting(xml, state.taskDetail, formData)
      break;
    default:
      console.log(
        "state.taskDetail.taskDefinitionKey",
        state.taskDetail.taskDefinitionKey
      );

      const properties = await clientApi.api
        .postWorkflowProperties({ taskId: id })
        .then((res) => res.data);
      console.log("properties", properties);
      
      formData = formDataGetFromProps(properties);
      formJson = await formJsonGet(
        state.taskDetail.taskDefinitionKey,
        state.taskDetail.taskInstance.processDefinitionKey,
        state.taskDetail.processDefinitionVersionId
      );
      console.log("formData", formData);
      xml = await clientApi.api.getWorkflowVersionVersionidBpmnxml(state.taskDetail.processDefinitionVersionId)
      vFormRef.value.setForm(formJson, formData, [], xml);
      handleAdditionalSetting(xml, state.taskDetail, formData)
      break;
  }
}
function formDataGet(obj: any) {
  return Object.keys(obj).reduce((prev: any, key: string) => {
    prev[key] = String(obj[key]);
    return prev;
  }, {});
}
function formDataGetFromProps(list: any) {
  return list.reduce((prev: any, item: any) => {
    // if item type is boolean, convert string to boolean
    if (item.type === "boolean" && (item.value === "true" || item.value === "false")) {
      item.value = item.value === "true";
    }

    prev[item.id] = item.value;
    return prev;
  }, {});
}
async function formJsonGet(userTaskId: string, processKey: string, versionId: string) {
  // @ts-ignore
  const response: any = await clientApi.api.getRelationQuery({ userTaskId, processKey, versionId }).then((res) => res.data);
  if (!response || !response[0] || (response[0] && !response[0].jsonValue)) return {};
  return JSON.parse(response[0].jsonValue);
}
function handleDisabledForm() {
  if (userId !== state.taskDetail.assignee) {
    vFormRef.value.disableForm();
  }
}
async function handleSave() {
  try {
    const data = await vFormRef.value.getFormData(false, false);
    state.loading = true;
    const param = {
      taskId: id,
      properties: { ...data },
    };
    await clientApi.api.postWorkflowPropertiesSave(param);
    ElMessage.success(`${t("msg_successfulOperation")}`);
  } catch (error) {
    // ElMessage.error(error)
  }
  state.loading = false;
}
async function handleSubmit() {
  state.loading = true;
  try {
    const data = await vFormRef.value.getFormData(true, false);
    if (!data) throw new Error(`${t("incompleteData")}`);
    // convert all item in data which is boolean to string
    // Object.keys(data).forEach(key => {
    //     if (typeof data[key] === 'boolean') {
    //         data[key] = String(data[key])
    //     }
    // })
    const param = {
      taskId: id,
      properties: { ...data },
    };
    const res: any = await clientApi.api
      .postWorkflowFormSubmit(param)
      .then((res) => res.data);
    ElMessage.success(`${t("msg_successfulOperation")}`);
    routerProvider?.navigateTo(
      routeWorkflowPage({
        workflowType: workflowType,
      }),
      false
    );
  } catch (error) {
    console.log('error', error)
    // ElMessage.error(error.message)
  }finally{
    state.loading = false;
  }  
}
// #endregion

type AdditionalButton = {
    props: any,
    component: string,
}
const additionalButton = ref<AdditionalButton[]>([])
function handleAdditionalSetting(xml:any, taskDetail: any, formData:any) {
    const xmlJson = bpmnStringToJson(xml)
    const currentTask = xmlJson.flatObj[state.taskDetail.taskDefinitionKey]
    // check generate document button 
    const generateDocumentComponent = "LazyBpmnButtonGenerateDocument"
    if(currentTask.extensionElements && currentTask.extensionElements['docpal:previewDocumentButton']){
        if(Array.isArray(currentTask.extensionElements['docpal:previewDocumentButton'])){
            currentTask.extensionElements['docpal:previewDocumentButton'].forEach((item:any) => {
                additionalButton.value.push({
                    props: {
                        ...item,
                        xml,
                        formData,
                        taskDetail
                    },
                    component: generateDocumentComponent
                })
            })
        }else{
            additionalButton.value.push({
                props: {
                   ...currentTask.extensionElements['docpal:previewDocumentButton'],
                   xml,
                   formData,
                   taskDetail
                },
                component: generateDocumentComponent
            })
        }
    }
}


const handleTaskInfoChange = async (taskDetailRes: any, isClaim: boolean) => {
  try {
    state.taskDetail = { ...taskDetailRes };
    handleGetActivity();
    if (isClaim) {
      state.loading = true;
      await handleFormDataGet();
    } else {
      vFormRef.value.disableForm();
    }
  } catch (error) {}
  state.loading = false;
};
function tabChange(tab: string) {
  console.log(tab);

  // router.push({query: { tab, state: workflowType }})
}
function handleBack() {
  routerProvider?.navigateTo(routeWorkflowPage({
    workflowType: workflowType,
  }), false);
}
const isAssigneeUser = computed(() => {
  const id = state.taskDetail?.assignee || "";
  return id === userId;
});
onActivated(() => {
  getDetail();
});
</script>
<template>
  <div  v-if="!state.error" class="pageContainer--padding workflow-detail">
    <el-tabs v-model="state.activeTab" class="dp-tabs--auto" @tab-change="tabChange">
      <el-tab-pane
        class="workflow-detail-pane"
        :label="$t('workflow_info')"
        name="info"
        v-loading="state.loading"
      >
        <WorkflowDetailCompleteInfo
          v-if="state.processState[workflowType]"
          :taskDetail="state.taskDetail"
          :state="workflowType"
        ></WorkflowDetailCompleteInfo>
        <WorkflowDetailInfo
          v-else
          :taskDetail="state.taskDetail"
          :id="id"
          @change="handleTaskInfoChange"
        ></WorkflowDetailInfo>
      </el-tab-pane>
      <el-tab-pane
        class="workflow-detail-pane"
        :label="$t('workflow_form')"
        name="form"
        v-loading="state.loading"
      >
        <WorkflowDetailFormRender ref="vFormRef" :taskDetail="state.taskDetail">
            <template #action>
              <div class="workflow-detail-pane--btns" v-if="isAssigneeUser">
                <template v-for="(item,index) in additionalButton" :key="index">
                    <component :is="item.component" v-bind="item.props" />
                </template>
                <el-button @click="handleSave">{{ $t("workflow_save") }}</el-button>
                <el-button type="primary" @click="handleSubmit">{{
                  $t("common_submit")
                }}</el-button>
              </div>
            </template>
          </WorkflowDetailFormRender>
        
      </el-tab-pane>
      <el-tab-pane :label="$t('workflow_graph')" name="graph">
        <!-- need to use v-if for bpmn, if not  svg graph will not show -->
        <WorkflowDetailGraph
          v-if="state.activeTab === 'graph'"
          :processDefinitionId="
            state.taskDetail?.processDefinitionId ||
            state.taskDetail?.taskInstance?.processDefinitionId
          "
          :deploymentId="
            state.taskDetail?.deploymentId || state.taskDetail?.taskInstance?.deploymentId
          "
          :steps="state.activityList"
        />
      </el-tab-pane>
      <el-tab-pane
        v-if=" state.taskDetail &&  state.taskDetail.instanceId && isMobile"
        :label="$t('common_discussionChannel')"
        name="command"
      >
        <WorkflowDetailDiscussionChannel
          :id=" state.taskDetail.instanceId"
          :noToggle="true"
        />
      </el-tab-pane>
    </el-tabs>
    <WorkflowDetailDiscussionChannel v-if="state.taskDetail && state.taskDetail.instanceId && !isMobile" :id="state.taskDetail.instanceId"/>
  </div>
  <div v-else>
        Workflow id not found, workflow id : {{id}}.
        <el-button type="primary" @click="handleBack">{{$t('common_back')}}</el-button>
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
    text-align: right;
  }
}
</style>
