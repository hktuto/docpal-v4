<script lang="ts" setup>
import {ElMessage} from 'element-plus'
import {MenuRouterKey} from '#imports'
import { clientApi } from 'api'
const {userTaskId, processKey, versionId} = defineProps<{
    userTaskId: string,
    processKey: string,
    versionId: string,
}>()
defineOptions({
    name: 'WorkflowStartFullPageDead'
})

const loading = ref(false)
const vFormRef = ref()
const routerProvider = inject(MenuRouterKey)
function formDataGet (propList:any = []) {
    return propList.reduce((prev:any, item:any) => {
        prev[item.id] = item.value
        return prev
    }, {})
}
async function formJsonGet (userTaskId:string, processKey:string, versionId: string) {
    const response: any = await clientApi.api.getRelationQuery({userTaskId, processKey, versionId }).then(res => res.data)
    if (!response[0] ||
        response[0] && !response[0].jsonValue) return {}
    return JSON.parse(response[0].jsonValue)
}
async function init(){
    const props = await clientApi.api.postWorkflowProperties({ processKey }).then(res => res.data)
    const formData = formDataGet(props)
    const formJson = await formJsonGet('start', processKey, versionId)
    const xml = await clientApi.api.getWorkflowVersionVersionidBpmnxml(versionId)
    handleAdditionalSetting(xml, {}, formData)
    nextTick(() => {
        vFormRef.value.setForm(formJson, formData, props)
    })
}
type AdditionalButton = {
    props: any,
    component: string,
}
const additionalButton = ref<AdditionalButton[]>([])
function handleAdditionalSetting(xml:any, taskDetail: any, formData:any) {
    const {buttons,components} = getBpmnAddtionalElement(xml, userTaskId, taskDetail, formData)
    additionalButton.value = buttons
}
async function handleSubmit() {
    try{
        loading.value = true
        const data = await vFormRef.value.getFormData(false, false);
        if(!data ){
            throw new Error('Form data is empty')
        }
        const form = {
            processKey,
            businessKey: data.businessKey || "",
            properties: Object.entries(data).reduce((newObj, [key, val]) => {
                if (val || val === false || val == '0') newObj[key]= val
                return newObj;
            },{}),
        }
        
        await clientApi.api.postWorkflowProcessStart(form).then(res => res.data)

            ElMessage.success('Workflow created')
            cancel()
    }catch(error){
        console.log(error)
    }finally{
        loading.value = false
    }
}
function cancel(){
    const fallbackPageItem = {
        id: "client-workflow",
        name: 'client-workflow',
        icon: 'dp-icon:flow-outline',
        hoverIcon: 'dp-icon:flow-outline',
        label: "menus_workflow",
        component: "LazyWorkflowPage",
        props: {
            workflowType: 'myTask',
        }
    }
    routerProvider?.back(fallbackPageItem)
}

onMounted(() => {
    init()
})
</script>



<template>
    <div class="pageContainer">
        <WorkflowDetailFormRender ref="vFormRef" >
            <template #action>
                <div class="workflow-actions" >
                    <template v-for="(item,index) in additionalButton" :key="index">
                        <component :is="item.component" v-bind="item.props"/>
                    </template>
                    <el-button @click="cancel">{{ $t("cancelText") }}</el-button>
                    <el-button type="primary" @click="handleSubmit">{{
                    $t("common_submit")
                    }}</el-button>
                </div>
            </template>
        </WorkflowDetailFormRender>
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    width: 100%;
    height: 100%;
    padding: var(--app-space-s);
    position: relative;
}
.workflow-actions{
    box-shadow: var(--el-box-shadow-light);
    padding: var(--app-space-s);
    text-align: right;
}
</style>