<template>
  <div class="checkbox-group-container">
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
      {{ checkAllLabel }}
    </el-checkbox>
    <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
      <el-checkbox v-for="option in options" :key="option.value" :label="option.value">
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Option {
  label: string
  value: string | number
}

const checkAll = defineModel<boolean>('checkAll', { required: true })

const props = defineProps<{
  options: Option[]
  checkAllLabel: string
  modelValue: (string | number)[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[]): void,
  (e: 'change', value: boolean): void
}>()

const isIndeterminate = ref(false)
const checkedList = ref<(string | number)[]>(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    checkedList.value = newVal
    updateCheckAllState()
  }
)

function handleCheckAllChange(val: boolean) {
  console.log(val, 'handleCheckAllChange')
  checkedList.value = val ? props.options.map((option) => option.value) : []
  isIndeterminate.value = false
  emit('update:modelValue', checkedList.value)
  emit('change', val)
}
function handleCheckAllChange2(val: boolean) {
  checkedList.value = checkedList.value.length > 0 ? checkedList.value : props.options.map((option) => option.value)
  emit('update:modelValue', checkedList.value)
}
function handleCheckedChange(value: (string | number)[]) {
  const checkedCount = value.length
  checkAll.value = checkedCount === props.options.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.options.length
  emit('update:modelValue', value)
}

function updateCheckAllState() {
  const checkedCount = checkedList.value.length
  checkAll.value = checkedCount === props.options.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.options.length
}
defineExpose({
  handleCheckAllChange2
})
</script>

<style scoped>
.checkbox-group-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
