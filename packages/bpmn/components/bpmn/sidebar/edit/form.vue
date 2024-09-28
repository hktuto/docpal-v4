<script lang="ts" setup>
import type { Node } from '@antv/x6'
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

const formItems = ref<any[]>([])
const editDialogOpened = ref(false)

function formChange() {
    console.log("formChange", formItems.value)
    node.setData({
        ...node.data,
        data:{
            ...node.data.data,
            extensionElements:{
                ...node.data.data.extensionElements,
                'flowable:formProperty': formItems.value
            }
        }
    },{
        overwrite: true,
    })
}

function removeFormItem(index:number) {
    graphProvider?.graph.value?.startBatch('update-from-data')
    node.setData({
        ...node.data,
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
                'flowable:formProperty': [...formItems.value]
            }
        }
    }
    node.setData(newData, { overwrite: true, deep: true, silent:false })
    graphProvider?.graph.value?.stopBatch('update-from-data')

}
function editItem(index:number) {
}
function refreshData() {
    if(!node.data || !node.data.data || !node.data.data.extensionElements) throw new Error('node data not found');
    
    formItems.value = node.data.data.extensionElements['flowable:formProperty'] || []
    // if(node.data.data.extensionElements['flowable:formProperty']) 
    console.log("refreshData", formItems.value)
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
            tag="ul" 
            tem-key="attr_id"
            @change="formChange"
            >
            <template #item="{ element, index }">
                <li class="formFieldItem">
                    <div scope="row" class="mover">
                        <Icon name="uil:elipsis-double-v-alt" />
                    </div>
                    <div class="label">
                        {{  element.attr_name }}
                    </div>
                    <div v-if="!element.attr_fixed" class="actions">
                        <Icon name="lucide:square-pen" @click="editItem(index)" />
                    </div>
                    <div v-if="!element.attr_fixed" class="actions">
                        <Icon name="lucide:delete" @click="removeFormItem(index)" />
                    </div>
                </li>

        </template>
        </draggable>
    </div>
    <ElDialog v-model="formFieldEditorOpened"  append-to-body  destroy-on-close>

    </ElDialog>
</template>

<style lang="scss" scoped>
.formItemListContainer{
  padding: 0;
  margin: var(--app-space-s) 0;
}
.formFieldItem{
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-block: var(--app-space-s);
  gap: calc(var(--app-space-s) / 2 );
  font-size: var(--app-font-size-s);
  .label{
    cursor: pointer;
    flex: 1 0 auto;
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
</style>