<script lang="ts" setup>
import type { Node } from '@antv/x6'
import { adminApi } from 'api';
const { node } = defineProps<{
    node:Node
}>()

const graphProvider = inject(BPMN_PROVIDER);
if(!graphProvider) {
    throw createError('graph provider not found')   
}
const allFieldsArray = computed(() => {
  return Object.keys(graphProvider.allFormField.value).map((key:string) => {
    return graphProvider.allFormField.value[key]
  })
})
const allFields = computed(() => {
    return graphProvider.allFormField.value
})
const { getMetaSetting } = useDocumentType()

const form = ref<any[]>([])
async function loopChildren(all:any[], item: any, level = 0, title = ''){
    const meta = await getMetaSetting(item.documentType) as any;
    title = (title ? title + '/' : '') + item.label
    if(!item.children) {
        all.push({
            ...item,
            level,
            displayMeta : meta && meta.displayMataTags ? meta.displayMataTags : [],
            title
        })
        all[all.length -1].displayMeta.unshift("fc:docTitle")
    }

    if(item.children){
        level ++ ;
        for (const child of item.children) {
            all = await loopChildren(all, child, level, title)
        }
    }
    return all
}

const folderCabinetRootId = ref()
const flatCabinetList = ref<any[]>([])

async function getForm(){
    const nodeData = node.getData()
  if(!nodeData.data.extensionElements || !nodeData.data.extensionElements['flowable:folderCabinetMapping'].field){
    form.value = []
  }else{
    if( typeof nodeData.dataextensionElements['flowable:folderCabinetMapping'].field === 'string' ||
        !Array.isArray(nodeData.data.extensionElements['flowable:folderCabinetMapping'].field) ){
      form.value = [nodeData.data.extensionElements['flowable:folderCabinetMapping'].field]
    }else{
      form.value = nodeData.data.extensionElements['flowable:folderCabinetMapping'].field
    }
  }
  const bpmnJson = graphProvider?.bpmnJson.value
  if(bpmnJson && bpmnJson.definitions && bpmnJson.definitions.process && bpmnJson.definitions.process.extensionElements['flowable:folderCabinetMapping']){
    folderCabinetRootId.value = bpmnJson.definitions.process.extensionElements['flowable:folderCabinetMapping'][0].attr_id
    
    const {data} = await adminApi.api.getCabinetTemplateId(folderCabinetRootId.value)
    flatCabinetList.value = await loopChildren([], data, 0,'')
    console.log("folderCabinetRootId", folderCabinetRootId)
  }
}

async function setForm(){
    const nodeData = node.getData()
    if(!nodeData.data.extensionElements){
        node.setData({
            ...nodeData,
            version: (nodeData.version || 0) + 1,
            data:{
                ...nodeData.data,
                extensionElements:{
                    'flowable:folderCabinetMapping': {
                        field: form.value
                    }
                }
            }
        },{
            overwrite:true,
            deep:true
        })
    }else{
      node.setData({
            ...nodeData,
            version: (nodeData.version || 0) + 1,
            data:{
                ...nodeData.data,
                extensionElements:{
                    'flowable:folderCabinetMapping': {
                        field: form.value
                    }
                }
            }
        },{
            overwrite:true,
            deep:true
        })
    }
}


// #region dropdown and dialog logic
const editDialogShow = ref(false)
const editItem = ref();
const newDialogShow = ref(false)
const editItemIndex = ref(-1)
function deleteItem(index:number){
  form.value.splice(index, 1)
}

function addNewDocument(){
  newDialogShow.value = true
}
function addDocumentHandler(newItem:any){
  form.value.push(newItem)
  newDialogShow.value = false
    setForm()
}

function editDocumentHandler(newItem:any){
  form.value[editItemIndex.value] = newItem
  editDialogShow.value = false
    setForm()
}
function handleCommand(command:{type:string,item:any,index:number}){
  switch(command.type){
    case 'edit':
      editDialogShow.value = true
      editItem.value = command.item
      editItemIndex.value = command.index
      break
    case 'delete':
      deleteItem(command.index)
      break
  }
}
function displayFormProperty(id:any){
    return allFields.value[id] ? allFields.value[id].attr_field_label : id
  // const item = allFields.value.find((item:any) => item.attr_id === id)
  // return item ? item.attr_name : ''
}

function displayCabinetItem(id:any){
  const item = flatCabinetList.value.find((item:any) => item.id === id)
  return item ? item.title : ''
}
// #end region

function setUpListener(){
    graphProvider?.graph.value?.on('history:undo', () => {
        refreshData()
    })
    graphProvider?.graph.value?.on('history:redo', () => {
        refreshData()
    })
}


function refreshData(){
  getForm()
}

onMounted(async() => {
    setUpListener()
    refreshData()
  
})

</script>

<template>
<div class="fromContainer">
    <BpmnSidebarFormLabel :node="node" />
    <div class="formContainer">
        <div v-if="folderCabinetRootId" class="bpmnSidebarItemContainer">
          <div class="filingItemContainer">
            <ElTable :data="form">
              <ElTableColumn prop="attr_formProperty" label="Form File Field" >
                <template #default="scope">
                  {{displayFormProperty(scope.row.attr_formProperty)}}
                </template>
              </ElTableColumn>
              <ElTableColumn prop="attr_metadata" label="Folder Cabinet Item" >
                <template #default="scope">
                  {{displayCabinetItem(scope.row.attr_metadata)}}
                </template>
              </ElTableColumn>
              <ElTableColumn width="40">
                <template #default="scope">
                  <ElDropdown @command="handleCommand">
                    <ElButton type="primary" link>
                      <ElIcon><SvgIcon src="/icons/dots.svg"/></ElIcon>
                    </ElButton>
                    <template #dropdown>
                      <ElDropdownItem :command="{type:'edit', item:scope.row, index:scope.$index}">
                        Edit
                      </ElDropdownItem>
                      <ElDropdownItem :command="{type:'delete', item:scope.row, index:scope.$index}">
                        Delete
                      </ElDropdownItem>
                    </template>
                  </ElDropdown>
                </template>
              </ElTableColumn>
            </ElTable>
            <ElButton type="text" @click="addNewDocument">Add</ElButton>
          </div>
        </div>
        <div v-else>
            please select folder cabinet first
        </div>
    </div>
    <ElDialog v-model="editDialogShow" destroy-on-close append-to-body>
          <BpmnContextFilingEditDialog :editItem="editItem"  :all-fields="allFieldsArray" :all-cabinet-file="flatCabinetList" @submit="editDocumentHandler"/>
        
      </ElDialog>
      <ElDialog v-model="newDialogShow" destroy-on-close append-to-body>
            <BpmnContextFilingNewDialog :all-fields="allFieldsArray" :all-cabinet-file="flatCabinetList" @submit="addDocumentHandler"/>
      </ElDialog>
</div>
</template>

<style scoped lang="scss">
.formContainer{
    padding-inline : var(--app-space-s);
}
</style>