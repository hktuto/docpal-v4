<template>
  <WatermarkUiProperties @delete="$emit('delete')">
    <el-form label-position="top">
      <ElUpload :limit="1" :auto-upload="false" action="#" :on-change="fileChange" accept="image/jpeg, image/png"
                :show-file-list="false">
        <ElButton size="small" type="primary">{{ $t('admin_watermark_replace') }}</ElButton>
        <template #tip>
          <div class="el-upload__tip">{{ $t('admin_watermark_upload_limit') }}</div>
        </template>
      </ElUpload>
      <el-form-item :label="$t('admin_watermark_rotate')">
        <ElInputNumber v-model="modelValue.angle" :min="0" :max="360" size="small" @change="$emit('change')" />
      </el-form-item>
      <el-form-item :label="$t('admin_watermark_opacity')">
        <ElInputNumber v-model="modelValue.opacity" size="small" :min="0.1" :max="1" :step="0.1"
                       @change="$emit('change')" />
      </el-form-item>

      <WatermarkAnchor v-model="modelValue.position" @change="(val) => {$emit('anchorChange', val);}" />
    </el-form>
  </WatermarkUiProperties>
</template>

<script lang="ts" setup>
import { useWatermark, type WatermarkTemplateDetail } from '../../composables/Watermark'
import { ElMessage } from 'element-plus'
const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
  modelValue: any
}>()

const emit = defineEmits(['update:modelValue', 'change', 'delete', 'anchorChange'])

function fileChange(e) {
  const file = e.raw
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  // check size is below 2MB
  const isSizeLt2MB = file.size / 1024 / 1024 / 1024 < 2
  // const isLt100k = file.size / 1024 / 1024 < 0.1;

  if (!isJPG) {
    routerProvider?.message.error('Image must be JPG or PNG format!')
  }
  if (!isSizeLt2MB) {
    routerProvider?.message.error('Image size can not exceed 2MB!')
  }
  if (!isJPG || !isSizeLt2MB) return
  const ob: any = props.modelValue
  const imgEL = new Image()

  imgEL.onload = (ev) => {
    ob.width = imgEL.width
    ob.height = imgEL.height
    ob.scaleX = imgEL.width > 300 ? 300 / imgEL.width : 1
    ob.scaleY = imgEL.width > 300 ? 300 / imgEL.width : 1

    ob.setSrc(imgEL.src)
    emit('change', ob)
  }
  imgEL.src = URL.createObjectURL(e.raw)
}
</script>


<style scoped lang="scss">

.el-upload {
  .el-button {
    width: 100%;
  }
}

.el-upload__tip {
  font-size: 0.8rem;
  line-height: 1.2;
}

</style>
