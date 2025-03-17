<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
const props = defineProps(['variables', 'inputRef'])
const emits = defineEmits(['click'])
function handleClick(row) {
  const inputRef = props.inputRef
  const startPos = inputRef.selectionStart;
  const endPos = inputRef.selectionEnd;
  inputRef.value = inputRef.value.substring(0, startPos) + row.value + inputRef.value.substring(endPos);
  // 更新光标位置
  inputRef.selectionStart = inputRef.selectionEnd = startPos + row.value.length;
  inputRef.focus();
  emits('change', inputRef.value)
}
</script>
<template>
<el-button v-for="item in variables" :icon="Plus" @click="handleClick(item)"> {{item.label}} </el-button>
</template>
<style lang="scss" scoped>
</style>
