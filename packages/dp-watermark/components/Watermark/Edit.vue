<template>
  <div class="formContainer">
    <ElForm :model="form" @submit.native.prevent="submit" label-position="top">
      <ElFormItem label="label">
        <el-input v-model="form.name" :placeholder="t('admin_watermarkName')"/>
      </ElFormItem>
      <ElFormItem>
        <ElButton id="WatermarkSetting__Update" class="button" type="primary" @click="submit">
          {{ $t('watermarkSetting_updateWatermark') }}
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script lang="ts" setup>
import {WatermarkTemplate, WatermarkTemplateDetail} from "../../composables/Watermark";
import {ElMessage} from 'element-plus';

const props = defineProps<{
  item: WatermarkTemplateDetail,
  list: WatermarkTemplate[]
}>();
const emit = defineEmits(['submit']);
const {t} = useI18n()
const form = ref<WatermarkTemplateDetail>({...props.item})

const {updateWatermarkTemplateDetail} = useWatermark()

async function submit() {
  if (!form.value.name) {
    // TODO : show error
    return;
  }

  if (props.list.findIndex(item => item.name === form.value.name) !== -1) {
    ElMessage.error(t('admin_watermark_name_already_exist') as string);
    return;
  }
  await updateWatermarkTemplateDetail(form.value);
  ElMessage.success(t('tip_updateSuccessMsg', {modelName: t('watermark.watermark'), name: ""}))
  emit('submit', form.value)
}
</script>

