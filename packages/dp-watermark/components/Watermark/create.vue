<template>
  <div class="formContainer">
    <ElForm :model="form" @submit.native.prevent="submit">
      <ElFormItem :label="t('admin_watermarkName')">
        <ElInput v-model="form.name" :placeholder="t('admin_watermarkName')" />
      </ElFormItem>
    </ElForm>
    <div style="text-align: end;">
      <ElButton id="WatermarkSetting__CreateNewWatermark__Submit" class="button " type="primary" @click="submit">
        {{ t('submit') }}
      </ElButton>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ElMessage } from 'element-plus'
import { useWatermark, WatermarkTemplate } from '../../composables/Watermark'

const emits = defineEmits(['submit'])
const props = defineProps<{
  list: WatermarkTemplate[]
}>()
const { t } = useI18n()

const form = ref({
  name: ''
})
const { createWatermarkTemplate, list } = useWatermark()
const router = useRouter()

async function submit() {
  if (!form.value.name) {
    // TODO : show error
    return
  }
  // if form.name is in list return
  if (props.list.findIndex(item => item.name === form.value.name) !== -1) {
    routerProvider?.message.error(t('admin_watermark_name_already_exist') as string)
    return
  }
  const newItem = await createWatermarkTemplate(form.value)
  routerProvider?.message.success(t('tip_createdSuccessMsg', { modelName: t('watermark.watermark'), name: null }))
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
})

</script>

<style lang="scss">
.el-form-item__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  line-height: 32px;
  position: relative;
  font-size: var(--font-size);
  min-width: 0;
}
</style>