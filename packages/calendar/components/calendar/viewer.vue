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

const { setting } = useCalendarStore();
const props = defineProps<{
    options?: any;
}>();
const { options } = toRefs(props)

let calendarApp ;
const showCalendar = ref(false)
function setupCalendat() {
    showCalendar.value = false
    console.log("setupCalendar", viewMonthGrid.name)
    const plugins = [
        createCurrentTimePlugin(),
    ]
    if(options.value.editable){
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
        isResponsive: true,
        views:[
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),
        ],
        events: [
            {
                id: 1,
                title: 'Event 1',
                start: dayjs().format('YYYY-MM-DD') + " 08:00",
                end: dayjs().format('YYYY-MM-DD') + " 08:15",
            },
        ],
        callbacks:{
            
        }
    },
    plugins
    )
    nextTick(() => {
        showCalendar.value = true
    })
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

</script>


<template>
    <div class="calendarViewerContainer">
        <ScheduleXCalendar v-if="showCalendar" :calendar-app="calendarApp" />
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