<script lang="ts" setup>
const condition = defineModel<any>('condition', {required: true})
    const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider){
    throw new Error('Missing provider')
}

function initForm() {
    // normalize condition
    condition.value = {
        attr_type: "Look_Up_User_Group",
        attr_function: "Increase_By",
        attr_source: "form",
        attr_updateFieldName: "",
        attr_step: "1"
    }
}

</script>

<template>
    form
</template>