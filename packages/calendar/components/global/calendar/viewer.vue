<script setup lang="ts">
import {ElMessage} from 'element-plus'
import dayjs from 'dayjs'

import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
  viewMonthGrid,
  type CalendarEventExternal
} from '@schedule-x/calendar'

import {isEventValid } from '../../../utils/calendarHelper'

import '@schedule-x/theme-default/dist/index.css'
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
// import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import {getEventFromApi, type CalendarOptions, type DocPalEventType} from '../../../utils/calendarHelper'
import {useCalendarStore} from '../../../composables/useCalendar'

const { setting, calendarViewerCategories } = useCalendarStore();
const {options = {
    editable: false,
    allowCreate: false,
    showCategoryFilter: false,
    showLocationFilter: false,
    showUserFilter: false,
    showWorkflowFilter: false,
    defaultUser: "",
    defaultLocation: "",
    defaultCategory: "",
    view: "week",
}, filter, addtionalCheckBeforeEventUpdate, editItem} = defineProps<{
    options?: CalendarOptions;
    filter: any;
    addtionalCheckBeforeEventUpdate?: (oldEvent:any, editedEvent:any) => boolean,
    editItem?: any
}>();

let calendarApp:any ;
const showCalendar = ref(false)

const calendarControls = createCalendarControlsPlugin()
const eventsServicePlugin = createEventsServicePlugin();
// dialog ref

const emits = defineEmits(['onSelectedDateUpdate','onEventUpdate','onEventClick','onClickDate','onClickDateTime','onClickAgendaDate','onClickPlusEvents','onBeforeEventUpdate'])


const eventList = ref<CalendarEventExternal[]>([])

function onBeforeEventUpdate(oldEvent:CalendarEventExternal, editedEvent:CalendarEventExternal){
    return isEventValid(eventList.value, editedEvent)
}

function addEvent(newEvent:CalendarEventExternal){
    calendarApp.eventsService.add(newEvent)
}

function updateEvent(newEvent:CalendarEventExternal){
    console.log("updateEvent on calendar", newEvent);
    
    // calendarApp.eventsService.update(newEvent)
    // remove old event
    calendarApp.eventsService.remove(newEvent.id)
    // change calendar selected date
    const startday = dayjs(newEvent.start)
    calendarControls.setDate(startday.format('YYYY-MM-DD'))
    nextTick(() => {
        calendarApp.eventsService.add(newEvent)
    })
}

function deleteEvent(id:string){
    calendarApp.eventsService.remove(id)
}

function getEvent(id:string){
    return calendarApp.eventsService.get(id)
}

async function getList(){
    eventList.value = await getEventFromApi(calendarApp, calendarControls, filter, editItem)
    // add custom event
    console.log("get List", eventList.value);
    
}

function setupCalendar() {
    showCalendar.value = false

    const plugins = [
        createCurrentTimePlugin(),
        calendarControls,
        eventsServicePlugin
    ]
    const slot = setting.value.basic.allow_custom_slot ? null : setting.value.basic.slot
    plugins.push(createDragAndDropPlugin(slot))
    if(options.editable){
        if(setting.value.basic.allow_custom_slot){
            plugins.push(createResizePlugin())
        }
    }
    
    calendarApp = createCalendar({
        selectedDate: editItem ? dayjs(editItem.startTime).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
        firstDayOfWeek: setting.value.basic.first_day_of_week === 'MONDAY' ? 1 : 0,
        dayBoundaries: {
            start: setting.value.basic.office_start_time || '08:00',
            end: setting.value.basic.office_end_time || '20:00',
        },
        calendars: {...calendarViewerCategories.value},
        monthGridOptions:{
            nEventsPerDay: 10,
        },
        isResponsive: false,
        views:[
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),
        ],
        events: [
        ],
        callbacks:{
            onRangeUpdate: () => getList(),
            onSelectedDateUpdate: (args) => emits('onSelectedDateUpdate', args),
            onEventUpdate: (args) => emits('onEventUpdate', args),
            onEventClick: (args) => emits('onEventClick', args),
            onClickDate: (args) => emits('onClickDate', args),
            onClickDateTime: (args) => emits('onClickDateTime', args),
            onClickAgendaDate: (args) => emits('onClickAgendaDate', args),
            onClickPlusEvents: (args) => emits('onClickPlusEvents', args),
            onBeforeEventUpdate: onBeforeEventUpdate,

        }
    },
    plugins
    )
    nextTick(() => {
        showCalendar.value = true
        if(options.view) {
            calendarControls.setView(options.view)
        }else{
            const view = setting.value?.basic.default_view
            if(view) {
                calendarControls.setView(view)
            }
        }
        if(options.firstDayOfWeek) {
            calendarControls.setFirstDayOfWeek(options.firstDayOfWeek === 'MONDAY' ? 1 : 0)
        }else{
            const firstDayOfWeek = setting.value?.basic.default_first_week
            if(firstDayOfWeek) {
                calendarControls.setFirstDayOfWeek(firstDayOfWeek === 'MONDAY' ? 1 : 0)
            }
        }
    })
   getList()
}



onDeactivated(() => {
    showCalendar.value = false
})

function getCalendarStyle(event:any){
    const categories = useCalenarCategories()
    if(!event.calendarId) return ""
    const category = categories.value.find(item => item.id === event.calendarId)
    if(!category) return ""
    return `background-color: ${category.color}; color: ${category.onContainer}`
}

function displayTimeFn(event){
    return dayjs(event.start).format('HH:mm') + ' - ' + dayjs(event.end).format('HH:mm')
}


watch(() => [setting, options],async() =>{
    if(setting.value){
        setupCalendar()
    }
},{
    deep: true,
    immediate: true
})


defineExpose({
    calendarControls,
    calendarApp,
    eventsServicePlugin,
    addEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getList,
    eventList
})

</script>


<template>
    <div :class="{calendarViewerContainer:true, editMode: editItem && editItem.eventId, createMode: options.allowCreate}">

        <ScheduleXCalendar v-if="showCalendar" :calendar-app="calendarApp" >
            <template #timeGridEvent="{ calendarEvent }">
                <div :class="{eventContainer:true, isEditItem: editItem && calendarEvent.detail.eventId ===  editItem.eventId}"
                    :style="getCalendarStyle(calendarEvent)"
                >
                    {{ calendarEvent.location }} - {{ calendarEvent.people.join(", ") }}<br/>
                    {{ displayTimeFn(calendarEvent) }}
                </div>
            </template>
        </ScheduleXCalendar>
    </div>
</template>

<style lang="scss" scoped>
.calendarViewerContainer{
    &.editMode, &.createMode{
        .eventContainer{
            opacity: 0.6;
            &.isEditItem{
                opacity: 1;
            }
        }
    }
}   
.eventContainer{
    height:100%;
    padding:var(--app-space-xs);
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.1);
    &.isEditItem{
        cursor: pointer;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
        background-color: var(--app-primary-color) !important;
        border: 1px solid #000 !important;
    }
}
</style>

