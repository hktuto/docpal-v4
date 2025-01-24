<script setup lang="ts">
import { adminApi } from 'api';
import {ElNotification} from "element-plus";
const dialogVisible = ref(false)

const emits = defineEmits(['close', 'success'])
const newForm = ref({
    name: '',
    header:"",
    body:"",
    bodyParameters:[],
    footer:"",
    textMessage:"",
    confirmButtonName:"",
    language: "en_US"
})

function open() {
    reset()
    dialogVisible.value = true
}
function reset(){
    newForm.value = {
        name: '',
        header:"",
        body:"",
        bodyParameters:[],
        footer:"",
        textMessage:"",
        confirmButtonName:"",
        language: "en_US"
    }
}
async function submit(){
    if(newForm.value.name.trim() === '') return
    const res = await adminApi.api.postMessageTemplateCreate(newForm.value)
    ElNotification.success('Success')
    emits('success', res.data)
    dialogVisible.value = false
}

defineExpose({
    open
})
</script>

<template>
    <ElDialog v-model="dialogVisible" append-to-body >
        <ElForm :model="newForm" label-position="top">
            <ElFormItem label="Name">
                <ElInput v-model="newForm.name" placeholder="Name" />
            </ElFormItem>
        </ElForm>
        <template #footer>
            <ElButton @click="reset">Reset</ElButton>
            <ElButton type="primary" @click="submit">Submit</ElButton>
        </template>
    </ElDialog>
</template>

<style scoped lang="scss">

</style>