<template>
  <div class="field-setting">
    <div class="field-setting-header">
      <h3 class="title">Fields</h3>
    </div>

    <div class="field-list">
      <div class="existing-fields">
        <el-tag v-for="field in existingFields" :key="field.value" :closable="!field.disabled" @close="handleClose(field)">
          {{ field.name }}
        </el-tag>
      </div>

      <el-button style="width: fit-content" type="default" :icon="Plus" @click="handleAddField">
        Add Field
      </el-button>
    </div>

    <!-- Add Field Dialog -->
    <FieldSettingDialog v-model="showAddDialog" @confirm="handleAddFieldConfirm" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import FieldSettingDialog from './fieldSettingDialog.vue'

interface Field {
  name: string
  value: string
}

// Reactive data
const showAddDialog = ref(false)

const existingFields = ref<Field[]>([
  { name: 'Name', value: 'name', disabled: true },
  { name: 'Email', value: 'email', disabled: true }
])

// Event handlers
function handleAddField() {
  showAddDialog.value = true
}

function handleAddFieldConfirm(field: Field) {
  // Add the new field to existing fields
  existingFields.value.push(field)
  console.log('New field added:', field)
}

function handleClose(field: Field) {
  console.log('Field clicked:', field)
  const index = existingFields.value.findIndex((item: Field) => item.value === field.value)
  if (index !== -1) {
    existingFields.value.splice(index, 1)
  }
  // Add your field click logic here
}
function getFieldData() {
  return existingFields.value.filter((item: Field) => !item.disabled)
}
defineExpose({ getFieldData })
</script>

<style lang="scss" scoped>
.field-setting {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.field-setting-header {
  margin-bottom: 16px;

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
