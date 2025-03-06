<script lang="ts" setup>
const {disabled, formData, options,taskDetail} = defineProps<{
    disabled: boolean,
    formData: any
    options: Object,
    taskDetail?:any
}>();
const calendarOptions = ref<CalendarOptions>({
    allowCreate: true,
    editable: false,
    showLocationFilter: true,
    showUserFilter: true,
    view: "week"
})

function getInfo(){
    // get options
    if(options.data) {
        calendarOptions.value = {
            ...calendarOptions.value,
            ...options.data
        }
        if(options.data.fieldMapping) {
        }
    }
    

}
const calendarViewerRef = ref()
function getFormData(){
    // console.log("getFormData", formData)
    const data = calendarViewerRef.value.getFormData(false)
    console.log("getFormData", data)
    return data
}


onMounted(() => {
    getInfo()
})
defineExpose({ getFormData })
</script>

<template>
    <div class="calendar_widget_container">
        <CalendarWorkflowViewer ref="calendarViewerRef"  :options="calendarOptions" />
    </div>
</template>

<style lang="scss" scoped>
.calendar_widget_container{
    height: calc(100vh - 200px);
    overflow: auto;
}
</style>