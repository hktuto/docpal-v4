<template>
    <el-card>
        <h3>{{$t('azure.OCRTransactionLog')}}</h3>
        <div>
            <VxeGrid ref="gridRef" v-bind="tableConfig"  :pagination="{ currentPage: 3 }">
                <template #toolbar_buttons>
                    <slot name="toolbar_buttons" />
                </template>
            </VxeGrid>
        </div>
    </el-card>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
const azureProvider = inject(AzureProviderKey)
const tableConfig = createTableConfig({
    id: 'azureLogTableSetting',
    api: (pageParams:any) => azureProvider?.GetOCRTransactionLogApi(pageParams),
    columns:  [
        { id: "10",  field: 'businessName', title: 'dpTableHeader.businessName', fixed: 'left', },
        { field: 'workflow', title: 'azureDashboard.workflow',},
        { field: 'state', title: 'dpTableHeader.state', },
        { field:'ocrProfileName', title: 'azure.ocrProfileName', },
        { field:'scanType', title: 'azureDashboard.scanType', },
        { field:'processStatus', title: 'tableHeader_status', },
        { field: 'createdDate', title: 'dpTable_createdDate', sortable: true,
            formatter ({ cellValue }:any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
    ],  
})
const gridRef = ref()
function query() {
    gridRef.value.commitProxy('query')
}

function reload() {
    gridRef.value.commitProxy('reload')
}
defineExpose({ reload, query })
</script>
<style lang="scss" scoped>
:deep .el-input  {
    width: 200px;
}
.el-card {
    position: relative;
    margin-top: var(--app-space-s);
    :deep .el-card__body {
        height: 70vh;
        overflow: hidden;
        display: grid;
        grid-template-rows: min-content 1fr;
    }
}
</style>