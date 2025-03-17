
<script lang="ts" setup>
import {snapDownTo15Minutes } from '../../../utils/calendarHelper'
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
    if(newEvent.value.startTime !== formData.startTime || 
        newEvent.value.endTime !== formData.endTime ||
        newEvent.value.location !== formData.location ||
        newEvent.value.category !== formData.category
    ) {
        newEvent.value.edited = true
    }else{
        newEvent.value.edited = false;
    }
    return JSON.parse(JSON.stringify(newEvent.value))
}
const calendarViewerRef = ref()

function createEditEvent(newForm:DocPalEventType){
    // check if editItem 
    const evParams = {
        ...newForm,
        relatedUsers:{
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
        console.log("confirm edit", newForm);
        newEvent.value = newForm;
        console.log("udpate Event", event)
        calendarViewerRef.value.updateEvent(event)
        
        // udpdate event detail local
        // newEvent.value = event.detail
    }
}


function checkValid(event:any){
    console.log(calendarViewerRef.value.eventList)
    return isEventValid(calendarViewerRef.value.eventList, event)
}

function updateEvent(params:CalendarEventExternal){

    newEvent.value = params
}

const newEventFromRef = ref();
function editEvent(event:CalendarEventExternal){
    if(options.editable && formData.eventId === event?.detail?.eventId){
        const startDateTime = dayjs(event.start)
        const endDateTime = dayjs(event.end)
        const tempEvent:eventDialogParams = {
            id: event.id,
            startDate: startDateTime.format('YYYY-MM-DD'),
            startTime: startDateTime.format('HH:mm'),
            endDate: endDateTime.format('YYYY-MM-DD'),
            endTime: endDateTime.format('HH:mm'),
            user: event.people[0],
            category: event.calendarId,
            location: event.location,
            detail: event.detail
        }
        newEventFromRef.value.open(tempEvent)
        // calendarViewerRef.value.openDetail(event);
    }else{
        
        calendarViewerRef.value.openDetail(event);
        
    }
}

type eventDialogParams = {
    id?: string,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    user: string,
    category: string,
    location: string,
    detail: any
}
function popNewEvent(dateTime: string) {
    if(formData.eventId){
        newEventId.value = formData.eventId
    }
    if(options.allowCreate){
        const selectedDate = dayjs(dateTime)
        if(selectedDate.isBefore(dayjs())) return
        const startDateTime = snapDownTo15Minutes(dayjs(dateTime))
        // normalize start date format before send to new event form
        const tempEvent:eventDialogParams = {
            startDate: startDateTime.format('YYYY-MM-DD'),
            startTime: startDateTime.format('HH:mm'),
            endDate : snapDownTo15Minutes(startDateTime.add(15, 'minutes')).format('YYYY-MM-DD'),
            endTime: snapDownTo15Minutes(startDateTime.add(15, 'minutes')).format('HH:mm'),
            user: calendarViewerRef.value.filter.user,
            category: calendarViewerRef.value.filter.category,
            location: calendarViewerRef.value.filter.location,
            detail: {}
        }
        newEventFromRef.value.open(tempEvent)
    }
}


function initForm(){
    if(options.editable && !options.allowCreate){
        
        newEvent.value = (formData.eventId || formData.eventid) ? formData : undefined;
        // normalize formData
        if(newEvent.value){
            newEvent.value.eventId = newEvent.value.eventId || newEvent.value.eventid
            newEventId.value = newEvent.value.eventId
        }

    }
}

onMounted(() => {
    initForm()
})

defineExpose({ getFormData })
</script>

<template>
    <Calendar ref="calendarViewerRef" :options="options" @openDetail="editEvent" @createEvent="popNewEvent" @updateEvent="updateEvent" :editItem="newEvent" >
    </Calendar>
    <CalendarNewEventForm ref="newEventFromRef" :options="options" :checkValid="checkValid" :newEventId="newEventId" @submit="createEditEvent"/>
</template>