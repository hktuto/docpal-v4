<script setup lang="ts">
import dayjs from 'dayjs'
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'


const { setting } = useCalendarStore();

const calendarApp = createCalendar({
    selectedDate: dayjs().format('YYYY-MM-DD'),
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
            start: '2023-12-19',
            end: '2023-12-19',
        },
    ],

})

</script>


<template>
    <div class="calendarViewerContainer">
        <ScheduleXCalendar :calendar-app="calendarApp" />
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