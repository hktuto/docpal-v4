<script lang="ts" setup>
import type { CalendarEventExternal } from '@schedule-x/calendar'
import {clientApi} from 'api'
import { ElDialog } from 'element-plus'
const opened = ref(false)
const { options } = defineProps<{

    options: CalendarOptions,
}>()


const routerProvider = inject(MenuRouterKey)

const eventDetail = ref<CalendarEventExternal>()
async function open(ev:CalendarEventExternal) {
    eventDetail.value = ev
    if(ev.detail.relatedCases) {
        await getCaseData()
    }
    if(ev.detail.relatedUsers) {
        await getUserData()
    }
    opened.value = true
}
const caseData = ref();
async function getCaseData() {
    try{
        const caseInstanceId = eventDetail.value.detail.relatedCases.caseDefinitionId
        if(!caseInstanceId) return
        const res = await clientApi.api.getCaseDashboardInstanceCaseidPrimaryformData(caseInstanceId,{
            headers:{
                "noThrowError":"true"
            }
        })
    }catch(err) {
        caseData.value = null
    }
}

const relatedUserId = ref();
async function getUserData(){
    try{
        const eventUserId = eventDetail.value.detail.relatedUsers.user
        if(!eventUserId) throw new Error("eventUserId is empty")
        relatedUserId.value = eventUserId
    }catch(err){
        relatedUserId.value = null
    }
}

function openCase(){
    const caseId = eventDetail.value.detail.relatedCases.caseDefinitionId
}

async function openWorkflow(){
    const workflow = eventDetail.value.detail.relatedWorkflows
    const processInstanceId = workflow.processInstanceId
    const taskList = await clientApi.api.getWorkflowTasks({processInstanceId}).then(res => res.data)
    if(taskList && taskList.length > 0) {
        const task = taskList[0]
        const newTab = routeWorkflowDetail({
            id: task.id,
            name: task.name
        })
        routerProvider?.navigateTo(newTab, true)
    }
}



defineExpose({
    open
})
</script>
<template>

    <ElDialog v-model="opened" draggable >
        <div class="content">
            <ElForm label-position="top">
                <ElRow :gutter="12">
                    <ElCol :span="12">
                        <ElFormItem label="Start">
                            <ElDatePicker v-model="eventDetail.detail.startTime" format="YYYY-MM-DD HH:mm" :disabled="!options.editable" ></ElDatePicker>
                        </ElFormItem>
                    </ElCol>
                    <ElCol :span="12">
                        <ElFormItem label="End">
                            <ElDatePicker v-model="eventDetail.detail.endTime" format="YYYY-MM-DD HH:mm" :disabled="!options.editable"></ElDatePicker>
                        </ElFormItem>
                    </ElCol>
                </ElRow> 
            </ElForm>
            <!-- Related Workflow -->
            <div v-if="eventDetail?.detail?.relatedWorkflows" class="relatedWorkflow pointer">
                <div class="relatedWorkflowTitle">Related Workflow</div>
                <div class="workflowTitle" @click="openWorkflow">
                   {{ eventDetail.detail.relatedWorkflows.businessKey}}
                    <!-- {{ eventDetail.detail.relatedWorkflows }} -->
                </div>
            </div>

            <div v-if="caseData" class="relatedWorkflow pointer">
                <div class="relatedWorkflowTitle">Related Case</div>
                <div class="workflowTitle" @click="openCase">
                    <!-- {{ eventDetail.detail.relatedWorkflows }} -->
                </div>
            </div>
            <div v-if="relatedUserId" class="relatedWorkflow">
                <div class="relatedWorkflowTitle">Related User</div>
                <div class="workflowTitle">
                    {{ relatedUserId }}
                </div>
            </div>
        </div>
    </ElDialog>
</template>

<style lang="scss" scoped>
.relatedWorkflow{
    width:100%;
    height: 100%;
    padding: var(--app-space-s);
    background: var(--app-grey-950);
    cursor: pointer;
    border-radius: var(--app-border-radius-m);
    margin-bottom: var(--app-space-s);
    .relatedWorkflowTitle{
        font-size: var(--app-font-size-s);
        font-weight: normal;
        color: var(--app-grey-200);
    }
    .workflowTitle{
        font-size: var(--app-font-size-l);
        font-weight: bold;
        color: var(--app-accent-color);
    }
}

</style>