<script lang="ts" setup>
import type { CalendarOptions } from '#imports'
import {clientApi} from 'api';
const opened = ref(false);

const emits = defineEmits(['submit','delete'])
const {setting} = defineProps<{
    setting?: any,
}>()
const { setting: calendarSetting, categoriesOption, locationsOption, calendarViewOptions, weekDayOptions } = useCalendarStore();
const userFiterOptions = ref([])
async function getOptions() {
    const user = await clientApi.api.postNuxeoIdentityUsers({}).then(res => res.data)
    userFiterOptions.value = user.map(item => {
        return {
            label: item.username,
            value: item.userId
        }
    })
}
const form = ref<CalendarOptions>({
    editable: false,
    showLocationFilter: false,
    showUserFilter: false,
    showWorkflowFilter: false,
    showCategoryFilter: false,
    defaultUser: "",
    defaultLocation: "",
    defaultCategory: "",
    locationLabel:"",
    categoryLabel: "",
    categoryLabel: "",
    userFilterGroup: "",
    view: "",
    firstDayOfWeek: "",
})

function open() {
    opened.value = true;
    getOptions()
    console.log("open", setting)
    Object.keys(setting).forEach(key => {
        console.log("open", key, setting[key])
        if(setting[key]) {
            form.value[key] = setting[key]
        }
    })
    console.log("form", form.value, calendarSetting.value.basic.default_view)
    if(!form.value.view) {
        form.value.view = calendarSetting.value?.basic.default_view
    }
    if(!form.value.firstDayOfWeek) {
        form.value.firstDayOfWeek = calendarSetting.value?.basic.default_first_week
    }

    // form.value = setting
}
function submit(){
    console.log("submit", form.value)
    emits('submit', form.value)
    opened.value = false
}

defineExpose({
  open
})

</script>

<template>
 <ElDialog v-model="opened" append-to-body>
    <ElForm :model="form" label-position="top" @submit.stop="" show-close>
    <ElRow :gutter="12">
        <ElCol :span="12">
            <ElFormItem label="Editable">
                <ElSwitch v-model="form.editable"></ElSwitch>
            </ElFormItem>
        </ElCol>
        <ElCol :span="12">
            <ElFormItem label="Allow Create New Event">
                <ElSwitch v-model="form.allowCreate"></ElSwitch>
            </ElFormItem>
        </ElCol>
        <ElCol :span="12">
            <ElFormItem label="Show Location Filter">
                <ElSwitch v-model="form.showLocationFilter"></ElSwitch>
            </ElFormItem>
        </ElCol>
        <ElCol :span="12">
            <ElFormItem label="Show Workflow Filter">
                <ElSwitch v-model="form.showWorkflowFilter"></ElSwitch>
            </ElFormItem>
        </ElCol>
        <ElCol :span="12">
            <ElFormItem label="Show User Filter">
                <ElSwitch v-model="form.showUserFilter"></ElSwitch>
            </ElFormItem>
        </ElCol>
        <ElCol :span="12">
            <ElFormItem label="Show Category Filter">
                <ElSwitch v-model="form.showCategoryFilter"></ElSwitch>
            </ElFormItem>
        </ElCol>
        <ElDivider />
        <ElCol :span="12">
            <ElFormItem label="view">
                <ElSelect v-model="form.view" placeholder="Default View" clearable>
                    <ElOption v-for="item in calendarViewOptions" :key="item" :label="item" :value="item"></ElOption>
                </ElSelect>
            </ElFormItem>
        </ElCol>
        <ElCol :span="12">
            <ElFormItem label="view">
                <ElSelect v-model="form.firstDayOfWeek" placeholder="First Day of Week" clearable>
                    <ElOption v-for="item in weekDayOptions" :key="item" :label="item" :value="item"></ElOption>
                </ElSelect>
            </ElFormItem>
        </ElCol>
        <ElDivider />
        <ElCol :span="12">
            <ElFormItem label="Default User">
                <ElSelect v-model="form.defaultUser" clearable placeholder="Default User">
                    <ElOption v-for="item in userFiterOptions" :key="item.value" :label="item.label" :value="item.value"></ElOption>
                </ElSelect>
            </ElFormItem>
        </ElCol>
        <ElCol :span="12">
            <ElFormItem label="Default Location">
                <ElSelect v-model="form.defaultLocation" clearable placeholder="Default Location">
                    <ElOption v-for="item in locationsOption" :key="item.id" :label="item.name" :value="item.id"></ElOption>
                </ElSelect>
            </ElFormItem>
        </ElCol>
        <ElCol :span="12">
            <ElFormItem label="Default Category">
                <ElSelect v-model="form.defaultCategory" clearable placeholder="Default Category">
                    <ElOption v-for="item in categoriesOption" :key="item.id" :label="item.name" :value="item.id"></ElOption>
                </ElSelect>
            </ElFormItem>
        </ElCol>
    </ElRow>
    </ElForm>
    <template #footer>
        <ElButton @click="opened = false">{{ $t("Cancel") }}</ElButton>
        <ElButton type="error" @click="$emit('delete')">{{$t('Delete')}}</ElButton>
        <ElButton type="primary" @click="submit">{{ $t("common_submit") }}</ElButton>
    </template>
</ElDialog>
</template>