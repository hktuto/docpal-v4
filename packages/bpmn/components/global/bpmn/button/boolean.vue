<script lang="ts" setup>
import { ElButton } from 'element-plus';
import { clientApi } from 'api';

const { attr_buttonStyle = "primary", attr_buttonText = "Submit", attr_booleanValue } = defineProps<{
    xml: string,
    taskDetail: any
    formData:any,
    attr_booleanValue: string,
    attr_buttonStyle: string,
    attr_buttonText: string,
    attr_applyState: boolean,
}>()

const emits = defineEmits(['submit'])

function submit(){
    //
    emits('submit', {
        formKey: attr_booleanValue,
    })
}


</script>


<template>
    <ElButton :type="attr_buttonStyle"  @click="submit">{{  attr_buttonText }}</ElButton>
</template>