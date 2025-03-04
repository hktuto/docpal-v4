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
import {type CalendarOptions} from '../../../utils/calendarHelper'
import { clientApi } from 'api'
import { ElRow } from 'element-plus'

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
// set up filter options
const userFiterOptions = ref<any>([])
const workflowFilterOptions = ref<any>([])

async function getFilterOptions(){
    const user = await clientApi.api.postNuxeoIdentityUsers({}).then(res => res.data)
    userFiterOptions.value = user.map(item => {
        return {
            label: item.username,
            value: item.userId
        }
    })
}

async function setDefaultFilter(){
    if(options.showCategoryFilter || options.showLocationFilter || options.showUserFilter){
        await getFilterOptions()
    }
    console.log("setDefaultFilter", options)
    if(options.defaultUser){
        filter.value.user = options.defaultUser
    }
    if(options.defaultLocation){
        filter.value.location = options.defaultLocation
    }
    if(options.defaultCategory){
        filter.value.category = options.defaultCategory
    }
    console.log("setDefaultFilter", filter.value)
}

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
const filter = ref({
    category:"",
    user:"",
    location:"",
    workflow:""
})
async function getCurrentRangeEvent(){
    const range = calendarControls.getRange()
    const params:any = {
        startTime: dayjs(range.start).toISOString(),
        endTime: dayjs(range.end).toISOString(),
    }
    // TODO : backend is missing filter
    // if(filter.value.category){
    //     params.category = filter.value.category
    // }
    // if(filter.value.location){
    //     params.location = filter.value.location
    // }
    // if(filter.value.user){
    //     params.user = [filter.value.user]
    // }
    const { data } = await clientApi.api.postCalendarsList(params) as any
    const events = data.filter( (event:any) => {
        if(filter.value.category) {
            const matCat = event.category === filter.value.category
            if(!matCat) return false
        }
        if(filter.value.location) {
            const matLoc = event.location === filter.value.location
            if(!matLoc) return false
        }
        if(filter.value.user) {
            const matUser = event.assignee === filter.value.user || event.modifiedBy === filter.value.user || event.relatedUsers.includes(filter.value.user)
            if(!matUser) return false
        }
        return true
    }).map(convertSiteEventToCalendarEvent)
    // filter events
    console.log('onRangeUpdate', events, filter.value)
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



onDeactivated(() => {
    showCalendar.value = false
})


const filtetColumnWidth = computed(() => {
    let count = 0;
    if(options.showLocationFilter) count ++;
    if(options.showWorkflowFilter) count ++;
    if(options.showUserFilter) count ++;
    if(options.showCategoryFilter) count ++;
    return 24 / count
})

watch(() => [setting, options],async() =>{
    if(setting.value){
        await setDefaultFilter()
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
        <template v-if="options.showLocationFilter ||options.showWorkflowFilter || options.showUserFilter || options.showCategoryFilter">
            <div class="filterContainer">
                <ElForm label-position="top">
                <ElRow :gutter="20">
                    <ElCol v-if="options.showWorkflowFilter" :span="filtetColumnWidth">
                        <ElFormItem label="Workflow">
                            <ElSelect v-model="filter.workflow" multiple placeholder="Select">
                                <ElOption v-for="item in workflowFilterOptions" :key="item.value" :label="item.label" :value="item.value" />
                            </ElSelect>
                        </ElFormItem>
                    </ElCol>
                    <ElCol v-if="options.showLocationFilter" :span="filtetColumnWidth">
                        <ElFormItem label="Location">
                            <ElSelect v-model="filter.location" clearable placeholder="Select" @change="getCurrentRangeEvent">
                                <ElOption v-for="item in locationsOption" :key="item.id" :label="item.name" :value="item.id" />
                            </ElSelect>
                        </ElFormItem>
                    </ElCol>
                    <ElCol v-if="options.showUserFilter" :span="filtetColumnWidth">
                        <ElFormItem label="User">
                            <ElSelect v-model="filter.user" clearable placeholder="Select" @change="getCurrentRangeEvent">
                                <ElOption v-for="item in userFiterOptions" :key="item.value" :label="item.label" :value="item.value" />
                            </ElSelect>
                        </ElFormItem>
                    </ElCol>
                    <ElCol v-if="options.showCategoryFilter" :span="filtetColumnWidth">
                        <ElFormItem label="Category">
                            <ElSelect v-model="filter.category" clearable placeholder="Select" @change="getCurrentRangeEvent">
                                <ElOption v-for="item in categoriesOption" :key="item.id" :label="item.name" :value="item.id" />
                            </ElSelect>
                        </ElFormItem>   
                        </ElCol>
                </ElRow>
                </ElForm>
               
            </div>
        </template>
        <ScheduleXCalendar v-if="showCalendar" :calendar-app="calendarApp" />
        <!-- <CalendarNewEventForm ref="newFormRef" @reload="reloadCalendar" /> -->
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