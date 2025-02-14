<script lang="ts" setup>
import { clientApi } from "api";
import { provide } from "vue";
import { ElMessageBox } from "element-plus";

const routerProvider = inject(MenuRouterKey);
if (!routerProvider) {
  throw new Error("MenuRouterKey is not provided");
}

const props = defineProps<{
  pageNum: number;
  pageSize: number;
  filters?: any;
}>();
const { pageNum, pageSize, filters } = toRefs(props);

const { t } = useI18n();
const filterData = ref();
const ResponsiveFilterRef = ref();
const tableRef = ref();

function handleFilterFormChange(formData: any) {
  filterData.value = formData;
  console.log("handleFilterFormChange", formData, tableRef.value);
  tableRef.value?.reload();
}
function handleClearFilter() {
  filterData.value = {};
  tableRef.value?.reload();
}
onMounted(() => {
  ResponsiveFilterRef.value.init([
    {
      key: "orderBy",
      label: "tableHeader.sortBy",
      type: "string",
      isMultiple: false,
      options: [
        { label: "tableHeader_documentName", value: "documentNames" },
        { label: "tableHeader_shareBy", value: "shareByUserId" },
        { label: "tableHeader_shareTo", value: "shareToUserIds" },
        { label: "filePopover_fileCreatedDate", value: "createdDate" },
      ],
    },
    {
      key: "isDesc",
      label: "tableHeader.sortOrder",
      type: "string",
      isMultiple: false,
      options: [
        { label: "tableHeader.desc", value: false },
        { label: "tableHeader.asc", value: true },
      ],
    },
  ]);
  if (filters.value) {
    console.log("set filters", filters.value);
    filterData.value = filters.value;
    nextTick(() => {
      Object.keys(filters.value).forEach((key) => {
        ResponsiveFilterRef.value.setValue(key, filters.value[key]);
      });
      // tableRef.value?.reload()
    });
  }
});

async function deleteAction(row: any) {
  ElMessageBox.confirm(`${t("msg_confirmWhetherToDelete")}`).then(async () => {
    // param.push(...row.detailIds.split(','))
    await clientApi.api.deleteInternalshare({ internalShareId: row.internalShareId });
    tableRef.value?.reload();
  });
  return;
}
</script>

<template>
  <div class="pageContainer">
    <InternalShareListTable ref="tableRef">
      <template #toolbar_buttons>
        <ResponsiveFilter
          ref="ResponsiveFilterRef"
          @form-change="handleFilterFormChange"
          inputKey="documentName"
          @clear-filter="handleClearFilter"
          inputPlaceHolder="tableHeader_documentName"
        />
      </template>
    </InternalShareListTable>
  </div>
</template>

<style lang="scss" scoped>
.pageContainer {
  width: 100%;
  height: 100%;
  padding: var(--app-space-s);
  overflow: hidden;
}
</style>
