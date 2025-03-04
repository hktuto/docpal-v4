<script lang="ts" setup>
import dayjs from 'dayjs'
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
    console.log("taskDetail", taskDetail)
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
function getFormData(){
    console.log("getFormData", formData)
    return {
        ...formData,
        starttime: dayjs().toISOString(),
        endtime: dayjs().add(8, 'hour').toISOString(),
    }
}


onMounted(() => {
    getInfo()
})
defineExpose({ getFormData })
</script>

<template>
    <div class="calendar_widget_container">
        <CalendarWorkflowViewer  :options="calendarOptions" />
    </div>
</template>

<style lang="scss" scoped>
.calendar_widget_container{
    height: calc(100vh - 200px);
    overflow: auto;
}
</style>