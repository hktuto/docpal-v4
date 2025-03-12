<script lang="ts" setup>
import formJson from './filePath.vform.json';
const props = defineProps<{
    defaultPath?: any
}>()
const formEl = ref()

const state = reactive({
    path: '',
})

function getData(){
    return formEl.value.vFormRenderRef.getFormData()
}

onMounted(() => {
    if(props.defaultPath) state.path = props.defaultPath
    nextTick(() => {
        formEl.value.vFormRenderRef.setFormData(state)
    })
})

defineExpose({ getData })
</script>

<template>
    <FormRenderer ref="formEl" :form-json="formJson">
    </FormRenderer>
</template>