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
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import {type CalendarOptions} from '../../../utils/calendarHelper'
import { clientApi } from 'api'
import { ElRow } from 'element-plus'
const { setting } = useCalendarStore();
const {options = {
    editable: false,
    allowCreate: false,
    
}} = defineProps<{
    options?: CalendarOptions;
}>();

let calendarApp:any ;
const showCalendar = ref(false)

const viewName = [
    'day','week','month-grid','month-agenda'
]

const calendarControls = createCalendarControlsPlugin()
const eventsServicePlugin = createEventsServicePlugin();
const userFiterOptions = ref<any>([])
const locationFiterOptions = ref<any>([])
const categoryFiterOptions = ref<any>([])
// dialog ref
const newFormRef = ref()

type SiteEvent = {
    actionType : string
    assignee : string
    bizId : string
    category : string
    createdBy : string
    createdDate : string
    endTime : string
    eventId : string
    eventName :  "username"
    id : string
    isAllDay : true
    level :  0
    location : string
    modifiedBy : string
    modifiedDate : string
    relatedCases : any
    relatedUsers : any
    relatedWorkflows : any
    reminders: any[]
    startTime: string
    status : string
    taskId : string
    title :  String
}
type CalendarEvent = {
    id: string
    start: string,
    end: string,
    [key: string]: any
}
function convertSiteEventToCalendarEvent(event:SiteEvent):CalendarEvent {
    return {
        id: event.eventId,
        start: dayjs(event.startTime).format('YYYY-MM-DD HH:mm'),
        end: dayjs(event.endTime).format('YYYY-MM-DD HH:mm'),
        title: event.title,
        description: event.eventName,
        detail: event
    }
}

async function getCurrentRangeEvent(){
    const range = calendarControls.getRange()
    const { data } = await clientApi.api.postCalendarsList({
        startTime: dayjs(range.start).toISOString(),
        endTime: dayjs(range.end).toISOString(),
    }) as any
    const events = data.map(convertSiteEventToCalendarEvent)
    console.log('onRangeUpdate', events)
    calendarApp.eventsService.set(events);
}

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
        newFormRef.value.open(dateTime)
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
function setupCalendat() {
    showCalendar.value = false

    const plugins = [
        createCurrentTimePlugin(),
        calendarControls,
        eventsServicePlugin
    ]
    if(options.editable){
        const slot = setting.value.basic.allow_custom_slot ? null : setting.value.basic.slot
        plugins.push(createDragAndDropPlugin(slot))
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
            onSelectedDateUpdate: onSelectedDateUpdate,
            onRangeUpdate: getCurrentRangeEvent,
            onEventUpdate: onEventUpdate,
            onEventClick: onEventClick,
            onClickDate: onClickDate,
            onClickDateTime: onClickDateTime,
            onClickAgendaDate: onClickAgendaDate,
            onClickPlusEvents: onClickPlusEvents,
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

function reloadCalendar(){
    calendarApp.reload()
}

function getFormData(){
    return "calendar"
}


onMounted( () => {

})

onDeactivated(() => {
    showCalendar.value = false
})


watch(() => [setting, options],() =>{
    if(setting.value){
        setupCalendat()
    }
},{
    deep: true,
    immediate: true
})


defineExpose({
    getFormData
})

</script>


<template>
    <div class="calendarViewerContainer">
        <template v-if="options.showLocationFilter || options.showUserFilter || options.showCategoryFilter">
            <div class="filterContainer">
                <ElRow :gutter="20">
                    <ElCol :span="8">
                        <ElFormItem label="Location">
                            <ElSelect v-model="locationFiterOptions" multiple placeholder="Select">
                                <ElOption v-for="item in locationFiterOptions" :key="item.value" :label="item.label" :value="item.value" />
                            </ElSelect>
                        </ElFormItem>
                    </ElCol>
                    <ElCol :span="8">
                        <ElFormItem label="User">
                            <ElSelect v-model="userFiterOptions" multiple placeholder="Select">
                                <ElOption v-for="item in userFiterOptions" :key="item.value" :label="item.label" :value="item.value" />
                            </ElSelect>
                        </ElFormItem>
                    </ElCol>
                    <ElCol :span="8">
                        <ElFormItem label="Category">
                            <ElSelect v-model="categoryFiterOptions" multiple placeholder="Select">
                                <ElOption v-for="item in categoryFiterOptions" :key="item.value" :label="item.label" :value="item.value" />
                            </ElSelect>
                        </ElFormItem>   
                        </ElCol>
                </ElRow>
                
               
            </div>
        </template>
        <ScheduleXCalendar v-if="showCalendar" :calendar-app="calendarApp" />
        <CalendarNewEventForm ref="newFormRef" @reload="reloadCalendar" />
    </div>
</template>

<style lang="scss" scoped>
.calendarViewerContainer{
    width: 100%;
    height: 100%;
    min-height: 500px;
    position: relative;
}
</style>