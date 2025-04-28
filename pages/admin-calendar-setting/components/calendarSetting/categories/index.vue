<script lang="ts" setup>
import {adminApi} from 'api';

const {setting} = useCalendarStore();

const calendarProvider = inject(CalendarSettingKey);
const detailDialogRef = ref();
const categoriesColumn = useCategoriesColumn()


const {tableConfig, tableEvent, tableRef, reload} = useVxeTable({
  id: 'calendarSetting_categories',
  api: (params: any) => adminApi.api.postMasterTablesRecordPage({
    ...params,
    id: setting.value.category.master_table
  }),
  pageSize: 5,
  columns: categoriesColumn.value.map((item: any) => {
      if (['color', 'Container_Color', 'onContainer'].includes(item.columnName)) {
        return {
          field: item.columnName,
          title: item.columnName,
          type: 'html',
          formatter: ({cellValue}) => {
            return `
                        <div style="display:inline-block;border:1px solid black; margin-right:var(--app-space-xs);width:var(--app-space-m);height:var(--app-space-m);background-color: ${cellValue}"></div><span>${cellValue}</span>
                    `
          }
        }
      }
      return {
        field: item.columnName,
        title: item.columnName,
      }
    }
  ),
  bodyActions: [
    [{
      code: 'edit',
      name: 'common_edit',
      action: ({row}: any) => {
        detailDialogRef.value.open(row)
      },
    },
      {
        code: 'delete',
        name: "delete",
        action: async ({row}: any) => {
          await adminApi.api.deleteMasterTablesIdRecord(setting.value.category.master_table, {recordId: row.id}, {});
          reload();
        }
      }
    ]
  ]
})


function addRecord() {
  detailDialogRef.value.open()
}

</script>

<template>
  <div class="section category">
    <div class="title">{{ $t('calendarSetting.categories') }}</div>
    <ElForm label-position="top" @submit.stop="">
      <ElFormItem :label="$t('calendarSetting.location_masterTable')">
        <ElSelect v-model="setting.category.master_table" disabled></ElSelect>
      </ElFormItem>
    </ElForm>
    <div class="categoriesContainer" style="height: 450px">
      <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
          <ElButton id="CalendarSetting__EventLocations__EventCategories__Add" type="primary" @click="addRecord">
            {{ $t("Add") }}
          </ElButton>
        </template>
      </VxeGrid>
    </div>
    <CalendarSettingCategoriesDetailDialog ref="detailDialogRef" @submit="reload"/>
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

