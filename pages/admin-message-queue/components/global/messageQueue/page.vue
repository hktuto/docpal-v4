<template>
  <div class="pageContainer--padding">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          @form-change="handleFilterFormChange"
        />
      </template>
      <template #status="{row, rowIndex}">
        <el-tag v-if="row.status === 'ERROR'" type="danger">{{ row.status }}</el-tag>
        <el-tag v-else type="info">{{ row.status }}</el-tag>
      </template>
    </VxeGrid>
    <HoldDialog ref="HoldDialogRef" @update="query" />
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { adminApi } from "api";
const { t } = useI18n()
let extraParams: any = {};
const {
  tableConfig,
  tableEvent,
  tableRef,
  query,
  reload,
  cleanSelectedRows,
} = useVxeTable({
  id: "message-queue",
  api: async(pageParams: any) => {
    const data = await adminApi.api.postMessageQueuePage({ ...pageParams }, extraParams)
    return { 
      data:{
        entryList: data.data.content,
        totalSize: data.data.totalElements,
      }
    }
  },
  columns: [
    { field: "fileName", title: "table_fileName", fixed: "left" },
    { field: "table_path", title: "search.logicalPath" },
    { field: "category", title: "category" },
    { field: "status", title: "log_auditEvent",
      slots: {
        default: 'status'
      } 
    },
    {
      field: "lastUpdateDate",
      title: "log_jobsStatus_date",
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      },
    },
  ],
  permissionMethod: (args:PermissionMethodParams) => {
    switch (args.code) {
      case 're-try':
        return {
          visible: args.row.status === 'ERROR',
          disabled: false
        }
      //   break;
      default:
        return {
          visible:true,
          disabled: false
        }
    }
  }
});
async function handleReSubmit (row) {
  try {
    row.loading = true
    const res = await adminApi.api.postMessageQueueMessageidResubmit(row.messageId, {
      businessId: row.businessId
    })
    if (!!res) {
      ElMessage.success('success')
      query()
    }
  } catch (error) {

  }
  finally {
    setTimeout(() => {
      row.loading = false
    }, 500)
  }
}
function handleFilterFormChange(formModel: any) {
  extraParams = formModel;
  reload();
}

const ResponsiveFilterRef = ref()
async function getFilter() {
  const data = [
    { key: "status", label: "dpTable_status", type: "string", isMultiple: false,
      options: [
        { label: "CREATE", value: "CREATE" },
        { label: "PENDING", value: "PENDING" },
        { label: "COMPLETED", value: "COMPLETED" },
        { label: "FINISH", value: "FINISH" },
        { label: "ERROR", value: "ERROR" },
        { label: "PENDING_FOR_SENDING_MESSAGE", value: "PENDING_FOR_SENDING_MESSAGE" }
      ]
    }
  ]
  ResponsiveFilterRef.value.init(data)
}
onMounted(() => {
  getFilter()
})
</script>
<style lang="scss" scoped>
:deep .vxe-buttons--wrapper {
  display: flex;
  justify-content: space-between;
}
.responsive-container {
  width: 50%;
  :deep .el-input {
    width: 200px;
  }
}
</style>
