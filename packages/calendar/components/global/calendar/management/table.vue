<script setup lang="ts">
import { adminApi, clientApi } from 'api'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
const { t } = useI18n()
const { categoriesOption, locationsOption } = useCalendarStore()
const form = ref({
  category: '',
  user: '',
  location: '',
  dateRange: []
})
let extraParams: any = {}
const eventDialogRef = ref()
const userFilterOptions = ref()

function formLocation(id: string) {
  const location = locationsOption.value.find((item: any) => item.id === id)
  return !!location ? location.name : ''
}

function formCategory(id: string) {
  const categories = categoriesOption.value.find((item: any) => item.id === id)
  return !!categories ? categories.name : ''
}

const { tableRef, tableConfig, tableEvent, reload } = useVxeTable({
  id: 'calendarEventManagement',
  zoom: false,
  api: async (params: any) => {
    return await clientApi.api.postCalendarsList({ ...params, ...extraParams })
  },
  remoteSort: true,
  columns: [
    {
      title: 'dpTable_name',
      field: 'eventName',
      fixed: 'left'
    },
    {
      title: 'dpTable_location',
      field: 'location',
      formatter({ cellValue }: any) {
        return formLocation(cellValue)
      }
    },
    {
      title: 'category',
      field: 'category',
      formatter({ cellValue }: any) {
        return formCategory(cellValue)
      }
    },
    {
      title: 'Participants',
      field: 'relatedUsers.user',
      formatter({ cellValue }: any) {
        // 給role and group id轉成name
        return cellValue
      }
    },
    {
      title: 'info_created',
      field: 'createdBy'
    }
  ],
  bodyActions: [
    [
      {
        name: 'common_edit',
        action: ({ row }) => editEvent(row)
      }
    ]
  ]
  // permissionMethod: listProvider?.actionPermission
})

function filterChange() {
  if (!!form.value.category) {
    extraParams.category = form.value.category
  } else {
    delete extraParams.category
  }

  if (!!form.value.user) {
    extraParams.user = form.value.user
  } else {
    delete extraParams.user
  }

  if (!!form.value.location) {
    extraParams.location = form.value.location
  } else {
    delete extraParams.location
  }

  if (!!form.value.dateRange) {
    extraParams.startTime = dayjs.utc(form.value.dateRange[0]).toISOString()
    extraParams.endTime = dayjs.utc(form.value.dateRange[1]).toISOString()
  } else {
    delete extraParams.startTime
    delete extraParams.endTime
  }
  reload()
}

function createEvent() {

}

function editEvent(row: any) {
  // TODO：應該在外層禁用事件
  if ('R' === row.status || 'D' === row.status) {
    return
  }

  const format = 'YYYY-MM-DD HH:mm'
  const event = {
    id: row.id,
    title: row.eventName,
    calendarId: row.category,
    location: row.location,
    start: dayjs.utc(row.startTime).format(format),
    end: dayjs.utc(row.endTime).format(format),
    people: row.relatedUsers.values[0],
    detail: row
  }

  eventDialogRef.value.edit(event)
}
</script>

<template>
  <div style="height: 85vh">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <slot name="toolbar_buttons" />
        <div class="toolbar-container">
          <div class="filter-section">
            <el-form label-position="top" :inline="true">
              <el-formItem :label="t('Location')">
                <el-select v-model="form.location" clearable placeholder="Select" filterable @change="filterChange">
                  <el-option v-for="item in locationsOption" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-formItem>
              <el-formItem :label="t('Category')">
                <el-select v-model="form.category" clearable placeholder="Select" filterable @change="filterChange">
                  <el-option v-for="item in categoriesOption" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-formItem>
              <el-formItem :label="t('User')">
                <el-select v-model="form.user" clearable placeholder="Select" filterable @change="filterChange">
                  <el-option v-for="item in userFilterOptions" :key="item.value" :label="item.label"
                             :value="item.value" />
                </el-select>
              </el-formItem>
              <el-formItem :label="t('Date Range')">
                <el-date-picker v-model="form.dateRange" type="daterange" range-separator="To"
                                start-placeholder="Start date" end-placeholder="End date" @change="filterChange" />
              </el-formItem>
            </el-form>
          </div>
          <div class="button-section">
            <el-button size="large" type="primary" @click="createEvent">{{ $t('new Event') }}</el-button>
          </div>
        </div>
      </template>
    </VxeGrid>
  </div>

  <CalendarWidgetDialog ref="eventDialogRef" :options="setting" @reload="refresh" />
</template>

<style scoped lang="scss">
.toolbar-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
}

.filter-section {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.button-section {
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
}
</style>
