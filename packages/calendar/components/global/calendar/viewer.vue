<script setup lang="ts">
import dayjs from 'dayjs'
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
  viewMonthGrid
} from '@schedule-x/calendar'

import '@schedule-x/theme-default/dist/index.css'
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
// import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import {getEventFromApi, type CalendarOptions, type DocPalEventType} from '../../../utils/calendarHelper'


const { setting, categoriesOption, locationsOption } = useCalendarStore();
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
}, filter} = defineProps<{
    options?: CalendarOptions;
    filter: any;
}>();

let calendarApp:any ;
const showCalendar = ref(false)

const viewName = [
    'day','week','month-grid','month-agenda'
]

const calendarControls = createCalendarControlsPlugin()
const eventsServicePlugin = createEventsServicePlugin();
// set up filter options
const userFiterOptions = ref<any>([])
const workflowFilterOptions = ref<any>([])
const emits = defineEmits(['filter-change', 'newEvent'])




// dialog ref

function onEventUpdate(event) {
    console.log('onEventUpdate', event)
}
function onEventClick(event) {
    console.log('onEventClick', event)
}
function onClickDate(date) {
    console.log('onClickDate', date)
}
function onClickDateTime(dateTime) {
    if(options.allowCreate){
        // newFormRef.value.open(dateTime)
        emits('newEvent', dateTime)
    }
    console.log('onClickDateTime', dateTime, options) // e.g. 2024-01-01 12:37
}
function onClickAgendaDate(date) {
    console.log('onClickAgendaDate', date)
}
function onClickPlusEvents(date) {

}
function onSelectedDateUpdate(date) {
}

function onBeforeEventUpdate(editedEvent:any){

    const starDay = dayjs(editedEvent.startTime)
    const endDay = dayjs(editedEvent.endTime)

    if(starDay.isBefore(dayjs())) {
        return false
    }
    // filter user
    const people = editedEvent.people as string[] || []
    // loop current event, check if user has event overlap
    currentEvent.value.forEach((item:any) => {
        const totalSet = new Set(...item.people,...people)
        if(totalSet.size === item.people.length + people.length){
            return false
        }
    })
    return true;
// check if user 
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
        selectedDate: dayjs().format('YYYY-MM-DD'),
        firstDayOfWeek: setting.value.basic.first_day_of_week === 'MONDAY' ? 1 : 0,
        dayBoundaries: {
            start: '06:00',
            end: '20:00',
        },
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
            onRangeUpdate: () => getEventFromApi(calendarApp, calendarControls, filter),
            onSelectedDateUpdate: onSelectedDateUpdate,
            onEventUpdate: onEventUpdate,
            onEventClick: onEventClick,
            onClickDate: onClickDate,
            onClickDateTime: onClickDateTime,
            onClickAgendaDate: onClickAgendaDate,
            onClickPlusEvents: onClickPlusEvents,
            onBeforeEventUpdate: onBeforeEventUpdate,

        }
    },
    plugins
    )
    nextTick(() => {
        showCalendar.value = true
        if(options.view) {
            calendarControls.setView(options.view)
        }
    })
    getCurrentRangeEvent()
}



onDeactivated(() => {
    showCalendar.value = false
})




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
    calendarApp
})

</script>


<template>
    <div class="calendarViewerContainer">
        <template v-if="options.showLocationFilter ||options.showWorkflowFilter || options.showUserFilter || options.showCategoryFilter">
            
        </template>
        <ScheduleXCalendar v-if="showCalendar" :calendar-app="calendarApp" />
    </div>
</template>

