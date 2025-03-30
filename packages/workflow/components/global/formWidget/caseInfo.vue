<script lang="ts" setup>

const props = defineProps<{
    disabled: boolean,
    formData: any
    options: any,
}>();

const { options, formData} = toRefs(props)
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
const instanceId = ref()
function getInfo(){
    // get options
    const fieldName = props.options.data.caseIdField || ''
    if(fieldName && props.formData[fieldName]) {
        instanceId.value = props.formData[fieldName]
    }
    if(props.options.data.setting) {
        settings.value = {
            layout: props.options.data.setting.layout,
            defaultValue: props.options.data.setting.defaultValue
        }
    }
    console.log("getInfo", instanceId.value, settings.value, props.options)
    ready.value = true
}

defineExpose({ getFormData })

watch(()=>[ options, formData] ,() => {
    getInfo()
},{
    immediate: true,
    deep: true
})


provide(CaseManagementDashboardKey, {
    instanceId
})
</script>

<template>
    <div class="full-height">
        <DashboardBasicInfo  :setting="settings" :hideSetting="true" />
    </div>
</template>
