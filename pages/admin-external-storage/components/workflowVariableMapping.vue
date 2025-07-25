<template>
  <div class="grid-layout_3">
    <el-form-item v-for="(item, index) in workflowProps" :key="index" :label="getTargetLabel(item.label)">
      <ElSelect v-model="item.source" filterable :placeholder="$t('easyform.actionFieldSelect')" clearable>
        <ElOption v-for="option in varList" :key="option.value" :label="option.label" :value="option.value" />
      </ElSelect>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { adminApi } from 'api'
const props = defineProps<{
  workflow: string
  varList: any[]
}>()
const workflowProps = ref([])
function getTargetLabel(value) {
  const index = props.varList.findIndex((i) => i.label === value)
  return index === -1 ? value : props.varList[index].label
}
async function getWorkflowProps(processKey: string) {
  try {
    const options = await adminApi.api.postWorkflowProperties({ processKey }).then((res) => res.data)
    return options.map((item) => ({
      label: item.name,
      value: item.id
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}
watch(() => props.workflow, async (newVal) => {
  if (newVal) {
    workflowProps.value = await getWorkflowProps(newVal)
  }
}, { immediate: true })
</script>

<style scoped lang="scss">
.grid-layout_3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--app-space-xs);
}
</style>
