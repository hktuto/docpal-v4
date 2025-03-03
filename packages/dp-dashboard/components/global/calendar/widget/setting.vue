<script lang="ts" setup>
import type { CalendarOptions } from '#imports'
const opened = ref(false);

const emits = defineEmits(['submit','delete'])
const {setting} = defineProps<{
    setting?: any,
}>()
const form = ref<CalendarOptions>({
    editable: false,
    showLocationFilter: false,
    showUserFilter: false,
    showWorkflowFilter: false,
    showCategoryFilter: false,
    defaultUserFilter: [],
    defaultLocationFilter: [],
    defaultCategoryFilter: [],
})
const viewName = [
    'day','week','month-grid','month-agenda'
]
function open() {
    opened.value = true;
    Object.keys(setting).forEach(key => {
        console.log("open", key, setting[key])
        if(setting[key]) {
            form.value[key] = setting[key]
        }
    })

    // form.value = setting
}
function submit(){
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
    <ElRow>
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
        <ElCol :span="24">
            <ElDivider />
            <ElFormItem label="view">
                <ElSelect v-model="form.view" placeholder="Default View">
                    <ElOption v-for="item in viewName" :key="item" :label="item" :value="item"></ElOption>
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