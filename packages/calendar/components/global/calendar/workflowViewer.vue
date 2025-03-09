
<script lang="ts" setup>
import dayjs from 'dayjs'
const {disabled, formData, options, taskDetail} = defineProps<{
    disabled: boolean,
    formData: any
    options: CalendarOptions,
    taskDetail:any
}>();

const filter = ref()
const newEvent = ref()
const newEventId = new Date().valueOf().toString()
function filterChange(newFilter: any) {
    filter.value = newFilter
}

function getFormData(){
    // console.log("getFormData", formData)
    console.log("getFormData", newEvent.value)
    // TODO : handle data mapping , workflow data may not be same as calendar
    return newEvent.value
}
const calendarViewerRef = ref()

function createEditEvent(newForm:DocPalEventType){
    let event = convertSiteEventToCalendarEvent(newForm)
    if(!newEvent.value) {
        newEvent.value = newForm;
        event._options = {
            disableResize: true,
            disableDND: false,
        }
        calendarViewerRef.value.addEvent(event)
    }else{
        newEvent.value = newForm;
        calendarViewerRef.value.updateEvent(event)
    }
}
const newEventFromRef = ref();
function popNewEvent(dateTime: string) {
    console.log("popNewEvent", dateTime)
    const selectedDate = dayjs(dateTime)
    if(selectedDate.isBefore(dayjs())) return
    newEventFromRef.value.open(dateTime, filter.value)
}

defineExpose({ getFormData })
</script>

<template>
    {{formData}}
    <Calendar ref="calendarViewerRef" :options="options" @createEvent="popNewEvent" @filterChange="filterChange"/>
    <CalendarNewEventForm ref="newEventFromRef" :options="options" :newEventId="newEventId" @submit="createEditEvent"/>
</template>