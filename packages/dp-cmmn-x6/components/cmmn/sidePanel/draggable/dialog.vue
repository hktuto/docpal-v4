<template>
<el-dialog v-model="state.visible" :title="$t('Add / Edit Properties')"
    :close-on-click-modal="false" destroy-on-close
    >
    <FromRenderer ref="FromRendererRef" :form-json="formJsonUrl" />
    <template #footer>
        <el-button :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
    </template>
</el-dialog>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
const props = defineProps<{
    formJsonUrl: any,
    node: any,
    graph: any,
    filterList: any
}>()
const emits = defineEmits([
    'refresh', 'edit', 'create'
])
const { caseId } = useCmmnGraph();
const state = reactive({
    visible: false,
    isEdit: false,
    workflowProperties: []
})
const FromRendererRef = ref()
// const formJson = getJsonApi('admin/adminAclForm.json')
async function handleSubmit () {
    const data = await FromRendererRef.value.vFormRenderRef.getFormData()
    if(state.isEdit) emits('edit', {...data})
    else emits('create', {...data})
    state.visible = false
}
function handleOpen(row: any) {
    state.isEdit = !!row ? true : false
    state.visible = true
    setTimeout(async() => {
        // FromRendererRef.value.vFormRenderRef.setFormJson(formJson)
        FromRendererRef.value.vFormRenderRef.resetForm()
        if(state.isEdit && !!row) await FromRendererRef.value.vFormRenderRef.setFormData({...row})
        setFormOptions(row)
    })
}
async function setFormOptions(row: any) {
    let workflowProperties: any = []
    let filterList
    switch (props.formJsonUrl) {
        case 'cmmn/field.json':
            setFileterList(row)
            break
        case 'cmmn/humanTaskFields.json':
            filterList = setFileterList(row)
            loadCaseInfomationOptions('name', filterList)
            break
        case 'cmmn/flowableIn.json':
            const inWorkflowTarget = FromRendererRef.value.vFormRenderRef.getWidgetRef('target')
            workflowProperties = await getWorkflowProperties()
            inWorkflowTarget.loadOptions(workflowProperties)
            filterList = getFilterList(row, 'source')
            loadCaseInfomationOptions('source', filterList, 'source')
            break;
        case 'cmmn/flowableOut.json':
            const outWorkflowSource = FromRendererRef.value.vFormRenderRef.getWidgetRef('source')
            workflowProperties = await getWorkflowProperties()
            outWorkflowSource.loadOptions(workflowProperties)
            filterList = getFilterList(row, 'target')
            loadCaseInfomationOptions('target', filterList, 'target')
            break;
        case 'cmmn/sentry.json':
            // filterList = getFilterList(row, 'target')
            loadCaseInfomationOptions('properties')
            break;
        default:
            break;
    }
}
function getFilterList(row: any = {}, uniqueName: string = 'name') {
    let list 
    try {
        if(!!row) list = props.filterList.filter(item => item[uniqueName] !== row[uniqueName])
        else list = [...props.filterList]
        console.log(list);
        
    } catch (error) {
        list = []
    }
    return list
}
function setFileterList(row: any, uniqueName: string = 'filterList') {
    const filterList = getFilterList(row)
    const filterListRef = FromRendererRef.value.vFormRenderRef.getWidgetRef(uniqueName)
    filterListRef.loadOptions(filterList)
    return filterList
}
async function loadCaseInfomationOptions(uniqueName: string, filterList: any = null, prop: string = 'id') {
    const widgetRef = FromRendererRef.value.vFormRenderRef.getWidgetRef(uniqueName)
    let caseProperties = await getCaseInformation(props.graph)
    if(!!filterList) {
        caseProperties = caseProperties.filter(item => !filterList.find(f => f[prop] === item.value))
    }
    widgetRef.loadOptions(caseProperties)
}
async function getWorkflowProperties() {
    try {
        const workflow = props.node.data.data.processRefExpression.__cdata
        
        const options = await adminApi.api.postWorkflowProperties({processKey:workflow})
        return options.map(item => ({
                label: item.name,
                value: item.id
            }))
    } catch (error) {
        dpLog('no workflow')
        return []
    }
}
function getCaseInformation(graph) {
    try {
        const caseNode = graph.getCellById(caseId.value)
        const casePlanModel = caseNode.data.data.casePlanModel ? caseNode.data.data.casePlanModel : caseNode.data.data.data.casePlanModel
        const field = casePlanModel.extensionElements['docpal:form'][0].field
        return field.map(item => ({
            ...item,
            label: item.attr_name,
            value: item.attr_id
        }))
    } catch (error) {
        return []
    }
}
onMounted(async() => {
})
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
    