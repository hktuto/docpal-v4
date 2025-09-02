<script lang="ts" setup>
import { adminApi } from 'api'

const { setting } = useCalendarStore()

const calendarProvider = inject(CalendarSettingKey)
const detailDialogRef = ref()

const { tableConfig, tableEvent, tableRef, reload } = useVxeTable({
  id: 'calendarSetting_categories',
  api: async (params: any) => await adminApi.api.getEventCalendarsSettings({ eventCalendarSetting: {} }).then(r => r.data),
  virtualScroll: true,
  pageSize: 5,
  columns: [
    {
      field: 'name',
      title: 'Name'
    }
  ],
  bodyActions: [
    [{
      code: 'edit',
      name: 'common_edit',
      action: ({ row }: any) => {
        detailDialogRef.value.open(row)
      }
    },
      {
        code: 'delete',
        name: 'delete',
        action: async ({ row }: any) => {
          await adminApi.api.deleteMasterTablesIdRecord(setting.value.category.master_table, { recordId: row.id }, {})
          reload()
        }
      }
    ]
  ],
  dblClickAction: ({ row, column, event }: any) => {
    detailDialogRef.value.open(row)
  }
})

function addRecord() {
  detailDialogRef.value.open()
}

</script>

<template>
  <div class="section category">
    <div class="title">{{ $t('calendarSetting.categories') }}</div>
    <div class="categoriesContainer" style="height: 450px">
      <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
          <ElButton id="CalendarSetting__EventLocations__EventCategories__Add" type="primary" @click="addRecord">
            {{ $t('Add') }}
          </ElButton>
        </template>
      </VxeGrid>
    </div>
    <CalendarSettingCategoriesDetailDialog ref="detailDialogRef" @submit="reload" />
  </div>
</template>

<style lang="scss" scoped>
.category {
  width: 100%;
}

.categoriesContainer {
  width: 100%;
  height: 300px;
}
</style>

