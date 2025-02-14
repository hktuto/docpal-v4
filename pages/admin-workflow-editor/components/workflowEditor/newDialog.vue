<script lang="ts" setup>
import { adminApi } from 'api';
const emits = defineEmits(['created'])

const routerProvider = inject(MenuRouterKey)    

const workflowTemplateList = [
    { id: 'Blank', name: 'Blank', icon: '/icons/workflow/singleStepIcon.svg', tip: 'blankStepTip', url: "/bpmn/blank.xml"}
]

const state = reactive({
    visible: false,
    loading:false,
    form: {
        template: 'Blank',
        name:''
    }
})
const formRef = ref()
async function handleSubmit () {
  // TODO : validate form
    if(!state.form.name) return;
    // router.push(`/workflowEditor/new?template=${state.form.template}&name=${state.form.name}`)
    const text = await getXMLFileTemplate(state.form.template);
    let name = state.form.name
    const timestamp = new Date().getTime();
    const nameToId = name.toLowerCase().replaceAll(' ', '_') + '_' + timestamp;
    const bpmnFile = text.replaceAll('workflowId', nameToId).replaceAll('workflowName', state.form.name);
    // convert to blob
    const blob = new Blob([bpmnFile], {type: "text/xml;charset=utf-8"});
    const form:any = new FormData();
    form.append('name', name)
    form.append('attr_id', nameToId)
    form.append('versionId', 'V1')
    form.append('jsonValue', JSON.stringify({}))
    form.append('file', blob, 'workflow.bpmn.xml')
    form.append('isDraft', true)
    const {data} =await adminApi.api.postWorkflowProcessDefinitionUpload({requestDTO:{}},form)
    console.log('data', data)
    // const newItem: any = {
    //     menuKey: routerProvider?.menuSymbol,
    //     id: "workflow-editor-detail-" + new Date().getTime(),
    //     name: "workflow-editor-detail-" + data.id,
    //     icon: 'dp-icon:flow-outline',
    //     label: name,
    //     component: 'LazyWorkflowEditorDetail',
    //     props: {
    //         id: data.id,
    //         currentVersion: data.latestVersion,
    //         productionVersion: data.productionVersion,
    //         name: data.name,
    //         item: data,
    //     }
    // }
    // routerProvider?.navigateTo({...newItem})
    setTimeout(() => {
        emits('created')
        state.visible = false
    }, 300);
    
}


async function getXMLFileTemplate(template:string = 'Single') {
    const item: any = workflowTemplateList.find((item) => item.id === template)
    const templatePath = item.url
    const response = await fetch(templatePath);
    return await response.text() as string;
    
}

function handleOpen(setting:any) {
    state.visible = true
    state.loading = false
}

defineExpose({ handleOpen })
</script>

<template>
<el-dialog v-model="state.visible" :title="$t('workflowEditor.add')"
    :close-on-click-modal="false" distroy-on-close
    >
    <el-form ref="formRef" :model="state.form" label-position="top"
        class="demo-ruleForm" status-icon
    >
        <el-form-item :label="$t('workflowEditor.name')" prop="name">
            <el-input v-model="state.form.name" :placeholder="$t('workflowEditor.name')" />
        </el-form-item>
        <el-form-item :label="$t('workflowEditor.template')" prop="template">
            <el-radio-group v-model="state.form.template">
                <el-radio v-for="item in workflowTemplateList" :key="item.id" :label="item.id">
                    <div class="workflow-template-step">
                        <SvgIcon class="workflow-template-step-icon" :src="item.icon" />
                        <h3 class="workflow-template-step-label">{{item.name}}</h3>
                        <tip class="workflow-template-step-tip">{{$t(item.tip)}}</tip>
                    </div>
                </el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <template #footer>
        <el-button :loading="state.loading" @click="handleSubmit">{{$t('common_submit')}}</el-button>
    </template>
</el-dialog>
</template>