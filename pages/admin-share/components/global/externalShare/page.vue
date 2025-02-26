<template>
    <div class="pageContainer--padding">
        <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        </VxeGrid>
        <ExternalShareDialog ref="shareInfoDialogRef" @submit="handleSubmit"></ExternalShareDialog>
    </div>
</template>
<script lang="ts" setup>
import {ElMessage, ElMessageBox} from 'element-plus'
import {adminApi} from "api";
import dayjs from "dayjs";

const {t} = useI18n();
let extraParams: any = {};
const {
    tableConfig,
    tableEvent,
    tableRef,
    query,
    reload,
    cleanSelectedRows,
} = useVxeTable({
    id: "userTableSetting",
    api: async (pageParams: any) => {
        const params = {
            ...pageParams,
            page: pageParams.pageNum,
            size: pageParams.pageSize,
        }
        delete params.pageNum
        delete params.pageSize
        const res = await adminApi.api.postNuxeoShareGet({...params, ...extraParams}).then(res => res.data)
        return {
            data: {
                entryList: res.list,
                totalSize: res.total
            }
        }
    },
    columns: [
        {field: "emailList", title: "tableHeader_emailList", fixed: "left"},
        {field: "documentSize", title: "tableHeader_numberOfFiles"},
        {
            field: "created",
            title: "tableHeader_creationDate",
            formatter({cellValue}: any) {
                const format = userDisplayTimeSetting();
                return dayjs(cellValue).format(format);
            },
        },
        {
            field: "expiredDate",
            title: "tableHeader_dueDate",
            formatter({cellValue}: any) {
                const format = userDisplayTimeSetting();
                return dayjs(cellValue).format(format);
            },
        },
    ],
    bodyActions: [
        [
            {
                code: "delete",
                name: t("common_edit"),
                visible: true,
                disabled: false,
                action: ({row}: any) => {
                    handleDblclick(row);
                },
            },
            {
                code: "delete",
                name: t("common_delete"),
                visible: true,
                disabled: false,
                action: ({row}: any) => {
                    handleDisabled(row);
                },
            },
        ],
    ],
    dblClickAction: ({row, column, event}: any) => {
        handleDblclick(row)
    },
});

async function handleDisabled(row) {
    const action = await ElMessageBox.confirm(
        t('share_externalDeleteMsg'),
        {
            confirmButtonText: t('common_confirmDelete'),
        }
    )
    if (action !== 'confirm') return
    const param = [];
    param.push(row.shareID);
    await adminApi.api.deleteNuxeoShare(param);
    ElMessage.success(t('share_externalDeleteSuccessMsg'))
    query();
}

const shareInfoDialogRef = ref()

function handleDblclick(row) {
    shareInfoDialogRef.value.handleOpen(row)
}

async function handleSubmit(shareInfo) {
    await adminApi.api.patchNuxeoShare(shareInfo)
    query()
}

</script>
<style lang="scss" scoped>
:deep .el-input {
    width: 200px;
}
</style>
