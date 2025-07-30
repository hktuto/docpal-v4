<template>
  <div class="permission-container">
    <h3 class="section-title">{{ $t(`permission.${permissionType}`) }}</h3>
    <div class="rules-list">
      <div v-if="modelValue && modelValue.length > 0" class="rule-item">
        <div v-for="(rule, index) in modelValue" :key="index" class="rule-content">
          <span class="rule-text">{{ rule.name }}</span>
          <el-button :icon="Edit" class="edit-button" title="Edit rule" @click="handleEdit(rule, index)"> </el-button>
        </div>
      </div>
    </div>
    <el-button link class="add-rule-button" @click="handleOpen">Add Rule</el-button>
    <DocTypePermissionRuleDialog ref="ruleDialogRef" @add="handleAdd" @remove="handleRemove" @update="handleUpdate" />
  </div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
interface Rule {
  name: string
  [key: string]: any
}

interface Props {
  modelValue: Rule[]
  permissionType: string
}

interface Emits {
  (e: 'update:modelValue', value: Rule[]): void
  (e: 'update', rule: Rule, index: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const ruleDialogRef = ref()
const handleOpen = () => {
  ruleDialogRef.value.handleOpen()
}

function handleAdd(data: any) {
  console.log(data)
  const newList = [...props.modelValue, data]
  console.log(newList)
  emit('update:modelValue', newList)
}
function handleUpdate(data: any, index: number) {
  const newList = [...props.modelValue]
  newList[index] = data
  emit('update:modelValue', newList)
}
function handleRemove(index: number) {
  const newList = [...props.modelValue]
  newList.splice(index, 1)
  emit('update:modelValue', newList)
}

const handleEdit = (rule: Rule, index: number) => {
  ruleDialogRef.value.handleOpen(rule, index)
}
</script>

<style scoped>
.permission-container {
  width: 100%;
  height: 30rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  min-height: 200px;
  display: grid;
  grid-template-rows: min-content 1fr;
}

.permission-section {
}

.section-title {
  color: #333;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.rules-list {
  overflow-y: auto;
}

.rule-content {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  background-color: #e8f5e8;
  border-radius: 6px;
  padding: 8px 12px;
  position: relative;
}

.rule-content::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 20px;
  background-color: #d0d0d0;
}

.rule-text {
  flex: 1;
  color: #333;
  font-size: 14px;
}

.add-rule-button {
  position: sticky;
  bottom: 0px;
  width: auto-fit;
}

</style>
