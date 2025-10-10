<script lang="ts" setup>
import type { Node } from '@antv/x6'

const { node}  = defineProps<{
  node: Node
}>();

const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')  
}

const buttonStyle = [
    'primary',
    'success',
    'warning',
    'danger',
    'info',
    'text',
]

const form = ref<any>([]);
function getForm(){
    const nodeData = node.getData()
    if(nodeData.data && nodeData.data.extensionElements && nodeData.data.extensionElements['docpal:booleanButton']){
        if(!Array.isArray(nodeData.data.extensionElements['docpal:booleanButton'])){
            form.value = [nodeData.data.extensionElements['docpal:booleanButton']]
        }else{
            form.value = nodeData.data.extensionElements['docpal:booleanButton'];
        }
    }else{
        form.value = []
    }
}

const allBooleanInfo = computed(() => {
    if(!graphProvider?.allFormField.value) return []
    return Object.values(graphProvider?.allFormField.value).reduce( (result:any, current:any) => {
        if(current.attr_type === 'boolean') {
            result.push(current)
        }
        return result
    },[])
})

function setForm(){
    const nodeData = node.getData()
    const newData = {
        ...nodeData,
        version: nodeData.version + 1 || 1,
        data:{
            ...nodeData.data,
            extensionElements:{
                ...nodeData.data.extensionElements,
                'docpal:booleanButton': JSON.parse(JSON.stringify(form.value))
            }
        }
    }
    node.setData(newData, {
        deep: true,
        overwrite: true
    })
}

type Form = {
    attr_booleanValue: string
    attr_buttonStyle: string
    attr_buttonText: string
    attr_applyState: boolean
}
const defaultForm:Form = {
    attr_booleanValue: '',
    attr_buttonStyle: "primary",
    attr_buttonText: 'Submit',
    attr_applyState: true
}

function addButton(){
    form.value.push({
        ...defaultForm
    })
}

useAdditionalContext(getForm)

watch(form, () => {
    setForm()
}, {
    deep:true
})

</script>

<template>
    <div class="formContainer">
        <h4>Boolean Button</h4>
        <template v-if="allBooleanInfo.length === 0">
            No Boolean Field to set
        </template>
        <div v-else class="listContainer">
                <template v-for="(item, index) in form">
                    <ElForm :model="item" label-position="top" class="listItem">
                        <ElFormItem label="Which field to set when clicked">
                            <ElSelect v-model="item.attr_booleanValue" placeholder="Document Step" filterable >
                                <ElOption v-for="item in allBooleanInfo" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
                            </ElSelect>
                        </ElFormItem>
                        <ElFormItem label="What State to apply">
                            <ElSwitch v-model="item.attr_applyState" active-text="true" inactive-text="false" />
                        </ElFormItem>
                        <ElFormItem label="Button Style">
                            <ElSelect v-model="item.attr_buttonStyle" placeholder="Button Style" filterable >
                                <ElOption v-for="item in buttonStyle" :key="item" :label="item" :value="item" />
                            </ElSelect>
                        </ElFormItem>
                        <ElFormItem label="Preview Button Text">
                            <ElInput v-model="item.attr_buttonText" placeholder="Preview Button Text" />
                        </ElFormItem>
                        <ElFormItem>
                            <ElButton text @click="form.splice(index, 1)">Remove</ElButton>
                        </ElFormItem>
                    </ElForm>
                </template>
                <div class="actions">
                <ElButton text @click="addButton">Add</ElButton>
            </div>
        </div>
    </div>


</template>


<style lang="scss" scoped>
.listContainer{
    display: flex;
    flex-direction: column;
    gap: 10px;
    .listItem{
        width: 100%;
        padding: var(--app-space-s);
        border: 1px solid var(--app-grey-800);
        border-radius: var(--app-border-radius-m);
    }
    .actions{
        border-top: 1px solid var(--app-grey-800);
        padding-block: var(--app-space-s);
        display: flex;
        justify-content: center;
        gap: 10px;
    }
}
</style>
