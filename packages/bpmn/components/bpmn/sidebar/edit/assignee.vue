<script lang="ts" setup>
import type { Node } from '@antv/x6'
const { node } = defineProps<{
    node:Node
}>()

const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER);
if(!graphProvider || !editorProvider) {
    throw createError('provider not found') 
}

const autoAssignField = ref<string>("")
function refreshData(){
    const data = node.getData();
    if(data.data.extensionElements['flowable:taskListener']?.['flowable:field']?.['flowable:expression']?.['__cdata']){
        const f = data.data.extensionElements['flowable:taskListener']['flowable:field']['flowable:expression']['__cdata']
        autoAssignField.value = f.substring(16, f.length - 2);
    }else{
        autoAssignField.value = ''
    }
}

function assigneeChanged(newVal: string) {
    const data = node.getData();

    if(newVal) {
        data.data.extensionElements['flowable:taskListener'] = {
            "attr_delegateExpression": "${autoAssignTaskListener}",
            "attr_event": "create",
            "flowable:field": {
                "attr_name" : "assignee",
                "flowable:expression" : {
                    "__cdata" : '${variables:get(' + newVal + ')}'
                }
            }
        }
    }else{
        delete data.data.extensionElements['flowable:taskListener']
    }


    node.setData({
        ...data,
        version: node.data.version+1 || 0,
    }, {
        overwrite: true,
        deep: true,
    })
}

const allFields = computed(() => {
    if(!graphProvider?.allFormField.value) return []

    const fields = Object.fromEntries(
      Object.entries(graphProvider.allFormField.value).filter(([key, value]) => value.attr_type === 'string')
    )

    fields.user_creator_id  = {
      attr_id: "user_creator_id",
      attr_name:"Creator",
    }
    return fields
})

function setUpListener(){
    graphProvider?.graph.value?.on('history:undo', () => {
      refreshData()
    })
    graphProvider?.graph.value?.on('history:redo', () => {
      refreshData()
    })
}

onMounted(async() => {
    refreshData()
    setUpListener()
})


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
    <ElForm label-position="top" label-width="100px" size="small">
        <ElFormItem label="Auto Assignee" >
            <ElSelect v-model="autoAssignField" placeholder="Select Field" filterable clearable :disabled="editorProvider.readonly.value"  @change="assigneeChanged">
                <ElOption v-for="option in allFields" :key="option.attr_id" :label="option.attr_name" :value="option.attr_id" />
            </ElSelect>
            <!-- TODO : if flowable:taskListener-->
        </ElFormItem>
    </ElForm>

</template>
