<template>
  <div class="picture-upload">
    <div
      ref="uploadArea"
      class="upload-area"
      :class="{ 'has-image': hasImage, dragging: isDragging }"
      @click="handleClick"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <!-- Preview Image -->
      <div v-if="hasImage" class="image-preview" @click.stop>
        <el-image :src="imageUrl" alt="上传的图片" class="preview-image" :preview-src-list="[imageUrl]" fit="fill" :initial-index="0" preview-teleported />
        <div class="image-actions">
          <el-button type="danger" :icon="Delete" circle @click.stop="handleDelete" />
        </div>
      </div>
      <!-- Upload Content -->
      <div class="upload-content">
        <el-icon size="48" class="el-icon--upload"><upload-filled /></el-icon>
        <p class="upload-text">
          <span class="text-gray">{{$t('common_dragFileHere')}}，{{$t('common_or')}} </span>
          <span class="text-blue clickable">{{ $t('common_clickToUpload') }}</span>
        </p>
        <p class="upload-hint">{{$t('file.onlyAccept')}}  PNG, SVG</p>
      </div>
      <!-- Hidden File Input -->
      <input ref="fileInput" type="file" accept="image/png,image/svg+xml" class="hidden-input" @change="handleFileSelect" />
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled, Delete } from '@element-plus/icons-vue'
interface Props {
  modelValue?: File | null
  maxSize?: number // in MB
}

interface Emits {
  (e: 'update:modelValue', file: File | null): void
  (e: 'upload-success', file: File): void
  (e: 'upload-error', error: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  maxSize: 5 // 5MB default
})
const { t } = useI18n()
const emit = defineEmits<Emits>()

// Reactive data
const imageUrl = ref<string>('')
const hasImage = ref(false)
const isDragging = ref(false)
const errorMessage = ref('')

// Template refs
const uploadArea = ref<HTMLDivElement>()
const fileInput = ref<HTMLInputElement>()

// Computed
const maxSizeBytes = computed(() => props.maxSize * 1024 * 1024)

// Methods
const validateFile = (file: File): boolean => {
  // Check file type
  const allowedTypes = ['image/png', 'image/svg+xml']
  if (!allowedTypes.includes(file.type)) {
    errorMessage.value = `${t('file.onlyAccept')}  PNG, SVG`
    return false
  }

  // Check file size
  if (file.size > maxSizeBytes.value && props.maxSize > 0) {
    errorMessage.value = `${t('render.hint.fileSizeExceed')} ${props.maxSize}MB`
    return false
  }

  errorMessage.value = ''
  return true
}

const processFile = (file: File, isUpload = true) => {
  if (!validateFile(file)) {
    emit('upload-error', errorMessage.value)
    return
  }

  // Create preview URL
  const url = URL.createObjectURL(file)
  imageUrl.value = url
  hasImage.value = true
  if (isUpload) {
    // Emit events
    emit('update:modelValue', file)
    emit('upload-success', file)
  }
}

const handleClick = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    processFile(file)
  }

  // Reset input value to allow selecting the same file again
  target.value = ''
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false

  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const file = files[0]
    processFile(file)
  }
}

const handleReplace = () => {
  fileInput.value?.click()
}

const handleDelete = () => {
  // Clean up preview URL
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
  }

  imageUrl.value = ''
  hasImage.value = false
  errorMessage.value = ''

  emit('update:modelValue', null)
}

// Watch for external modelValue changes
watch(
  () => props.modelValue,
  (newFile) => {
    if (newFile) {
      processFile(newFile, false)
    } else {
      handleDelete()
    }
  },
  { immediate: true }
)

// Cleanup on unmount
onUnmounted(() => {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
  }
})
</script>

<style scoped>
.picture-upload {
  width: 100%;
}

.upload-area {
  position: relative;
  width: 100%;
  min-height: 200px;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.upload-area.has-image {
  min-height: 300px;
  border-style: solid;
  border-color: #e5e7eb;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

.upload-area.dragging {
  border-color: #3b82f6;
  background-color: #eff6ff;
  transform: scale(1.02);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  position: relative;
  z-index: 1;
}

.upload-text {
  line-height: 1.5;
  text-align: center;
  margin: 0;
}

.text-gray {
  color: #6b7280;
}

.text-blue {
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;
}

.clickable:hover {
  color: #2563eb;
}

.upload-hint {
  font-size: 0.8rem;
  color: #9ca3af;
  margin: 0;
}

.image-preview {
  position: relative;
  width: 80%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9fafb;
}
.image-actions {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 8px;
  z-index: 10;
}
.preview-image {
  height: 100%;
  overflow: hidden;
}
.hidden-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.error-message {
  margin-top: 8px;
  font-size: 12px;
  color: #ef4444;
  text-align: center;
}
</style>
