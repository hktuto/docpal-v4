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
    view: "week",
    userLabel: "Consultant",
    categoryLabel: "Category",
    locationLabel: "Office",
    defaultCategory: "7f785254-8a13-4f98-b6a1-4c52e17f7d06"
})

const displayOptions = computed(() => {
    if(options.data) {
        return {
            ...calendarOptions.value,
            ...options.data
        }
    }else{
        return calendarOptions.value
    }
})

function getInfo(){
    // get options
    if(options.data) {
        calendarOptions.value = {
            ...calendarOptions.value,
            ...options.data
        }
    }
    console.log("getInfo", options, calendarOptions.value)
}
const calendarViewerRef = ref()
function getFormData(){
    // console.log("getFormData", formData)
    return calendarViewerRef.value.getFormData(false)
}


onMounted(() => {
    getInfo()
})
defineExpose({ getFormData })
</script>

<template>
    <div class="calendar_widget_container">
        <CalendarWorkflowViewer ref="calendarViewerRef" :formData="formData" :taskDetail="taskDetail"  :options="displayOptions" />
    </div>
</template>

<style lang="scss" scoped>
.calendar_widget_container{
    height: calc(100vh - 200px);
    overflow: auto;
}
</style>