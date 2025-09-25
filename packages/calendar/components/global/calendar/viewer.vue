<script setup lang="ts">
import dayjs from 'dayjs'

import { ScheduleXCalendar } from '@schedule-x/vue'
import { createCalendar, createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek, type CalendarEventExternal } from '@schedule-x/calendar'

import '@schedule-x/theme-default/dist/index.css'
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
// import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { getEventFromApi, type CalendarOptions, type DocPalEventType } from '../../../utils/calendarHelper'
import { useCalendarStore } from '../../../composables/useCalendar'
import { displayTimeFn } from '../../../utils/calendarHelper'

const { setting, calendarViewerCategories } = useCalendarStore()
const props = defineProps<{
  options: CalendarOptions
  filter: any
  addtionalCheckBeforeEventUpdate?: (oldEvent: any, editedEvent: any) => boolean
}>()

let calendarApp: any
const showCalendar = ref(false)

const calendarControls = createCalendarControlsPlugin()
const eventsServicePlugin = createEventsServicePlugin()
// dialog ref

const emits = defineEmits([
  'onSelectedDateUpdate',
  'onEventUpdate',
  'onEventClick',
  'onClickDate',
  'onClickDateTime',
  'onClickAgendaDate',
  'onClickPlusEvents',
  'onBeforeEventUpdate',
  'deleteEvent',
  'cancelEvent'
])

const temEvent = ref()
const eventList = ref<CalendarEventExternal[]>([])

function onBeforeEventUpdate(oldEvent: CalendarEventExternal, editedEvent: CalendarEventExternal) {
  // isEventValid(eventList.value, editedEvent)
  return true
}

function addEvent(newEvent: CalendarEventExternal) {
  temEvent.value = newEvent
  calendarApp.eventsService.add(newEvent)
}

function updateEvent(newEvent: CalendarEventExternal) {
  console.log('updateEvent on calendar', newEvent)
  temEvent.value = newEvent
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

function deleteEvent(id: string) {
  calendarApp.eventsService.remove(id)
  temEvent.value = null
}

function getEvent(id: string) {
  return calendarApp.eventsService.get(id)
}

async function getList() {
  // TODO: 結果集合需要排除刪除的數據
  const eventList = await getEventFromApi(calendarApp, calendarControls, props.filter)
  console.log('get List', eventList)
  eventList.value = eventList
}

function setupCalendar() {
  showCalendar.value = false

  try {
    const plugins = [createCurrentTimePlugin(), calendarControls, eventsServicePlugin]
    const slot = setting.value.basic.allow_custom_slot ? null : setting.value.basic.slot
    plugins.push(createDragAndDropPlugin(slot))
    if (props.options.editable) {
      if (setting.value.basic.allow_custom_slot) {
        plugins.push(createResizePlugin())
      }
    }

    calendarApp = createCalendar({
      selectedDate: dayjs().format('YYYY-MM-DD'),
      firstDayOfWeek: setting.value.basic.first_day_of_week === 'MONDAY' ? 1 : 0,
      dayBoundaries: {
        start: setting.value.basic.office_start_time || '08:00',
        end: setting.value.basic.office_end_time || '20:00'
      },
      calendars: { ...calendarViewerCategories.value },
      monthGridOptions: {
        nEventsPerDay: 10
      },
      isResponsive: true,
      views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
      events: [],
      callbacks: {
        onRangeUpdate: () => getList(),
        onSelectedDateUpdate: (args) => emits('onSelectedDateUpdate', args),
        onEventUpdate: (args) => emits('onEventUpdate', args),
        onEventClick: (args) => emits('onEventClick', args),
        onClickDate: (args) => emits('onClickDate', args),
        onClickDateTime: (args) => emits('onClickDateTime', args),
        onClickAgendaDate: (args) => emits('onClickAgendaDate', args),
        onClickPlusEvents: (args) => emits('onClickPlusEvents', args),
        onBeforeEventUpdate: onBeforeEventUpdate,
        onEventContextMenu: (args) => handleRightClick(args)
      },
      plugins
    })
    nextTick(() => {
      showCalendar.value = true
      if (props.options.view) {
        calendarControls.setView(props.options.view)
      } else {
        const view = setting.value?.basic.default_view
        if (view) {
          calendarControls.setView(view)
        }
      }
      if (props.options.firstDayOfWeek) {
        calendarControls.setFirstDayOfWeek(props.options.firstDayOfWeek === 'MONDAY' ? 1 : 0)
      } else {
        const firstDayOfWeek = setting.value?.basic.default_first_week
        if (firstDayOfWeek) {
          calendarControls.setFirstDayOfWeek(firstDayOfWeek === 'MONDAY' ? 1 : 0)
        }
      }
      getList()
    })
  } catch (e) {
    console.log('setupCalendar', e)
  }
}

onDeactivated(() => {
  showCalendar.value = false
})

function getCalendarStyle(event: any) {
  const categories = useCalenarCategories()
  const catId = event.detail.category || event.calendarId
  if (!catId) return ''
  const category = categories.value.find((item) => item.id === catId)
  if (!category) return ''

  checkColor(category)
  return `--bg-color: ${category.highlight_color}; --on-color: ${category.text_color}; --container_color: ${category.background_color};`
}

function checkColor(category: any) {
  const highlightColor = '#FF7B00'
  const textColor = '#000000'
  const brColor = '#FBA235'

  if (!category.highlight_color && checkColorFormat) category.highlight_color = highlightColor
  if (!category.text_color && checkColorFormat) category.text_color = textColor
  if (!category.background_color && checkColorFormat) category.background_color = brColor

  function checkColorFormat(color: String) {
    const hexPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
    return !hexPattern.test(color)
  }
}

function makeDescription(event: CalendarEventExternal) {
  return `${event.location} - ${event.people.join(', ')} - ${dayjs(event.start).format('YYYY-MM-DD HH:mm')} - ${dayjs(event.end).format('YYYY-MM-DD HH:mm')}`
}

function getRowData(row: any) {
}

const showMenu = ref(false)
const state = reactive({
  menuX: '',
  menuY: ''
})

const eventData = ref()
function handleRightClick(def: any, event: any) {
  console.log(123123, def, event)
  if (!event){
    return
  }
  // 阻止默认的右键菜单
  def.preventDefault()

  eventData.value = event

  state.menuX = def.clientX
  state.menuY = def.clientY

  console.log(`右击事件在位置 (${state.menuX}, ${state.menuY}) 发生`)
  showMenu.value = true
}

function handleCancel() {
  emits('cancelEvent',eventData.value)
  showMenu.value = false
}

function handleDetele() {
  emits('deleteEvent',eventData.value)
  showMenu.value = false
}

watch(
  () => [setting, props.options],
  async () => {
    if (setting.value) {
      console.log('calendar setting changed')
      setupCalendar()
    }
  },
  {
    deep: true,
    immediate: true
  }
)

onDeactivated(() => {
  showCalendar.value = false
  console.log('calendar deactivated')
})

onUnmounted(() => {
  console.log('calendar unmounted')
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
  <div
    :class="{ calendarViewerContainer: true, editMode: editItem && editItem.eventId, createMode: options.allowCreate }">
    <ScheduleXCalendar v-if="showCalendar" :calendar-app="calendarApp">
      <template #monthAgendaEvent="{ calendarEvent }">
        <div
          :class="{ eventContainer: true, isEditItem: editItem && calendarEvent.detail.eventId === editItem.eventId }"
          :style="getCalendarStyle(calendarEvent)"
        >
          {{ calendarEvent }}
          <div class="title eventInfo">
            <Icon name="mdi:calendar-text" />
            {{ calendarEvent.title }}
          </div>
          <div class="description eventInfo">
            <Icon name="mdi:text" />
            {{ calendarEvent.description }}
          </div>
          <div class="location eventInfo">
            <Icon name="mdi:map-marker" />
            {{ calendarEvent.location || calendarEvent.detail.location }}
          </div>
          <div class="time eventInfo">
            <Icon name="mdi:clock-outline" />
            {{ displayTimeFn(calendarEvent) }}
          </div>
        </div>
      </template>

      <template #timeGridEvent="{ calendarEvent }">
        <div
          :class="{ eventContainer: true, isEditItem: editItem && calendarEvent.detail.eventId === editItem.eventId }"
          :style="getCalendarStyle(calendarEvent)"
          @contextmenu.prevent="(event) => handleRightClick(event, calendarEvent)"
        >
          <ElTooltip placement="top">
            <div class="eventInfoGroup">
              <div class="eventInfo">
                <strong>{{ calendarEvent.title }}</strong>
              </div>
              <div class="eventInfo">
                <Icon name="mdi:map-marker" />
                {{ calendarEvent.location || calendarEvent.detail.location }}
              </div>
              <div class="eventInfo">
                <Icon name="mdi:clock-outline" />
                {{ displayTimeFn(calendarEvent, true) }}
              </div>
            </div>

            <template #content>
              {{ calendarEvent.id }}
              <br />
              {{ calendarEvent.location || calendarEvent.detail.location }} - {{ calendarEvent.people.join(', ') }}
              <br />
              {{ displayTimeFn(calendarEvent) }}
            </template>
          </ElTooltip>
        </div>
      </template>

      <template #monthGridEvent="{ calendarEvent }">
        <div
          :class="{ eventContainer: true, isEditItem: editItem && calendarEvent.detail.eventId === editItem.eventId, small: true }"
          :style="getCalendarStyle(calendarEvent)"
        >
          <ElTooltip placement="top">
            <div class="eventInfo small">
              <Icon name="mdi:map-marker" />
              {{ calendarEvent.location || calendarEvent.detail.location }}
              <Icon name="mdi:clock-outline" />
              {{ displayTimeFn(calendarEvent, true) }}
            </div>
            <template #content>
              {{ calendarEvent.location || calendarEvent.detail.location }} - {{ calendarEvent.people.join(', ') }}
              <br />
              {{ displayTimeFn(calendarEvent) }}
            </template>
          </ElTooltip>
        </div>
      </template>
    </ScheduleXCalendar>
  </div>

  <div v-if="showMenu" :style="{ top: `${state.menuY}px`, left: `${state.menuX}px` }" class="context-menu">
    <ul>
      <li @click="handleCancel">Cancel</li>
      <li @click="handleDetele">Detele</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.calendarViewerContainer {
  flex: 1;
  overflow: hidden;

  //&.editMode, &.createMode {
  //  .eventContainer {
  //    filter: grayscale(1);
  //
  //    &.isEditItem {
  //      filter: grayscale(0);
  //    }
  //  }
  //}
}

.eventInfoGroup {
  width: 100%;
  //display: flex;
  flex-flow: row wrap;
  gap: var(--app-space-xxs);
}

.eventInfo {
  display: flex;
  align-items: center;
  font-size: var(--app-font-size-m);
  justify-content: flex-start;
  gap: 4px;
  white-space: nowrap;

  .iconify {
    flex: 0 0 auto;
  }

  &.small {
    font-size: var(--app-font-size-xs);

    .iconify {
      width: var(--app-font-size-xs);
      height: var(--app-font-size-xs);
      font-size: var(--app-font-size-xs);
    }
  }
}

.sx-vue-calendar-wrapper {
  height: 100%;
}

.eventContainer {
  padding: var(--app-space-xs);
  border-radius: 4px;
  // background-color: rgba(0, 0, 0, 0.1);
  line-height: 1.1rem;
  background-color: var(--container_color);
  color: var(--on-color);
  border-left: 4px solid var(--bg-color);
  padding: var(--app-space-xs) var(--app-space-xs) var(--app-space-xs) var(--app-space-s);
  font-size: var(--app-font-size-m);
  line-height: 1.1rem;
  height: 100%;

  &.small {
    padding: var(--app-space-xxs);
    border-left: 2px solid var(--bg-color);
    font-size: var(--app-font-size-s);
  }

  &.isEditItem {
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    background-color: var(--app-primary-color) !important;
    border: 1px solid #000 !important;
  }
}


.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.context-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.context-menu li {
  padding: 8px 12px;
  cursor: pointer;
}

.context-menu li:hover {
  background-color: #f0f0f0;
}
</style>
