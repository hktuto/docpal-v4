<template>
  <el-form v-if="filterList.length > 0"
    label-position="top"
    ref="FormRef"
    :model="form"
    @submit.native.prevent
  >
    <el-form-item v-for="item in filterList"
      :label="$t(item.name)"
      :prop="item.name"
    >
      <el-input v-model="form[item.name]" type="text" 
        :placeholder="$t('common_filter')" clearable
        @change="handleSubmit"
        @keyup.enter.native="handleSubmit" />
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'
const props = withDefaults(
  defineProps<{
    filterList: any;
  }>(),
  {
    filterList: [],
  }
);
const emits = defineEmits(['change'])
const form = ref<any>({
});
const handleSubmit = useDebounceFn(() => {
  emits('change', form.value)
}, 300)
</script>
<style lang="scss" scoped>
.el-form {
  display: flex;
  column-gap: var(--app-space-xs);
  border-bottom: 1px solid #ddd;
  margin-bottom: var(--app-space-xs);
}
.el-input {
  width: 200px;
  // margin-right: var
}
</style>
