<template>
<div class="pageContainer--padding main">
  <EasyFormDetailName :detail="state.detail" />
  <EasyFormDetailInfomation :detail="state.detail" />
  <EasyFormDetailPreview :detail="state.detail" />
  <EasyFormDetailPermission :detail="state.detail" />
  <EasyFormAction :detail="state.detail" @refresh="handleUpdateAction" @delete="handleDeleteAction" />
</div>
</template>
<script lang="ts" setup>
import { adminApi } from 'api';
const { id } = defineProps<{
  id: string;
}>();
const state = reactive<any>({
  detail: {}
})
async function getDetail() {
  state.detail = await adminApi.api.getFormDesignDraftId(id).then(res => res.data)
}
function handleUpdateAction(action) {
  console.log(action);
  
  const index = state.detail.formResult.findIndex(item => item.id === action.id)
  if (index !== -1) state.detail.formResult[index] = action
  else state.detail.formResult.push(action)
}
function handleDeleteAction(id) {
  const index = state.detail.formResult.findIndex(item => item.id === id)
  if(index !== -1) state.detail.formResult.splice(index, 1)
}
onMounted(async() => {
  getDetail()
})
</script>
<style lang="scss" scoped>
.main {
  overflow: auto;
}
.el-card {
  margin-bottom: var(--app-space-xs);
}
</style>