<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    </VxeGrid>
  </div>
</template>
<script lang="ts" setup>
import { watchDebounced } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { clientApi } from "api";
const props = defineProps(['processKeys'])
const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const {
  public: { endPoint },
} = useRuntimeConfig();
let extraParams: any = ref({
  assignedUser: useUserId(),
});
const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "d-workflowMy",
  zoom: false,
  api: (pageParams: any) => getData(pageParams),
  columns: [
    { field: "taskInstance.businessKey", title: "table_name", fixed: "left" },
    { field: "name", title: "workflow_taskName" },
    { field: "taskInstance.processDefinitionName", title: "workflow_workflow" },
  ],
  dblClickAction: ({ row, column, event }:any) => {
    handleDblclick(row)
  },
  saveColumnOrder: false
});
async function getData(params: any = {}) {
  if(endPoint === 'admin') return
  const settingParams = {}
  if(props.processKeys && props.processKeys.length > 0) {
    settingParams.processKeys = props.processKeys
  }
  const res = await clientApi.api.postWorkflowTasksUser({ ...params, ...extraParams.value, ...settingParams }).then(res => res.data)
  return {
    data: {
      entryList: res?.entryList,
      totalSize: res?.totalSize
    }
  }
}
function handleDblclick(row: any) {
  routerProvider?.navigateTo(routeWorkflowDetail({
    ...row, 
    name: row.taskInstance.businessKey,
    workflowType: 'myTask' }), false);
}
watchDebounced(
  () => props.processKeys,
  (newValue, oldValue) => {
    if (!oldValue) return;
    if(JSON.stringify(oldValue) === JSON.stringify(newValue)) return;
    reload()
  },
  { debounce: 200, maxWait: 500, immediate: true }
);

</script>
<style lang="scss" scoped>
:deep .vxe-buttons--wrapper {
  display: flex;
  justify-content: space-between;
}
.responsive-container {
  width: 70%;
  :deep .el-input {
    width: 200px;
  }
}
</style>
 