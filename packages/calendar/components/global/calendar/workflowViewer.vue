
<script lang="ts" setup>
import dayjs from 'dayjs'
const {disabled, formData, options, taskDetail} = defineProps<{
    disabled: boolean,
    formData: any
    options: CalendarOptions,
    taskDetail:any
}>();

const newEvent = ref()
const newEventId = ref(new Date().valueOf().toString())


function getFormData(){
    // console.log("getFormData", formData)
    // TODO : handle data mapping , workflow data may not be same as calendar
    return JSON.parse(JSON.stringify(newEvent.value))
}
const calendarViewerRef = ref()

function createEditEvent(newForm:DocPalEventType){
    const evParams = {
        ...newForm,
        rrelatedUsers:{
                user: newForm.user
        }
    }
    let event = convertSiteEventToCalendarEvent(evParams)
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


function checkValid(event:any){
    return isEventValid(calendarViewerRef.value.calendarApp, event)
}


const newEventFromRef = ref();
function editEvent(event:CalendarEventExternal){
    console.log("formData", formData)
    if(options.editable){
    }else{
        calendarViewerRef.value.openDetail(event);
    }
}
function popNewEvent(dateTime: string) {
    if(formData.eventId){
        newEventId.value = formData.eventId
    }
    if(options.allowCreate){
        const selectedDate = dayjs(dateTime)
        if(selectedDate.isBefore(dayjs())) return
        newEventFromRef.value.open(dateTime, calendarViewerRef.value.filter)
    }
}

defineExpose({ getFormData })
</script>

<template>
    <Calendar ref="calendarViewerRef" :options="options" @openDetail="editEvent" @createEvent="popNewEvent"  >
    </Calendar>
        <CalendarNewEventForm ref="newEventFromRef" :options="options" :checkValid="checkValid" :newEventId="newEventId" @submit="createEditEvent"/>
</template>