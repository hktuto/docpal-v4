<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
      <ResponsiveFilter
        ref="ResponsiveFilterRef"
        @form-change="handleFilterFormChange"
        inputKey="documentName"
      />
      <el-button id="RetentionList__RetentionPendingList__Refresh" text :loading="refreshLoading"
                 @click="handleRefresh">
        {{ $t("common_refresh") }}
      </el-button>
    </template>
    <template #commonActions="{ row }">
      <template v-if="row.status === 'P'">
        <template v-if="row.applyApprovedBy === userId">
          <el-button
            id="RetentionList__RetentionPendingList__Approve"
            class="approval-btn"
            size="small"
            type="primary"
            @click.stop="handleApprove(true, row)"
          >
            {{ $t("workflow_startAdhocWorkflow_approve") }}
          </el-button>
          <el-button
            id="RetentionList__RetentionPendingList__Reject"
            class="approval-btn"
            size="small"
            type="danger"
            @click.stop="handleApprove(false, row)"
          >
            {{ $t("workflow_startAdhocWorkflow_reject") }}
          </el-button>
        </template>
        <template v-else>
          <el-button id="RetentionList__RetentionPendingList__PendingApproval" text :disabled="true">
            {{ $t("status.pendingApproval") }}
          </el-button>
        </template>
      </template>
      <template v-else>
        <el-dropdown v-if="!!row && !!row.policyRetentionId" trigger="click">
          <span class="el-dropdown-link">
            <el-button text>
              <el-icon>
                <MoreFilled/>
              </el-icon>
            </el-button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in events[row.policyRetentionId]"
                :key="item.id"
                @click.stop="handleEvent(item, row)"
              >
                {{ item.eventLabel }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </template>
  </VxeGrid>
</template>
<script lang="ts" setup>
import {MoreFilled} from "@element-plus/icons-vue";
import {clientApi} from "api";
import {MenuRouterKey} from "#imports";

const routerProvider = inject(MenuRouterKey);
let extraParams = {};
const {t} = useI18n();
const initParams = {
  orderBy: "createdDate",
  isDesc: true,
  states: ["D", "P"],
};

const events = ref({});
const userId: string = useUserId().value;
const {tableConfig, tableEvent, tableRef, reload, query} = useVxeTable({
  id: "clientRetentionPendingList",
  api: async (pageParams: any) => {
    return clientApi.api.postPolicyRetentionsDocumentPage({
      ...initParams,
      ...pageParams,
      ...extraParams,
    });
  },
  columns: [
    {
      field: "documentName",
      title: "tableHeader_name",
      type: "html",
      formatter: ({cellValue, row}: any) => {
        let icon = "/icons/doc/file.svg";
        return `<span class="tableRow-icon-cell"><img src="${icon}" /> ${cellValue}</span>`;
      },
    },
    {field: "documentPath", title: "document_path"},
    {field: "policyName", title: "tableHeader_policyName"},
    {
      field: "expireDate",
      title: "tableHeader_dueDate",
      formatter({cellValue}: any) {
        return formatDate(cellValue)
      },
    },

    {
      title: "tableHeader_actions",
      slots: {
        default: "commonActions",
      },
      width: 100,
    },
  ],
  dblClickAction: ({row, column, event}: any) => {
    handleDblclick(row);
  },
  optionalConfig: {
    cellClassName({row, column}) {
      if (column.title === "tableHeader_actions") {
        return "row-actions";
      }
      return null;
    },
  },
});
const refreshLoading = ref(false);
// #region module: ResponsiveFilterRef
const ResponsiveFilterRef = ref();

async function getFilter() {
  const data = await clientApi.api
    .getPolicyRetentionsDocumentPageConditions()
    .then((res) => res.data);
  const foundItem = data.find(item => item.key === "retentionPolicyIds");
  if (foundItem.options.length > 0) {
    foundItem.options.sort((a, b) => a.label.localeCompare(b.label));
    data[data.indexOf(foundItem)].options = foundItem.options;
  }
  ResponsiveFilterRef.value.init(data);
}

function handleFilterFormChange(formModel: any) {
  extraParams = formModel;
  reload();
}

// #endregion

async function handleRefresh() {
  refreshLoading.value = true;
  await clientApi.api.getPolicyRetentionsScanDocument();
  refreshLoading.value = false;
  reload();
}

function handleDblclick(row: any) {
  routerProvider?.navigateTo(
    createDetailPageParams({
      docName: row.documentName,
      idOrPath: row.documentId,
      showHeaderAction: false,
    }),
    false
  );
}

async function getEvents() {
  events.value = await clientApi.api.getPolicyRetentionsEvents().then((res) => res.data);
}

onMounted(() => {
  getFilter();
  getEvents();
  // clientApi.api.getPolicyRetentionsPolicyidScanDocument(414105); // 手动扫描
  // clientApi.api.getPolicyRetentionsPolicyidScanExpired(414105); // 手动完成
});
</script>

<style lang="scss" scoped>
:deep(.el-input) {
  width: 200px;
}

.responsive-container {
  width: 70%;
}

:deep(.row-actions) {
  .vxe-cell {
    display: flex;
    flex-direction: column;
    gap: var(--app-space-xs);

    .el-button {
      margin-left: unset;
      width: 80px;

      &:first-child {
        margin-top: var(--app-space-xs);
      }

      &:last-child {
        margin-bottom: var(--app-space-xs);
      }
    }
  }
}

:deep(.vxe-buttons--wrapper) {
  display: flex;
  justify-content: space-between;
}
</style>
