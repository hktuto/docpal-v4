<template>
  <div class="formContainer">
    <ElForm :model="form" @submit.native.prevent="submit" label-position="top">
      <ElFormItem :label="$t('admin_watermarkName')">
        <el-input v-model="form.name" :placeholder="t('admin_watermarkName')" />
      </ElFormItem>
    </ElForm>
    <ElButton style="text-align: end;" id="WatermarkSetting__Update" class="button" type="primary" @click="submit">
      {{ $t('common_submit') }}
    </ElButton>
  </div>
</template>

<script lang="ts" setup>
import type { WatermarkTemplate, WatermarkTemplateDetail } from '../../composables/Watermark'
import { ElMessage } from 'element-plus'
const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
  item: WatermarkTemplateDetail
  list: WatermarkTemplate[]
}>()
const emit = defineEmits(['submit'])
const { t } = useI18n()
const form = ref<WatermarkTemplateDetail>({ ...props.item })

const { updateWatermarkTemplateDetail } = useWatermark()

async function submit() {
  if (!form.value.name) {
    // TODO : show error
    return
  }
  if (form.value.name === props.item.name) {
    routerProvider?.message.success(t('tip_updateSuccessMsg', { modelName: t('watermark.watermark'), name: null }))
    // emit('submit', form.value)
    console.log('form.value', form.value)
    return
  }
  if (props.list.findIndex((item) => item.name === form.value.name) !== -1) {
    routerProvider?.message.error(t('admin_watermark_name_already_exist') as string)
    return
  }
  await updateWatermarkTemplateDetail(form.value)
  routerProvider?.message.success(t('tip_updateSuccessMsg', { modelName: t('watermark.watermark'), name: null }))
  emit('submit', form.value.id)
}
</script>
