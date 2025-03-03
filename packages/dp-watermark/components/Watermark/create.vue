<template>
    <div class="formContainer">
        <ElForm :model="form" @submit.native.prevent="submit">
            <ElFormItem :label="t('admin_watermarkName')">
                <ElInput v-model="form.name" placeholder="New Watermark label"/>
            </ElFormItem>
<!--            <ElFormItem style="display: flex; justify-content: center;">-->
<!--                <ElButton class="button " type="primary" @click="submit">{{ t('submit') }}</ElButton>-->
<!--            </ElFormItem>-->
        </ElForm>
    </div>
</template>

<script lang="ts" setup>

import {ElMessage} from 'element-plus';
import {useWatermark, WatermarkTemplate} from '../../composables/Watermark'

const emits = defineEmits(['submit'])
const props = defineProps<{
    list: WatermarkTemplate[]
}>()
const {t} = useI18n()

const form = ref({
    name: ''
})
const {createWatermarkTemplate, list} = useWatermark()
const router = useRouter();

async function submit() {
    if (!form.value.name) {
        // TODO : show error
        return;
    }
    // if form.name is in list return
    if (props.list.findIndex(item => item.name === form.value.name) !== -1) {
        ElMessage.error(t('admin_watermark_name_already_exist') as string);
        return;
    }
    const newItem = await createWatermarkTemplate(form.value);
    emits('submit', form.value)
    router.push({
        path: '/watermark',
        query: {
            id: newItem.id
        }
    })
    // const { data } = await this.$axios.post('/api/watermark', this.form)

}

onMounted(() => {
    form.value = {
        name: ''
    }
});

</script>

<style lang="scss" scoped>

</style>