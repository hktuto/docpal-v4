<script lang="ts" setup>

const {disabled, formData, options = {
    data:{
        caseIdField:'caseId',
    }
}} = defineProps<{
    disabled: boolean,
    formData: any
    options?: Object,
}>();
const ready = ref(false)
function getFormData(){
    console.log("getFormData")
    // if no data , return empty
    return {}
}
const settings = ref<any>({
    flexHeight: 1,
    layout: [
        {
            id: 'caseId',
            name: 'caseId',
            width: '50%'
        },
        {
            id: 'caseName',
            name: 'caseName',
            width: '50%'
        }
    ],
    defaultValue: {
        caseId: '222',
    }
})
function getInfo(){
    // get options
    const fieldName = options.data.caseIdField || ''
    if(fieldName && formData[fieldName]) {
        instanceId.value = formData[fieldName]
    }
    if(options.data.setting) {
        settings.value = {
            layout: options.data.setting.layout,
            defaultValue: options.data.setting.defaultValue
        }
    }
    ready.value = true
}

defineExpose({ getFormData })

onMounted(() => {
    getInfo()
})
const instanceId = ref()
provide(CaseManagementDashboardKey, {
    instanceId
})
</script>

<template>
    <div class="full-height">
        <DashboardBasicInfo  :setting="settings" :hideSetting="true" />
    </div>
</template>