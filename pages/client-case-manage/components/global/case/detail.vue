<script lang="ts" setup>
import {clientApi} from 'api'
import dayjs from "dayjs";

const {id, name} = defineProps<{
    id: string;
    name: string;
}>();

const {t} = useI18n()
const emits = defineEmits(['filter-change', 'refresh'])
const keyword = ref()
const title = ref()
const routerProvider = inject(MenuRouterKey)
type TableState = {
    ready: boolean,
    loading: boolean,
    keyword: string,
    title: string,
    detail: any,
    extraParamsFilter: any,
    columns: any,
    selectList: any[],
}
const state = reactive<TableState>({
    ready: false,
    loading: false,
    keyword: "",
    title: "",
    detail: {},
    extraParamsFilter: {},
    columns: [],
    selectList: [],
});
const tableReady = ref(false);
const {tableConfig, tableEvent, tableRef, query, reload, cleanSelectedRows,} = useVxeTable({
    id: "clientCaseTableList",
    api: async (pageParams: any) => {
        if (keyword.value) {
            pageParams.q = keyword.value
        }
        if (title.value) {
            pageParams.where.title = title.value
        }
        return clientApi.api.postCaseTypesCasetypeidRecordsPage(id, pageParams)
    },
    defaultSort: {
        field: "created_date",
        order: 'desc'
    },
    optionalConfig: {
        tooltipConfig: {
            // contentMethod: ({
            //                     items,
            //                     row,
            //                     rowIndex,
            //                     $rowIndex,
            //                     column,
            //                     columnIndex,
            //                     $columnIndex,
            //                     type,
            //                     cell,
            //                     $event
            //                 }: any) => {
            //     const key = column.property
            //     const value = row[key]
            //     if (typeof value === 'string') {
            //         return value
            //     }
            //     if (Array.isArray(value)) {
            //         return value.join(',')
            //     }
            // }
        }
    },
    dblClickAction: ({row}) => {
        routerProvider?.navigateTo(caseManageDashboardPage({...row, id, versionId: row.caseDefinitionVersionId}))
    }
});

const ResponsiveFilterRef = ref()

async function getFilter(conditions) {
    ResponsiveFilterRef.value.init(conditions);
}

function handleFilterFormChange(formModel) {
    state.extraParamsFilter = formModel;
    emits('filter-change', state.extraParamsFilter)
}

async function reorderColumn() {
    const {data: {fields}} = await clientApi.api.getCaseDashboardCasetypeCasetypeidPrimaryform(id)
    const columns = [
        {field: 'case_id', title: 'caseManagement.name'},
        {
            field: 'created_date',
            title: 'workflow_createDate',
            formatter({cellValue}: any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
        {
            field: 'modified_date',
            title: 'table_modifiedDate',
            formatter({cellValue}: any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
    ]
    fields.slice().reverse().forEach(row => {
        columns.splice(1, 0, {field: row.id, title: row.name});
    })
    tableConfig.columns = columns;
    tableReady.value = true;
}

const addCaseDialog = ref()

function handleAddCaseDialog() {
    addCaseDialog.value.handleOpen(id)
}

onMounted(async () => {
    await reorderColumn()
});

</script>

<template>
    <VxeGrid v-if="tableReady" ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <header class="header-flex">
                <ResponsiveFilter
                    ref="ResponsiveFilterRef"
                    @form-change="handleFilterFormChange"
                    inputKey="userNameOrEmail"
                    :inputPlaceHolder="t('tip.filterByName')"
                />
            </header>
            <div class="flex-x-end">
                <el-button type="primary" @click="handleAddCaseDialog">
                    {{ $t("common_add") }}
                </el-button>
            </div>
        </template>
    </VxeGrid>
    <LazyCaseAddCaseDialog ref="addCaseDialog" @refresh="reload"></LazyCaseAddCaseDialog>
</template>

<style lang="scss" scoped>
:deep .headerLeftExpand {
    .el-input {
        width: 200px;
    }
}

.flex-x-end {
    display: flex;
    justify-content: end;
}
</style>
