<script lang="ts" setup>
import type { Node } from '@antv/x6'

import draggable from "vuedraggable";

const { node } = defineProps<{
    node:Node
}>()

const emits = defineEmits(['openForm'])

// #region setup
const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER);

if(!graphProvider || !editorProvider) {
    throw createError('provider not found')
    
}

function setUpListener(){
    graphProvider?.graph.value?.on('history:undo', () => {
      refreshData()
    })
    graphProvider?.graph.value?.on('history:redo', () => {
      refreshData()
    })
}

onMounted(() => {
    setUpListener()
})
// #endregion
const drag = ref(false)
const formItems = ref<any[]>([])
const fieldEditorRef = ref()
const openedItems = ref<string[]>([])

function formUpdate(value:any[]) {
    formItems.value = value
    formChange()
}

function formChange() {
    console.log('form change', formItems.value)
    graphProvider?.graph.value?.startBatch('update-from-data')
    const newData = {
        ...node.data,
        version: (node.data.version || 0) + 1,
        data:{
            ...JSON.parse(JSON.stringify(node.data.data)),
            extensionElements:{
                ...node.data.data.extensionElements,
                'flowable:formProperty': JSON.parse(JSON.stringify(formItems.value))
            }
        }
    }
    node.setData(newData, { overwrite: true, deep: true, silent:false })
    graphProvider?.graph.value?.stopBatch('update-from-data')
}

function removeFormItem(index:number) {
    graphProvider?.graph.value?.startBatch('update-from-data')
    node.setData({
        ...JSON.parse(JSON.stringify(node.data)),
        version: (node.data.version || 0) + 1,
    }, { overwrite: true, deep: true, silent:false })
    formItems.value.splice(index, 1)

    const newData = {
        ...node.data,
        version: (node.data.version || 0) + 1,
        data:{
            ...node.data.data,
            extensionElements:{
                ...node.data.data.extensionElements,
                'flowable:formProperty': JSON.parse(JSON.stringify(formItems.value))
            }
        }
    }
    node.setData(newData, { overwrite: true, deep: true, silent:false })
    graphProvider?.graph.value?.stopBatch('update-from-data')
}
function editItem(id:string) {
    if(editorProvider?.readonly.value) return;
    // if openedItems include id, remove it
    if(openedItems.value.includes(id)) {
        openedItems.value = openedItems.value.filter(item => item !== id)
    } else {
        openedItems.value.push(id)
    }
}
function refreshData() {
    if(!node.data || !node.data.data || !node.data.data.extensionElements){
        node.setData({
            ...node.data,
            data:{
                ...node.data.data,
                extensionElements:{
                    ...node.data.data.extensionElements,
                    'flowable:formProperty': []
                }
            }
        }, {overwrite:true, silent:true})
    }
    
    formItems.value =JSON.parse(JSON.stringify( node.data.data.extensionElements['flowable:formProperty'] || []))
    // if(node.data.data.extensionElements['flowable:formProperty']) 
    // node.setData(node.data, {overwrite:true, silent:false})
}

function editField(){
    fieldEditorRef.value.open()
}

async function copyFormAndFieldSetting(){
    const fields = JSON.parse(JSON.stringify(formItems.value))
    const form = await editorProvider?.getFormByNode(node)
    editorProvider?.copyForm(node, {
        fields,
        form
    });
}


async function pasteForm(){
    await editorProvider?.pasteForm(node);
    refreshData();
}


watch(() => node, ()=> {
  if(node) {
    refreshData()
  }
},{
  immediate: true,
  deep: true
})



</script>

<template>
    <div class="formComponentContainer">
        <div class="listContainer">
            <div v-for="(item, index) in formItems" :key="item.attr_id" class="formFieldItem">
                <div class="header">
                        <div class="label" @click="editItem(item.attr_id)">
                            {{  item.attr_name }}
                        </div>
                        <div v-if="!item.attr_fixed && !editorProvider.readonly.value" class="actions">
                            <Icon name="lucide:square-pen" @click="editItem(item.attr_id)" />
                        </div>
                        <div v-if="!item.attr_fixed && !editorProvider.readonly.value" class="actions">
                            <Icon name="lucide:delete" @click="removeFormItem(index)" />
                        </div>
                    </div>
                    <div class="body" v-show="openedItems.includes(item.attr_id)">
                        <ElForm label-position="top" label-width="100px" size="small">
                            <ElRow :gutter="12">
                            <ElCol :span="12">
                                <ElFormItem label="id">
                                    <ElInput v-model="item.attr_id" disabled />
                                </ElFormItem>
                            </ElCol>
                            <ElCol :span="12">
                                <ElFormItem label="Name">
                                    <ElInput v-model="item.attr_name" @change="formChange" :disabled="editorProvider.readonly.value"/>
                                </ElFormItem>
                            </ElCol>
                            <!-- <ElCol :span="12">
                                <ElFormItem label="Form label">
                                    <ElInput v-model="item.attr_field_label" @change="formChange"/>
                                </ElFormItem>
                            </ElCol> -->
                            <ElCol :span="12">                            
                                <ElFormItem label="Type">
                                    <ElSelect v-model="item.attr_type" :disabled="editorProvider.readonly.value" @change="formChange">
                                        <ElOption label="String" value="string"></ElOption>
                                        <ElOption label="Number" value="number"></ElOption>
                                        <ElOption label="Boolean" value="boolean"></ElOption>
                                    </ElSelect>
                                </ElFormItem>
                            </ElCol>
                            <ElCol :span="12">
                                <ElFormItem label="Required">
                                    <ElSwitch v-model="item.attr_required" :disabled="editorProvider.readonly.value" @change="formChange"/>
                                </ElFormItem>
                            </ElCol>
                            <!-- <ElCol :span="12">
                                <ElFormItem label="Fixed">
                                    <ElSwitch v-model="item.attr_fixed" @change="formChange"/>
                                </ElFormItem>
                            </ElCol> -->
                        </ElRow>
                        </ElForm>
                    </div>
            </div>
        </div>
        <div class="actionsContainer">

            <ElButton type="primary" @click="editField" :disabled="editorProvider.readonly.value" >Edit Field</ElButton>
            <ElButton type="primary" @click="editorProvider.openForm(node)" :disabled="editorProvider.readonly.value" >Edit Form</ElButton>
            <ElButton type="primary" @click="editorProvider.previewForm(node)" >Preview Form</ElButton>
        </div>
        <Eldivider />
        <div class="actionsContainer">
            <ElButton type="link" size="small" @click="copyFormAndFieldSetting" :disabled="editorProvider.readonly.value">Copy Form and Field setting</ElButton>

            <ElButton v-if="editorProvider.copyKey.value && editorProvider.copyKey.value !== node.data.id" type="link" size="small" :disabled="editorProvider.readonly.value" @click="pasteForm">Paste Form</ElButton>
        </div>
        <BpmnFieldEditor ref="fieldEditorRef" :fields="formItems" @change="formUpdate"/>
    </div>

</template>

<style lang="scss" scoped>
.formItemListContainer{
  padding: 0;
  margin: var(--app-space-s) 0;
}
.formFieldItem{
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding-block: var(--app-space-s);
  gap: calc(var(--app-space-s) / 2 );
  font-size: var(--app-font-size-s);
  transition: all 0.2s ease-in-out;
  &.opened{
    background: var(--app-grey-975);
  }
  .header{
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    .label{
        cursor: pointer;
        flex: 1 0 auto;
    }
  }
  .body{
    width: 100%;
    padding: var(--app-space-xs);
    border-top: 1px solid var(--app-grey-950);
  }
}
.formFieldItem + .formFieldItem {
  border-top: 1px solid var(--app-grey-950);
}
.actions{
    cursor: pointer;
}
.mover{
    cursor: move;
}
.actionsContainer{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    margin-block: var(--app-font-size-xs);
    gap: var(--app-space-xs);
    :deep(.el-button + .el-button){
        margin-left: 0;
    }
}
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

</style>