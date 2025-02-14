

<script lang="ts" setup>
import { adminApi } from 'api';
const { setting, categoriesColumn } = useCalendarStore();

const calendarProvider = inject(CalendarSettingKey);

const { tableConfig, tableEvent, tableRef, reload, query } = useVxeTable({
    id: 'calendarSetting_categories',
    api: (params:any) => adminApi.api.getMasterTablesId(setting.value.category.master_table),
    height: "400px",
    columns: categoriesColumn.value.map((item: any) => {
        return {
            field: item.columnName,
            title: item.columnName,
        }}
    )
})

function addRecord(){

}

</script>


<template>
<div class="section category">
    <div class="title">{{  $t('calendarSetting.categories') }}</div>
    <ElForm label-position="top" @submit.stop="">
        <ElFormItem :label="$t('calendarSetting.location_masterTable')">
            <ElSelect v-model="setting.category.master_table"  disabled></ElSelect>
        </ElFormItem>
    </ElForm>
    <div class="table">
        <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
            <template #toolbar_buttons>
                <ElButton type="primary" @click="addRecord">{{ $t("Add") }}</ElButton>
            </template>
        </VxeGrid>
    </div>
</div>
</template>

<style lang="scss" scoped>
.table{
    width: 100%;
}
</style>

