<script setup lang="ts">
import { adminApi } from 'api';
import { ElFormItem, ElSwitch } from 'element-plus';
import { useDebounceFn } from '@vueuse/core'

const { setting, getCalendarsSetting } = useCalendarStore();
const loading = ref(false);

const categoryMasterTable = ref()


const saveSetting = useDebounceFn( async() => {
    await adminApi.api.postCalendarsSetting(setting.value);
}, 500)


onActivated(() => {
    getCalendarsSetting()
})

</script>

<template>
    <div class="pageContainer" v-loading="loading">
        <template v-if="setting">
            <div class="section basic">
                <div class="title">{{  $t('calendarSetting.basic') }}</div>
                <ElForm label-position="top" @submit.stop="">
                    <ElFormItem :label="$t('calendarSetting.view')">
                        <ElSelect v-model="setting.basic.default_view" @change="saveSetting">
                            <ElOption v-for="option in calendarViewOptions" :key="option" :label="$t(`calendarSetting.viewOption.${option}`)" :value="option" />
                        </ElSelect>
                    </ElFormItem>
                    <ElFormItem :label="$t('calendarSetting.firstOfWeek')">
                        <ElSelect v-model="setting.basic.default_first_week" @change="saveSetting">
                            <ElOption v-for="option in weekDayOptions" :key="option" :label="$t(`calendarSetting.weekOption.${option}`)" :value="option" />
                        </ElSelect>
                    </ElFormItem>
                    <ElFormItem :label="$t('calendarSetting.defaultSolt')">
                        <ElInput v-model="setting.basic.default_slot" type="number" min="0" :step="1" @change="saveSetting" >
                            <template #suffix>
                                {{  $t('time.minute') }}
                            </template>
                        </ElInput>
                    </ElFormItem>
                    <ElFormItem 
                        :label="$t('calendarSetting.allowCustomSlot')"
                    >
                        <ElSwitch v-model="setting.basic.allow_custom_slot" @change="saveSetting"/>
                    </ElFormItem>
                </ElForm>
            </div>
            <div class="section location">
                <div class="title">{{  $t('calendarSetting.location') }}</div>
                <ElForm label-position="top" @submit.stop="">
                    <ElFormItem :label="$t('calendarSetting.location_masterTable')">
                        <ElSelect v-model="setting.location.master_table" @change="saveSetting" disabled>

                        </ElSelect>
                    </ElFormItem>
                    <ElFormItem :label="$t('calendarSetting.allowCustom')">
                        <ElSwitch v-model="setting.location.allow_custom" @change="saveSetting"/>
                    </ElFormItem>
                    <ElFormItem :label="$t('calendarSetting.allowEmpty')">
                        <ElSwitch v-model="setting.location.allow_empty" @change="saveSetting"/>
                    </ElFormItem>
                </ElForm>
            </div>
            <div class="section category">
                <div class="title">{{  $t('calendarSetting.location') }}</div>
                <ElForm label-position="top" @submit.stop="">
                    <ElFormItem :label="$t('calendarSetting.category_masterTable')">
                        <ElSelect v-model="setting.category.master_table" @change="saveSetting" disabled>

                        </ElSelect>
                    </ElFormItem>
                </ElForm>
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
    padding: var(--app-space-s);
    overflow: auto;
}
.section + .section{
    border-top: 1px solid var(--app-grey-800);
}
.section {
    width:100%;
    padding-block: var(--app-space-s);
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