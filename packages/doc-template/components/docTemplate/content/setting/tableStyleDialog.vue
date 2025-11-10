<script setup lang="ts">
import { reactive, ref } from 'vue'

type BorderStyle = 'none' | 'solid' | 'dashed' | 'dotted' | 'double'

type TableCellStylePayload = string

interface TableCellStyleForm {
  backgroundColor: string
  borderStyle: BorderStyle
  borderWidth: number
  borderColor: string
}

const emit = defineEmits<{
  (event: 'apply', payload: TableCellStylePayload): void
}>()

const dialogVisible = ref(false)

const form = reactive<TableCellStyleForm>({
  backgroundColor: '#ffffff',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#d0d5dd'
})

const borderStyleOptions: Array<{ label: string; value: BorderStyle }> = [
  { label: 'None', value: 'none' },
  { label: 'Solid', value: 'solid' },
  { label: 'Dashed', value: 'dashed' },
  { label: 'Dotted', value: 'dotted' },
  { label: 'Double', value: 'double' }
]

function resetForm() {
  form.backgroundColor = '#ffffff'
  form.borderStyle = 'solid'
  form.borderWidth = 1
  form.borderColor = '#d0d5dd'
}

function applyInitialStyleFromPayload(payload: Record<string, string>) {
  const entries = Object.entries(payload)
  if (!entries.length) {
    return
  }

  applyInitialStyleFromString(
    entries
      .map(([property, value]) => `${property}: ${value}`)
      .join('; ')
  )
}

function assignBorderValues(border: string) {
  const trimmedBorder = border.trim()
  if (!trimmedBorder || trimmedBorder === 'none') {
    form.borderStyle = 'none'
    return
  }

  const parts = trimmedBorder.split(/\s+/)
  if (parts.length >= 3) {
    const widthPart = parts[0]
    const stylePart = parts[1] as BorderStyle
    const colorPart = parts.slice(2).join(' ')

    const widthValue = Number.parseFloat(widthPart)

    if (!Number.isNaN(widthValue)) {
      form.borderWidth = widthValue
    }

    if (['solid', 'dashed', 'dotted', 'double', 'none'].includes(stylePart)) {
      form.borderStyle = stylePart
    }

    if (colorPart) {
      form.borderColor = colorPart
    }
    return
  }

  form.borderStyle = 'solid'
}

function applyInitialStyleFromString(style: string) {
  const styleRules = style.split(';').map(rule => rule.trim()).filter(Boolean)

  styleRules.forEach(rule => {
    const [property, value] = rule.split(':').map(item => item.trim())
    if (!property || !value) {
      return
    }
    switch (property.toLowerCase()) {
      case 'background-color':
        form.backgroundColor = value
        break
      case 'border':
        assignBorderValues(value)
        break
      case 'border-color':
        form.borderColor = value
        break
      default:
        break
    }
  })
}

type OpenPayload = string | Record<string, string> | undefined

function open(initialStyle?: OpenPayload) {
  resetForm()
  if (typeof initialStyle === 'string') {
    applyInitialStyleFromString(initialStyle)
  }
  if (initialStyle && typeof initialStyle === 'object') {
    applyInitialStyleFromPayload(initialStyle)
  }
  dialogVisible.value = true
}

function close() {
  dialogVisible.value = false
}

function buildPayload(): TableCellStylePayload {
  const border =
    form.borderStyle === 'none'
      ? 'none'
      : `${form.borderWidth}px ${form.borderStyle} ${form.borderColor}`

  const styles: string[] = []

  styles.push(`background-color: ${form.backgroundColor}`)
  styles.push(`border: ${border}`)
  styles.push(`border-color: ${form.borderStyle === 'none' ? 'transparent' : form.borderColor}`)

  return `${styles.join('; ')};`
}

function handleApply() {
  const payload = buildPayload()
  emit('apply', payload)
  close()
}

function handleCancel() {
  close()
}

defineExpose({ open, close })
</script>

<template>
  <ElDialog v-model="dialogVisible" title="Table Style" width="360px" @close="handleCancel">
    <ElForm label-position="top" class="table-style-form">
      <ElFormItem label="Background Color">
        <ElColorPicker v-model="form.backgroundColor" show-alpha />
      </ElFormItem>

      <ElFormItem label="Border Style">
        <ElSelect v-model="form.borderStyle">
          <ElOption
            v-for="option in borderStyleOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem v-if="form.borderStyle !== 'none'" label="Border Width (px)">
        <ElInputNumber v-model="form.borderWidth" :min="0" :max="12" />
      </ElFormItem>

      <ElFormItem v-if="form.borderStyle !== 'none'" label="Border Color">
        <ElColorPicker v-model="form.borderColor" show-alpha />
      </ElFormItem>
    </ElForm>

    <template #footer>
      <ElButton @click="handleCancel">
        Cancel
      </ElButton>
      <ElButton type="primary" @click="handleApply">
        Apply
      </ElButton>
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">
.table-style-form {
  .el-form-item {
    margin-bottom: 16px;
  }
}
</style>
