

<script lang="ts" setup>

const { setting } = useCalendarStore();

const calendarProvider = inject(CalendarSettingKey);



</script>


<template>
<div class="section category">
    <div class="title">{{  $t('calendarSetting.categories') }}</div>
    <ElForm label-position="top" @submit.stop="">
        <ElFormItem :label="$t('calendarSetting.location_masterTable')">
            <ElSelect v-model="setting.category.master_table" @change="saveSetting" disabled></ElSelect>
        </ElFormItem>
    </ElForm>
</div>
</template>

