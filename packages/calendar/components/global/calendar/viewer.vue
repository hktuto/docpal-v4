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
}, filter, addtionalCheckBeforeEventUpdate} = defineProps<{
    options?: CalendarOptions;
    filter: any;
    addtionalCheckBeforeEventUpdate?: (oldEvent:any, editedEvent:any) => boolean
}>();

let calendarApp:any ;
const showCalendar = ref(false)

const calendarControls = createCalendarControlsPlugin()
const eventsServicePlugin = createEventsServicePlugin();
// dialog ref

const emits = defineEmits(['onSelectedDateUpdate','onEventUpdate','onEventClick','onClickDate','onClickDateTime','onClickAgendaDate','onClickPlusEvents','onBeforeEventUpdate'])


const eventList = ref<CalendarEventExternal[]>([])

function onBeforeEventUpdate(oldEvent:CalendarEventExternal, editedEvent:CalendarEventExternal){
    return isEventValid(calendarApp, editedEvent)
}

function addEvent(newEvent:CalendarEventExternal){
    calendarApp.eventsService.add(newEvent)
}

function updateEvent(newEvent:CalendarEventExternal){
    calendarApp.eventsService.update(newEvent)
}

function deleteEvent(id:string){
    calendarApp.eventsService.delete(id)
}

function getEvent(id:string){
    return calendarApp.eventsService.get(id)
}

async function getList(){
    eventList.value = await getEventFromApi(calendarApp, calendarControls, filter)

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
            onRangeUpdate: () => getEventFromApi(calendarApp, calendarControls, filter),
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
    getList
})

</script>


<template>
    <div class="calendarViewerContainer">

        <ScheduleXCalendar v-if="showCalendar" :calendar-app="calendarApp" />
    </div>
</template>

