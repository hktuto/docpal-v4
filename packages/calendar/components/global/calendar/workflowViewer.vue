
<script lang="ts" setup>
import {snapDownTo15Minutes } from '../../../utils/calendarHelper'
import dayjs from 'dayjs'
const props= defineProps<{
    disabled: boolean,
    formData: any
    options: CalendarOptions,
    taskDetail:any
}>();
const {formData} = toRefs(props)
const newEvent = ref()
const newEventId = ref(new Date().valueOf().toString())


function getFormData(){
    // console.log("getFormData", formData)
    // TODO : handle data mapping , workflow data may not be same as calendar
    if(newEvent.value.startTime !== props.formData.startTime || 
        newEvent.value.endTime !== props.formData.endTime ||
        newEvent.value.location !== props.formData.location ||
        newEvent.value.category !== props.formData.category
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
        calendarViewerRef.value.updateEvent(event)
        
        // udpdate event detail local
        // newEvent.value = event.detail
    }
}


function checkValid(event:any){
    // console.log(calendarViewerRef.value.eventList)
    return true
}

function updateEvent(params:CalendarEventExternal){

    newEvent.value = params
}

const newEventFromRef = ref();
function editEvent(event:CalendarEventExternal){
    // check if allow create and editItem is exist
    
    if(
      (props.options.allowCreate && newEvent.value.id === event?.detail?.id) ||
      (props.options.editable && props.formData.eventId === event?.detail?.eventId)
    ){
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
  console.log("popNewEvent", dateTime)
    if(props.formData.eventId){
        newEventId.value = props.formData.eventId
    }
    if(props.options.allowCreate){
        const selectedDate = dayjs(dateTime)
        if(selectedDate.isBefore(dayjs())) return
        const startDateTime = snapDownTo15Minutes(dayjs(dateTime))
        // normalize start date format before send to new event form
        const tempEvent:eventDialogParams = {
            startDate: startDateTime.format('YYYY-MM-DD'),
            startTime: startDateTime.format('HH:mm'),
            endDate : snapDownTo15Minutes(startDateTime.add(15, 'minutes')).format('YYYY-MM-DD'),
            endTime: snapDownTo15Minutes(startDateTime.add(15, 'minutes')).format('HH:mm'),
            user: newEvent.value?.user || calendarViewerRef.value.filter.user,
            category: newEvent.value?.category || calendarViewerRef.value.filter.category,
            location: newEvent.value?.location || calendarViewerRef.value.filter.location,
            id: newEvent.value?.id || Date.now(),
            detail: {}
        }
        newEventFromRef.value.open(tempEvent)
    }
}

const formReady = ref(false)
function initForm(){
    if(props.options.editable){
        
        newEvent.value = (props.formData.eventId || props.formData.eventid) ? props.formData : undefined;
        // normalize formData
        if(newEvent.value){
            newEvent.value.eventId = newEvent.value.eventId || newEvent.value.eventid
            newEventId.value = newEvent.value.eventId
        }

    }
    formReady.value = true
}




watch(formData,() => {
    formReady.value = false
    nextTick(() => {
        initForm()
        formReady.value = true
    })
    
},{
    immediate:true,
    deep:true
})

defineExpose({ getFormData })
</script>

<template>
    <Calendar v-if="formReady" ref="calendarViewerRef" :options="options" @openDetail="editEvent" @createEvent="popNewEvent" @updateEvent="updateEvent" :editItem="newEvent" >
    </Calendar>
    <CalendarNewEventForm ref="newEventFromRef" :options="options" :checkValid="checkValid" :newEventId="newEventId" @submit="createEditEvent"/>
</template>
