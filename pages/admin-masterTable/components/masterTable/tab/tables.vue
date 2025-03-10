<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <div class="flex-x-between">
                <ResponsiveFilter
                    ref="ResponsiveFilterRef"
                    @form-change="handleFilterFormChange"
                    inputKey="name"
                    inputPlaceHolder="masterTable_filter"
                />
                <el-button class="el-icon--right button" type="primary" @click="handleAdd()">
                    {{ $t("masterTable_create") }}
                </el-button>
            </div>
        </template>
        <template #status="{ row }">
            <el-tag v-if="row.status === 'A'" type="success">{{ $t("actions.active") }}</el-tag>
            <el-tag v-else type="danger">{{ $t("actions.inactive") }}</el-tag>
        </template>
    </VxeGrid>
</template>

<script lang="ts" setup>
import {ElMessage, ElMessageBox} from "element-plus";
import {onActivated} from "vue";
import {MasterTableProviderKey} from "~/utils/masterTableProvider";

const {t} = useI18n()
const emits = defineEmits(["filter-change"]);
const masterTableProvider = inject(MasterTableProviderKey);
const state = reactive<any>({
    loading: false,
});

const {tableConfig, tableEvent, tableRef, reload, query} = useVxeTable({
    id: "masterTable-tab",
    api: (pageParams: any) => masterTableProvider?.GetMasterTablesPageApi(pageParams),
    columns: [
        {field: "name", title: "masterTable_name", fixed: "left"},
        {field: "createdBy", title: "masterTable_createdBy"},
        {
            field: "status",
            title: "dpTable_status",
            slots: {
                default: "status",
            },
        },
    ],
    bodyActions: [
        [
            {
                code: "edit",
                name: "masterTable_createdBy",
                action: ({row}: any) => {
                    handleDblclick(row);
                },
            },
            {
                code: "delete",
                name: "masterTable_delete",
                action: ({row}: any) => {
                    handleDelete(row);
                },
            },
            {
                code: "inactive",
                name: "masterTable_inactivate",
                action: ({row}: any) => {
                    handleActive(row, "D");
                },
            },
            {
                code: "active",
                name: "masterTable_active",
                action: ({row}: any) => {
                    console.log("row", row);
                    handleActive(row, "A");
                },
            },
        ],
    ],
    permissionMethod: (args: PermissionMethodParams) => {
        // options 是 menuConfig 中的 body 配置
        if (args.code === "active") {
            return {
                visible: args.row.status === "D",
                disabled: false,
            };
        } else if (args.code === "actions.inactive") {
            return {
                visible: args.row.status === "A",
                disabled: false,
            };
        }
        return {
            visible: true,
            disabled: false,
        };
    },
    dblClickAction: ({row, column, event}: any) => {
        handleDblclick(row);
    },
});

async function handleDelete(row: any) {
    const action = await ElMessageBox.confirm(
        t("masterTable_deleteMsg", {name: row.name}),
        {
            dangerouslyUseHTMLString: true,
            confirmButtonText: t('common_confirmDelete'),
        }
    );
    if (action !== "confirm") return;
    const result = await masterTableProvider?.DeleteMasterTablesApi(row.id);
    if (!result) {
        ElMessage.error(t("dpTip.deleteFailed"));
        return;
    }
    ElMessage.success(t('masterTable_deleteSuccessMsg', {name: row.name}));
    query();
}

async function handleActive(row, status: "A" | "D") {
    state.loading = true;
    try {
        row.status = status;
        await masterTableProvider?.UpdateMasterTableApi({
            id: row.id,
            status,
        });
        ElMessage.success(t("dpMsg_success"));
    } catch (error) {
        row.status = row.status = "A" ? "D" : "A";
    }
    setTimeout(() => (state.loading = false), 500);
}

function handleDblclick(row: any) {
    console.log("handleDblclick", row);
    masterTableProvider?.openDetail(row);
}

function handleAdd() {
    masterTableProvider?.openNew();
}

// #region module: ResponsiveFilterRef
const ResponsiveFilterRef = ref();

async function getFilter() {
    const filters = await masterTableProvider?.GetMasterTablesPageConditionApi();
    console.log(1, filters.data)
    nextTick(() => {
        ResponsiveFilterRef.value.init(filters.data);
    });
}

function handleFilterFormChange(formModel: any) {
    state.extraParams = formModel;
    emits("filter-change", state.extraParams);
}

// #endregion

onMounted(() => {
    getFilter();
});
onActivated(() => {
    query();
});

defineExpose({query, reload});
</script>

<style lang="scss" scoped>
.responsive-container {
    :deep .el-input {
        width: 200px;
    }
}

.flex-x-between {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
</style>
