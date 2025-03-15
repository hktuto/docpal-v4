<script lang="ts" setup>
import { set } from '@vueuse/core';
import {formTypeOptions} from '../../../utils/bpmnType';
const opened = ref(false);

const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')
}

const allFieldOptions = computed(() => {
    if(!graphProvider.allFormField.value) return []
    return Object.keys(graphProvider.allFormField.value).map((key) => graphProvider.allFormField.value[key]) 
})

const idFieldEl = ref();
const emits = defineEmits(['created'])
function open(defaultValue?:string){
    if(defaultValue) {
        newFieldForm.value.attr_id = defaultValue
        newFieldForm.value.attr_name = defaultValue
    }
    opened.value = true
    setTimeout(() => {
        if(idFieldEl.value) {
            idFieldEl.value?.focus()
        }
    }, 100)
}

const newFieldFormEl = ref()
const newFieldForm = ref({
  attr_id: '',
  attr_name: '',
  attr_type: 'string',
})

const newFieldRules= reactive({
  attr_id: [{
    required: true,
    validator: idChanged,
    trigger: 'blur'
  }],
  attr_name: [{
    required: true,
    validator: newNameChanged,
    trigger: 'blur'
  }],
})

function idChanged(rule: any, value: any, callback: any) {
    if (!value) {
        return callback(new Error('Please input id'))
    }
    // check if id has space and other special characters
    if(!/^[a-zA-Z0-9_]+$/.test(value)) {
        return callback(new Error('Id can only contain letters, numbers and underscores'))
    }
    const isDuplicatedItem = allFieldOptions.value.find((item:any) => item.attr_id === value)
    if(isDuplicatedItem ) {
        return callback(new Error('Id is duplicated'))
    }
    callback()
}

function newNameChanged(rule: any, value: any, callback: any) {
    if (!value) {
        return callback(new Error('Please input Name'))
    }
    const isDuplicatedItem = allFieldOptions.value.some((item:any) => item.attr_name === value)
    if(isDuplicatedItem ) {
        return callback(new Error('Name is duplicated'))
    }
    callback()
}

async function confirmHandler(){
    // check form valid
    await newFieldFormEl.value.validate((valid:boolean)=>{
        if(valid) { 
            emits('created',{ ...newFieldForm.value})
            opened.value = false;
            newFieldFormEl.value.resetFields()
        }
    })
    
}

defineExpose({
    open
})

</script>

<template>
    <ElDialog v-model="opened" width="75%" append-to-body>
        <ElForm ref="newFieldFormEl" :model="newFieldForm" :rules="newFieldRules" label-position="top" status-icon @submit.stop>
            <ElFormItem  label="Id" prop="attr_id">
                <ElInput ref="idFieldEl" v-model="newFieldForm.attr_id" placeholder="id" />
            </ElFormItem>
            <ElFormItem  label="Name" prop="attr_name">
                <ElInput v-model="newFieldForm.attr_name" placeholder="Name" />
            </ElFormItem>
            <ElFormItem label="Type" prop="attr_type">
                <ElSelect v-model="newFieldForm.attr_type">
                    <ElOption v-for="option in formTypeOptions" :key="option.value" :label="option.label" :value="option.value" />
                </ElSelect>
            </ElFormItem>
            <ElFormItem>
                <ElButton type="primary" @click="confirmHandler">
                    Confirm
                </ElButton>
            </ElFormItem>
        </ElForm>
    </ElDialog>
</template>