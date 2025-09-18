<template>
  <div class="field-setting">
    <div class="field-setting-header">
      <h3 class="title">Fields</h3>
    </div>

    <div class="field-list">
      <div class="existing-fields">
        <el-tag v-for="field in existingFields" :key="field.value" :closable="!field.disabled && mode !== 'edit'" @close="handleClose(field)">
          {{ field.name }}
        </el-tag>
      </div>

      <el-button style="width: fit-content" type="default" :icon="Plus" :disabled="loading" @click="handleAddField"> Add Field </el-button>
    </div>

    <!-- Add Field Dialog -->
    <FieldSettingDialog v-model="showAddDialog" @confirm="handleAddFieldConfirm" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import FieldSettingDialog from './fieldSettingDialog.vue'
import { adminApi } from 'api'
const props = defineProps<{
  mode: 'edit' | 'create'
  id: string
}>()

interface Field {
  name: string
  value: string
}
const emits = defineEmits(['refresh'])
// Reactive data
const showAddDialog = ref(false)
const loading = ref(false)

const existingFields = ref<Field[]>([
  { name: 'Name', value: 'name', disabled: true },
  { name: 'Email', value: 'email', disabled: true }
])

// Event handlers
function handleAddField() {
  showAddDialog.value = true
}

async function handleAddFieldConfirm(field: Field) {
  if (props.mode === 'edit') {
    try {
      loading.value = true
      await adminApi.api.postContactgroupIdNewfields(props.id, field)
    } catch (error) {
      return
    } finally {
      loading.value = false
      emits('refresh')
    }
  }
  // Add the new field to existing fields
  existingFields.value.push(field)
  console.log(props.mode,'New field added:', field)
}

function handleClose(field: Field) {
  const index = existingFields.value.findIndex((item: Field) => item.value === field.value)
  if (index !== -1) {
    existingFields.value.splice(index, 1)
  }
  // Add your field click logic here
}
function getFieldData() {
  return existingFields.value.filter((item: Field) => !item.disabled)
}
function setFieldData(fields: Field[]) {
  existingFields.value = fields
}
defineExpose({ getFieldData, setFieldData })
</script>

<style lang="scss" scoped>
.field-setting {
  background: white;
  border-radius: 8px;
}

.field-setting-header {
  margin-bottom: var(--app-space-s);

  .title {
    margin: 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }
}

.field-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.existing-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.field-button {
  background-color: #e8f4ff;
  border-color: #e8f4ff;
  color: #409eff;
  font-weight: 500;
  border-radius: 6px;
  padding: 8px 16px;
  height: auto;

  &:hover {
    background-color: #d4edff;
    border-color: #d4edff;
  }
}
</style>
