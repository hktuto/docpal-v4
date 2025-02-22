<script lang="ts" setup>

const {disabled, formData, options} = defineProps<{
    disabled: boolean,
    formData: any
    options?: Object,
}>();

function getFormData(){
    console.log("getFormData")
}

defineExpose({ getFormData })
</script>

<template>
    {{options}}
    {{formData}}
    <CalendarViewer  />
</template>