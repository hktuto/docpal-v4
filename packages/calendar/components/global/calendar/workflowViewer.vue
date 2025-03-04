
<script lang="ts" setup>

const {disabled, formData, options, taskDetail} = defineProps<{
    disabled: boolean,
    formData: any
    options?: Object,
    taskDetail:any
}>();

const filter = ref()
const newEvent = ref()
function filterChange(newFilter: any) {
    console.log("filterChange", newFilter)
    filter.value = newFilter
}

function getFormData(){
    // console.log("getFormData", formData)
    console.log("getFormData", newEvent.value)
    return newEvent.value
}
const calendarViewerRef = ref()
function createEvent(newForm){
    newEvent.value = newForm;
    calendarViewerRef.value.addEvent(newForm)
}
const newEventFromRef = ref();
function popNewEvent(dateTime: string) {
    console.log("popNewEvent", dateTime)
    newEventFromRef.value.open(dateTime, filter.value)
}

defineExpose({ getFormData })
</script>

<template>
    {{ options }}
    {{ taskDetail }}
    {{ formData }}
    <CalendarViewer ref="calendarViewerRef" :options="options" @newEvent="popNewEvent" @filter-change="filterChange"/>
    <CalendarNewEventForm ref="newEventFromRef" @submit="createEvent"/>
</template>