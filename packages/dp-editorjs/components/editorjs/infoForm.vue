<script setup lang="ts">
const formEl = ref()
const props = defineProps<{
    data: any;
}>();
const {t} = useI18n()
const rules = {
    label: [
        {
            required: true,
            message: t('easyForm.EmailTemplateKey') + t('render.hint.fieldRequired'),
            trigger: 'blur'
        },
    ],
    subject: [
        {
            required: true,
            message: t('tableHeader_subject') + t('render.hint.fieldRequired'),
            trigger: 'blur'
        },
    ],
};

function validate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        formEl.value.validate((valid: boolean) => {
            if (valid) {
                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}

defineExpose({
    validate,
})
</script>

<template>
    <div class="infoFormContainer">
        <ElForm ref="formEl" :model="data" class="form" label-position="top" :rules="rules">
            <ElFormItem :label="t('easyForm.EmailTemplateKey')" required prop="label">
                <ElInput v-model="data.label" clearable></ElInput>
            </ElFormItem>
            <ElFormItem :label="t('tableHeader_subject')" required prop="subject">
                <ElInput v-model="data.subject" clearable></ElInput>
            </ElFormItem>
        </ElForm>

    </div>
</template>

<style scoped lang="scss">

</style>