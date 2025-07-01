<template>
  <div class="switch-row">
    <div class="switch-label">
      <div class="label">{{ label }}</div>
      <div class="description" v-if="description">{{ description }}</div>
    </div>
    <el-switch v-model="localValue" :disabled="disabled" @change="emitChange" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  label: String,
  value: Boolean,
  description: String,
  disabled: Boolean
})

const emit = defineEmits(['update:value', 'change'])

const localValue = ref(props.value)

watch(() => props.value, (val) => {
  localValue.value = val
})

function emitChange(val) {
  emit('update:value', val)
  emit('change', val)
}
</script>

<style scoped>
.switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.switch-label {
  flex: 1;
}
.label {
  font-weight: bold;
}
.description {
  font-size: 12px;
  color: #888;
}
</style>
