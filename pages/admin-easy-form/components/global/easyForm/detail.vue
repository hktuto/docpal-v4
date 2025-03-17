<template>
<div class="pageContainer--padding main">
  <EasyFormDetailName :detail="state.detail" />
  <EasyFormDetailInfomation :detail="state.detail" />
  <EasyFormDetailPreview v-if="state.detail.id" :detail="state.detail" @email-update="handleEmailUpdate"/>
  <EasyFormDetailPermission :detail="state.detail" />
  <EasyFormAction :detail="state.detail" @refresh="handleUpdateAction" @delete="handleDeleteAction" />
  <EasyFormDetailEmailLog ref="logRef" :detail="state.detail" />
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
  setTimeout(() => {
    handleEmailUpdate()
  })
}
function handleUpdateAction(action: any) {
  const index = state.detail.formResult.findIndex((item: any) => item.id === action.id)
  if (index !== -1) state.detail.formResult[index] = action
  else state.detail.formResult.push(action)
}
function handleDeleteAction(id: string) {
  const index = state.detail.formResult.findIndex((item: any) => item.id === id)
  if(index !== -1) state.detail.formResult.splice(index, 1)
}
const logRef = ref()
function handleEmailUpdate() {
  logRef.value.tableRef.reload()
}
onActivated(() => {
  getDetail()
})
onDeactivated(() => {
  state.detail = {}
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