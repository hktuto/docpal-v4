<template>
    <div class="pageContainer--padding">
        <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
            <template #toolbar_buttons>
                <ResponsiveFilter
                    ref="ResponsiveFilterRef"
                    inputKey="policyName"
                    @form-change="handleFilterFormChange"
                    :inputPlaceHolder="$t('filePolicies_tableFilterMsg')"
                />
                <el-button type="primary" @click="handleAdd">{{ $t('filePolicies_RetentionPolicyCreate') }}</el-button>
            </template>
            <template #documentType="{row, index}">
                <el-tag class="el-icon--left table-tag" v-for="item in row.triggers">{{ item.documentType }}</el-tag>
            </template>
            <template #periodNum="{row, index}">
                {{ row.periodNum }} {{ calDate(row.periodUnit) }}
            </template>
            <template #active="{row, index}">
                <el-switch v-model="row.status"
                           active-value="A" inactive-value="D"
                           :loading="row.loading"
                           @change="(value) => handleSetStatus(value, row)"
                />
            </template>
            <template #isAuto="{ row }">
                <el-icon v-if="row.isAuto" style="--color: var(--app-primary-color)"><Select/></el-icon>
                <el-icon v-else style="--color: #F56C6C">
                    <CloseBold/>
                </el-icon>
            </template>
            <template #status="{ row }">
                <el-tag v-if="row.status === 'A'" type="success">{{ $t("actions.activate") }}</el-tag>
                <el-tag v-else type="danger">{{ $t("actions.inactive") }}</el-tag>
            </template>
        </VxeGrid>
        <RetentionAddDialog ref="RetentionAddDialogRef" @update="query"/>
    </div>
</template>
<script lang="ts" setup>
import {Select, CloseBold} from '@element-plus/icons-vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {adminApi} from "api";
import dayjs from "dayjs";
import {routeRetentionDetail} from '~/utils/routerHelper';

const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}
const {t} = useI18n()
let extraParams: any = {};
const {
    tableConfig,
    tableEvent,
    tableRef,
    query,
    reload,
    cleanSelectedRows,
} = useVxeTable({
    id: "a-retention",
    api: (pageParams: any) =>
        adminApi.api.postPolicyRetentionsPage({...pageParams, ...extraParams}),
    columns: [
        {field: "policyName", title: "hp.policyName", fixed: "left"},
        {
            field: "documentType", title: "docType_documentType",
            slots: {
                default: "documentType",
            }
        },
        {
            field: "periodNum", title: "rp.period",
            slots: {
                default: "periodNum",
            }
        },
        {
            field: "createdDate",
            title: "filePolicies_CreationDate",
            formatter({cellValue}: any) {
                const format = userDisplayTimeSetting();
                return dayjs(cellValue).format(format);
            },
        },
        {
            field: 'isAuto', title: 'rp.isAuto', width: 150,
            slots: {
                default: "isAuto",
            },
        },
        {
            field: "active",
            title: "filePolicies_PolicyStatus",
            slots: {
                default: "status",
            },
        },
    ],
    bodyActions: [
        [
            {
                code: "hold_edit",
                name: t('filePolicies_RetentionPolicyEdit'),
                visible: true,
                disabled: false,
                action: ({row}: any) => {
                    handleDblclick(row)
                },
            },
            {
                code: "hold_delete",
                name: t('filePolicies_RetentionPolicyDelete'),
                visible: true,
                disabled: false,
                action: ({row}: any) => {
                    deleteItem(row.id);
                },
            },
            {
                code: "hold_active",
                name: t('filePolicies_RetentionPolicyActivate'),
                visible: true,
                disabled: false,
                action: ({row}: any) => {
                    handleActive(row, 'A');
                },
            },
            {
                code: "hold_inactive",
                name: t('filePolicies_RetentionPolicyInactivate'),
                visible: true,
                disabled: false,
                action: ({row}: any) => {
                    handleActive(row, 'D');
                },
            }
        ],
    ],
    dblClickAction: ({row, column, event}: any) => {
        handleDblclick(row)
    },
    permissionMethod: (args: PermissionMethodParams) => {
        switch (args.code) {
            case 'hold_active':
                return {
                    visible: args.row.status === 'D',
                    disabled: false
                }
                break;
            case 'hold_inactive':
                return {
                    visible: args.row.status === 'A',
                    disabled: false
                }
                break;
            default:
                return {
                    visible: true,
                    disabled: false
                }
        }
    }
});
const RetentionAddDialogRef = ref()

function handleDblclick(row) {
    routerProvider?.navigateTo(routeRetentionDetail(row))
}

async function handleActive(row: any, isActive: 'A' | 'D') {
    try {
        const result = await adminApi.api.patchPolicyRetentionsIdStatusStatus(row.id, isActive).then(res => res.data)
        if (!!result) {
            row.status = isActive;
            ElMessage.success(t('dpMsg_success'))
        }
    } catch (error) {

    }
}

// TODO
async function deleteItem(id: string) {
    const action = await ElMessageBox.confirm(`${t('filePolicies_RetentionPolicyDeletedMsg')}`,
        {
            dangerouslyUseHTMLString: true,
            confirmButtonText: t('common_confirmDelete')
        })
    if (action !== 'confirm') return
    await adminApi.api.deletePolicyRetentionsId(id)
    // query()
    routerProvider?.message.success(t('filePolicies_RetentionPolicyDeletedSuccessfullyMsg'));
}

async function handleCreate() {
    DialogRef.value.handleOpen();
}

function handleFilterFormChange(formModel: any) {
    extraParams = formModel;
    reload();
}

function handleAdd() {
    RetentionAddDialogRef.value.handleOpen()
}

const ResponsiveFilterRef = ref()

async function getFilter() {
    const data = await adminApi.api.getPolicyRetentionsPageConditions().then(res => res.data)
    ResponsiveFilterRef.value.init(data)
}

function calDate(unit: string) {
    let date = ''
    switch (unit) {
        case 'Y':
            date = 'common_years'
            break;
        case 'M':
            date = 'common_months'
            break;
        case 'D':
            date = 'common_days'
            break;
        default:
            break;
    }
    return $i18n.t(date)
}

onMounted(() => {
    getFilter()
})
onActivated(async () => {
    query()
})
</script>
<style lang="scss" scoped>
:deep .vxe-buttons--wrapper {
    display: flex;
    justify-content: space-between;
}

.responsive-container {
  width: 70%;
  :deep .el-input {
    width: 250px;
  }
}
</style>
