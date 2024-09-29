<script lang="ts" setup>
import type { Node } from '@antv/x6'
import { ElCol, ElForm } from 'element-plus';
import { version } from 'vue';
import draggable from "vuedraggable";

const { node } = defineProps<{
    node:Node
}>()

// #region setup
const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')
    
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

const openedItems = ref<string[]>([])

function formChange() {
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
    // if openedItems include id, remove it
    if(openedItems.value.includes(id)) {
        openedItems.value = openedItems.value.filter(item => item !== id)
    } else {
        openedItems.value.push(id)
    }
}
function refreshData() {
    if(!node.data || !node.data.data || !node.data.data.extensionElements) throw new Error('node data not found');
    
    formItems.value =JSON.parse(JSON.stringify( node.data.data.extensionElements['flowable:formProperty'] || []))
    // if(node.data.data.extensionElements['flowable:formProperty']) 
    // node.setData(node.data, {overwrite:true, silent:false})
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
        <draggable 
            v-model="formItems" 
            class="formItemListContainer" 
            handle=".mover" 
            tag="transition-group"
            :component-data="{
                tag: 'ul', name: 'transition-group', type: 'transition'
            }"
            :animation="200"
            group="description"
            :disabled="false"
            ghostClass="ghost"
            tem-key="attr_id"
            @change="formChange"
            @start="drag = true"
            @end="drag = false"
            >
            <template #item="{ element, index }">
                <li :class="{formFieldItem : true, opened: openedItems.includes(element.attr_id)}">
                    <div class="header">
                        <div scope="row" class="mover">
                            <Icon name="uil:elipsis-double-v-alt" />
                        </div>
                        <div class="label" @click="editItem(formItems[index].attr_id)">
                            {{  formItems[index].attr_name }}
                        </div>
                        <div v-if="!formItems[index].attr_fixed" class="actions">
                            <Icon name="lucide:square-pen" @click="editItem(formItems[index].attr_id)" />
                        </div>
                        <div v-if="!formItems[index].attr_fixed" class="actions">
                            <Icon name="lucide:delete" @click="removeFormItem(index)" />
                        </div>
                    </div>
                    <div class="body" v-show="openedItems.includes(formItems[index].attr_id)">
                        
                        <ElForm label-position="top" label-width="100px" size="small">
                            <ElRow :gutter="12">
                            <ElCol :span="12">
                                <ElFormItem label="Name">
                                    <ElInput v-model="formItems[index].attr_name" @change="formChange"/>
                                </ElFormItem>
                            </ElCol>
                            <ElCol :span="12">
                                <ElFormItem label="Form label">
                                    <ElInput v-model="formItems[index].attr_field_label" @change="formChange"/>
                                </ElFormItem>
                            </ElCol>
                            <ElCol :span="12">                            
                                <ElFormItem label="Type">
                                    <ElSelect v-model="formItems[index].attr_type" @change="formChange">
                                        <ElOption label="String" value="string"></ElOption>
                                        <ElOption label="Number" value="number"></ElOption>
                                        <ElOption label="Boolean" value="boolean"></ElOption>
                                    </ElSelect>
                                </ElFormItem>
                            </ElCol>
                            <ElCol :span="12">

                                <ElFormItem label="Required">
                                    <ElSwitch v-model="formItems[index].attr_required" @change="formChange"/>
                                </ElFormItem>
                            </ElCol>
                            <ElCol :span="12">

                                <ElFormItem label="Fixed">
                                    <ElSwitch v-model="formItems[index].attr_fixed" @change="formChange"/>
                                </ElFormItem>
                            </ElCol>
                        </ElRow>
                        </ElForm>
                    </div>
                </li>

        </template>
        </draggable>
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