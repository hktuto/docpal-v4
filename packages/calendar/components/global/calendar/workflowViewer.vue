
<script lang="ts" setup>

const {disabled, formData, options, taskDetail} = defineProps<{
    disabled: boolean,
    formData: any
    options?: Object,
    taskDetail:any
}>();

const filter = ref()

function filterChange(newFilter: any) {
    console.log("filterChange", newFilter)
    filter.value = newFilter
}

function getFormData(){
    // console.log("getFormData", formData)
}

function createEvent(){

}
const newEventFromRef = ref();
function popNewEvent(dateTime: string) {
    console.log("popNewEvent", dateTime)
    newEventFromRef.value.open(dateTime, filter.value)
}

defineExpose({ getFormData })
</script>

<template>
    {{options}}
    {{ taskDetail }}
    {{formData}}
    <CalendarViewer :options="options" @newEvent="popNewEvent" @filter-change="filterChange"/>
    <CalendarNewEventForm ref="newEventFromRef" @submit="createEvent"/>
</template>