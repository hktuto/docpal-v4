<script lang="ts" setup>
const opened = ref(false);

const emits = defineEmits(['submit','delete'])
const {setting} = defineProps<{
    setting?: any,
}>()
const form = ref({
    editable: false
})
function open() {
    opened.value = true;
    console.log("open", setting)
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
        <ElFormItem label="editable">
            <ElSwitch v-model="form.editable"></ElSwitch>
        </ElFormItem>
    </ElForm>
    <template #footer>
        <ElButton @click="opened = false">{{ $t("Cancel") }}</ElButton>
        <ElButton type="error" @click="$emit('delete')">{{$t('Delete')}}</ElButton>
        <ElButton type="primary" @click="submit">{{ $t("common_submit") }}</ElButton>
    </template>
</ElDialog>
</template>