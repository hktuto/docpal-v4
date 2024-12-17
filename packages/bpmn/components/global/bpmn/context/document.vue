<script lang="ts" setup>
import { adminApi } from 'api'
import formJson from './pathSelector.vform.json'
import type { Node } from '@antv/x6'
const { t } = useI18n()
const { node } = defineProps<{
    node:Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider){
    throw new Error('Missing provider')
}
const { t } = useI18n()
const FromRendererRef = ref()
const allDocumentTemplates = ref<{id:string, name: string, value:any}[]>([]);

async function getDocumentTemplates() {
    const data = await adminApi.documentTemplateController.getAll()
    if(!data || !data.data){
        return
    }
  allDocumentTemplates.value = data.data.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      value: item
    }
  });
}

const templateVariables = computed(() => {
    const nodeData = node.getData()
  return nodeData.data.extensionElements['flowable:field'];
})

const allFormFieldArray = computed(() => {
  return Object.keys(graphProvider.allFormField.value).map((key) => {
    return graphProvider.allFormField.value[key]
  })
})

const allFieldOptions = computed(() => {

  return Object.keys(graphProvider.allFormField.value).map((key) => {
    return {
      label: graphProvider.allFormField.value[key].attr_name,
      value: graphProvider.allFormField.value[key].attr_id
    }
  })
})
const formVariable = ref<any[]>([]);
const formData = ref();
async function getFormData(){
    const nodeData = node.getData()
    const parentPathField = nodeData.data.extensionElements['flowable:field'].find((item: any) => item.attr_name === "parentPath");
    const documentTypeField = nodeData.data.extensionElements['flowable:field'].find((item: any) => item.attr_name === "documentType");
    const documentPropertiesField = nodeData.data.extensionElements['flowable:field'].find((item: any) => item.attr_name === "documentProperties");
    const variablesField = nodeData.data.extensionElements['flowable:field'].find((item: any) => item.attr_name === "variables");
    const templateIdField = nodeData.data.extensionElements['flowable:field'].find((item: any) => item.attr_name === "templateId");
    const vari = variablesField['flowable:expression']['__cdata'] ? JSON.parse(variablesField['flowable:expression']['__cdata']) : {};
    // loop throught vari and set value to formVariable and remove ${variables:get()}
    formVariable.value = Object.keys(vari).map((key) => {
        return {
        key,
        value: vari[key].replace('${variables:get(', '').replace(')}', '')
        }
    });
    formData.value = {
        templateId: templateIdField['flowable:expression']['__cdata'],
        parentPath: parentPathField.attr_path ? JSON.parse(parentPathField.attr_path) : [],
        documentType: documentTypeField['flowable:expression']['__cdata'],
        // documentProperties: documentPropertiesField['flowable:expression']['__cdata'] || "",
        variables: variablesField['flowable:expression']['__cdata'] ? JSON.parse(variablesField['flowable:expression']['__cdata']) : {},
    }
    nextTick( () => {
        FromRendererRef.value.vFormRenderRef.setFormData(formData)
    })
}

function setUpListener(){
    graphProvider?.graph.value?.on('history:undo', () => {
        refreshData()
    })
    graphProvider?.graph.value?.on('history:redo', () => {
        refreshData()
    })
}
// #region documentName
const documentName = ref([])
function getDocumentName(){
    const nodeData = node.getData()
    const item = nodeData.data.extensionElements['flowable:field'].find((item: any) => item.attr_name === "documentName");
    if(!item) {
        documentName.value =  []
        return
    }
    documentName.value =  item.attr_path ? JSON.parse(item.attr_path) : [];
}

function setDocumentName(value:string){
    const nodeData = node.getData()
    const index = nodeData.data.extensionElements['flowable:field'].find((item: any) => item.attr_name === "documentName");
    if(index === -1){
        // push documentName to extensionElements
        node.setData({
            ...node.data,
            version: (node.data.version || 0) + 1,
            data:{
                ...node.data.data,
                extensionElements:{
                    ...node.data.data.extensionElements,
                    "flowable:field":[
                        {
                            attr_name: "documentName",
                            attr_type: "string",
                            attr_value: "",
                            attr_required: "false",
                            attr_path: value ? JSON.stringify(value) : "[]",
                            "flowable:expression": {
                            __cdata: value ? value[value.length - 1] : ""
                            }
                        }
                    ]
                }
            }
        })
        return;
    }
    const item = nodeData.data.extensionElements['flowable:field'][index];
    item.attr_path = value ? JSON.stringify(value) : "[]";
    const allLabel = value.map((item:any) => {
      //check item type
      if(item.attr_type === 'date') {
        return "${dateUtil.convert2String(variables:get(" + item.attr_id + "), 'yyyy-MM-dd HH:mm:ss')}"
      }else{
        
        return '${' + item.attr_id + '}'
      }
    }) ;

    item['flowable:expression']['__cdata'] = allLabel.join('-');
    const allFlowableField = nodeData.data.extensionElements['flowable:field'];
    allFlowableField.splice(index, 1, item);
    node.setData({
        ...node.data,
        version: (node.data.version || 0) + 1,
        data:{
            ...node.data.data,
            extensionElements:{
                ...node.data.data.extensionElements,
                "flowable:field": allFlowableField
            }
        }
    });
    getDocumentName()
}

// #endregion

const selectedDocumentTemplate = ref()
function valueChange({fieldName,newValue, oldValue}:any) {
  if(fieldName === 'templateId') {
    selectedDocumentTemplate.value = newValue;
    return
  }
  const nodeData = node.getData()
  const index = nodeData.data.extensionElements['flowable:field'].find((item: any) => item.attr_name === fieldName);
  const item = nodeData.data.extensionElements['flowable:field'][index];
  if(fieldName === 'parentPath') {
    item.attr_path = newValue ? JSON.stringify(newValue) : "[]";
    item['flowable:expression']['__cdata'] = newValue ? newValue[newValue.length -1 ] : "";
  } else {
    item['flowable:expression']['__cdata'] = newValue;
  }
  const allFlowableField = nodeData.data.extensionElements['flowable:field'];
  allFlowableField.splice(index, 1, item);
  node.setData({
      ...node.data,
      version: (node.data.version || 0) + 1,
      data:{
          ...node.data.data,
          extensionElements:{
              ...node.data.data.extensionElements,
              "flowable:field": allFlowableField
          }
      }
  })
}

function emailVariableChange(newVal:string, key:string) {
    const nodeData = node.getData()
    const index = nodeData.data.extensionElements['flowable:field'].find((item: any) => item.attr_name === "variables");
    const variables = nodeData.data.extensionElements['flowable:field'][index];
    const json = JSON.parse(variables['flowable:expression']['__cdata']);
    json[key] = newVal ? '${variables:get(' + newVal + ')}' : "";
    variables['flowable:expression']['__cdata'] = JSON.stringify(json);
    const formIndex = formVariable.value.findIndex((item) => item.key === key);
    formVariable.value[formIndex].value = newVal;
    const allFlowableField = nodeData.data.extensionElements['flowable:field'];
    allFlowableField.splice(index, 1, variables);
    node.setData({
        ...node.data,
        version: (node.data.version || 0) + 1,
        data:{
            ...node.data.data,
            extensionElements:{
                ...node.data.data.extensionElements,
                "flowable:field": allFlowableField
            }
        }
    });
}

function refreshData(){  
  getFormData()
  getDocumentName()
}


onMounted(async() => {
    setUpListener()
    await getDocumentTemplates();
    refreshData()
  
})
</script>

<template>
<div class="fromContainer">
    <BpmnSidebarFormLabel :node="node" />
    <div class="formContainer">
        <FromRenderer ref="FromRendererRef" :form-json="formJson" @formChange="valueChange">
        <template v-slot:tableForm>
          <ElFormItem :label="t('tableHeader_documentName')">
            <DragSelect :dragList="allFormFieldArray" :dropList="documentName" itemKey="attr_field_label" nullTip="No Field in workflow" @change="setDocumentName"/>
          </ElFormItem>
          <h3>{{ t('workflowEditor.documentVariable') }}</h3>
          <ElFormItem v-for="item in formVariable" :key="item.key" :label="t(`workflowEditor.${item.key}`)">
            <ElSelect v-model="item.value" @change="(val:any) => emailVariableChange(val, item.key)">
              <ElOption v-for="option in allFieldOptions" :key="option.value" :label="option.label" :value="option.value"></ElOption>
            </ElSelect>
          </ElFormItem>
        </template>
      </FromRenderer>
    </div>
</div>
</template>