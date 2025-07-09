<script lang="ts" setup>
import { clientApi } from 'api'
import type { CalendarEventExternal } from '@schedule-x/calendar'

const { setting: calendarSettiing, categoriesOption, locationsOption } = useCalendarStore()
import { type CalendarOptions, type DocPalEventType, convertSiteEventToCalendarEvent } from '../../../utils/calendarHelper'
import CalendarViewer from './viewer.vue'
import CalendarDetailDialog from './detailDialog.vue'

const viewerRef = ref<InstanceType<typeof CalendarViewer>>()
const detailDialogRef = ref<InstanceType<typeof CalendarDetailDialog>>()
const props = defineProps<{
  options: CalendarOptions
  addtionalCheckBeforeEventUpdate: (oldEvent: any, editedEvent: any) => boolean
  editItem?: any
}>()

const displayOption = ref<CalendarOptions>({
  ...props.options
})

const emits = defineEmits(['createEvent', 'filterChange', 'openDetail', 'onEventUpdate', 'updateEvent'])
function addEvent(newEvent: CalendarEventExternal) {
  viewerRef.value?.addEvent(newEvent)
}

function getEvent(id: string) {
  return viewerRef.value?.getEvent(id)
}

function updateEvent(newEvent: CalendarEventExternal) {
  viewerRef.value?.updateEvent(newEvent)
}

// #region filter logic
const filter = ref({
  category: '',
  user: '',
  location: '',
  workflow: ''
})
const userFiterOptions = ref<any>([])
async function getFilterOptions() {
  try {
    let user: any = []
    if (props.options.userFilter) {
      const res = await clientApi.api.getPermissionUserGroupGroupidUsers(props.options.userFilter).then((res) => res.data)
      user = res.users
    } else {
      user = await clientApi.api.postNuxeoIdentityUsers({}).then((res) => res.data)
      if (!user) throw new Error('no user')
    }

    userFiterOptions.value = user
      .map((item) => {
        return {
          label: item.username,
          value: item.userId
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))
    userFiterOptions.value.unshift({
      label: 'Current User',
      value: 'currentUser'
    })
  } catch (err) {
    console.log('no user', err)
  }
}

async function setDefaultFilter() {
  if (props.options.showCategoryFilter || props.options.showLocationFilter || props.options.showUserFilter) {
    await getFilterOptions()
  }
  if (props.options.defaultUser) {
    filter.value.user = props.options.defaultUser
  }
  if (props.options.defaultLocation) {
    filter.value.location = props.options.defaultLocation
  }
  if (props.options.defaultCategory) {
    filter.value.category = props.options.defaultCategory
  }
  if (!props.options.view) {
    displayOption.value.view = calendarSettiing.value?.basic.default_view
  }
  if (!props.options.firstDayOfWeek) {
    displayOption.value.firstDayOfWeek = calendarSettiing.value?.basic.default_first_week
  }
}
// #endregion

function openDetail(event: CalendarEventExternal) {
  detailDialogRef.value?.open(event)
}

// calendar Event
const calendarEvents = {
  onEventClick: (args: any) => {
    if (props.options.allowCreate && args.detail.eventId === props.editItem.value?.id) {
      console.log('onEventClick editItem', args)
      emits('openDetail', args)
      return
    }
    if (props.options.editable) {
      emits('openDetail', args)
    } else {
      detailDialogRef.value?.open(args)
    }
  },
  onClickDate: (args: string) => {
    console.log('onClickDate', args)
  },
  onClickDateTime: (args: string) => {
    if (!props.options.allowCreate) return
    // if editItem is exist, update it
    emits('createEvent', args)
  },
  onClickAgendaDate: (args) => {
    console.log('onClickAgendaDate', args)
  },
  onClickPlusEvents: (args) => {
    console.log('onClickPlusEvents', args)
  },
  onEventUpdate: (args: any) => {
    console.log('onEventUpdate', args)
    const newData = convertCalendarEventToSiteEvent(args)
    emits('updateEvent', newData)
    // convert scheduls-x event to calendar event
    // emits('updateEvent', args)
  }
}
function filterChange() {
  emits('filterChange', filter.value)
  viewerRef.value?.getList()
}

const filtetColumnWidth = computed(() => {
  let item = 0
  if (props.options.showCategoryFilter) {
    item++
  }
  if (props.options.showUserFilter) {
    item++
  }
  if (props.options.showLocationFilter) {
    item++
  }
  return 24 / item
})

const showCalendar = ref(true)
function refresh() {
  viewerRef.value.getList()
}
onMounted(async () => {
  await setDefaultFilter()
})

const eventList = computed(() => viewerRef.value?.eventList || [])

defineExpose({
  addEvent,
  getEvent,
  updateEvent,
  filter,
  openDetail,
  eventList,
  refresh
})
</script>

<template>
  <div class="calendarWidgetViewerContainer">
    <div class="filterContainer">
      <ElForm label-position="top">
        <ElRow :gutter="20">
          <ElCol v-if="options.showLocationFilter" :span="filtetColumnWidth">
            <ElFormItem :label="options.locationLabel || 'Location'">
              <ElSelect v-model="filter.location" clearable placeholder="Select" filterable @change="filterChange">
                <ElOption v-for="item in locationsOption" :key="item.id" :label="item.name" :value="item.id" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol v-if="options.showUserFilter" :span="filtetColumnWidth">
            <ElFormItem :label="options.userLabel || 'User'">
              <ElSelect v-model="filter.user" clearable placeholder="Select" filterable @change="filterChange">
                <ElOption v-for="item in userFiterOptions" :key="item.value" :label="item.label" :value="item.value" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol v-if="options.showCategoryFilter" :span="filtetColumnWidth">
            <ElFormItem :label="options.categoryLabel || 'Category'">
              <ElSelect v-model="filter.category" clearable placeholder="Select" filterable @change="filterChange">
                <ElOption v-for="item in categoriesOption" :key="item.id" :label="item.name" :value="item.id" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElForm>
    </div>
    <CalendarViewer ref="viewerRef" :options="options" :filter="filter" :editItem="editItem" v-on="calendarEvents" />
    <CalendarDetailDialog ref="detailDialogRef" width="80%" :options="options" :addtionalCheckBeforeEventUpdate="addtionalCheckBeforeEventUpdate" />
  </div>
</template>

<style lang="scss" scoped>
.calendarWidgetViewerContainer {
  height: 100%;
  min-height: 500px;
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
}
</style>
