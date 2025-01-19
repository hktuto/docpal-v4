<template>
  <el-form label-position="top" @submit.prevent>
    <el-formItem :label="$t(`cmmn.isStartTask`)">
      <el-switch v-model="message" @change="handleChange" />
    </el-formItem>
  </el-form>
</template>
<script lang="ts" setup>
const props = defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue", 'change']);
function handleChange() {
  emits('change')
}
const message = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});
</script>
<style lang="scss" scoped>
.el-form {
  display: flex;
}
</style>
