<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
const props = defineProps(['variables', 'inputRef'])
const emits = defineEmits(['click'])
function handleClick(row) {
  console.log(props.inputRef);
  console.log(row)
}
</script>
<template>
<el-button v-for="item in variables" :icon="Plus" @click="handleClick(item)"> {{item.label}} </el-button>
</template>
<style lang="scss" scoped>
</style>
