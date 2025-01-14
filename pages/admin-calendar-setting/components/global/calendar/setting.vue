<script setup lang="ts">
import { adminApi } from 'api';
const setting = ref();
const loading = ref(false);

const calendarViewOptions = [
    "MONTH",
    "WEEK",
    "DAY"
]

const weekDayOptions = [
    "MONDAY",
    "SUNDAY",
]

async function getSetting(){
    loading.value = true;
    const { data } = await adminApi.api.getCalendarsSetting();
    console.log("data", data);
    setting.value = data;

     // normalize data
     // setting data
     if(!calendarViewOptions.includes(setting.value.basic.default_view)) {
        setting.value.basic.default_view = "MONTH"
     }
     if(Number.isNaN(setting.value.basic.default_solt)) {
        setting.value.basic.default_solt = 0
     }
    loading.value = false;
}

onActivated(() => {
    getSetting()
})

</script>

<template>
    <div class="pageContainer">
        <template v-if="setting">
            <div class="section basic">
                <div class="title">{{  $t('calendarSetting.basic') }}</div>
                <ElForm label-position="top">
                    <ElFormItem :label="$t('calendarSetting.view')">
                        <ElSelect v-model="setting.basic.default_view">
                            <ElOption v-for="option in calendarViewOptions" :key="option" :label="$t(`calendarSetting.viewOption.${option}`)" :value="option" />
                        </ElSelect>
                    </ElFormItem>
                    <ElFormItem :label="$t('calendarSetting.firstOfWeek')">
                        <ElSelect v-model="setting.basic.default_first_week">
                            <ElOption v-for="option in weekDayOptions" :key="option" :label="$t(`calendarSetting.weekOption.${option}`)" :value="option" />
                        </ElSelect>
                    </ElFormItem>
                    <ElFormItem :label="$t('calendarSetting.defaultSolt')">
                        <ElInput v-model="setting.basic.default_solt" type="number" min="0" :step="1" />
                    </ElFormItem>
                </ElForm>
                
                <div class="formContainer"></div>
            </div>

        </template>
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    width:100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-space-s);
}
.section + .section{
    border-top: 1px solid var(--app-grey-800);
}
.section {
    width:100%;
    padding: var(--app-space-s);
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-space-xs);
    .title {
        font-size: var(--app-font-size-l);
        font-weight: bold;
        color: var(--app-grey-200);
    }
    :deep(.el-form){
        width: 100%;
    }
}
</style>