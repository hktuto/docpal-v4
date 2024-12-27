<template>
    <el-card>
        <div class="title">{{ $t('azure.mapping') }}</div>
        <div class="description">{{ $t('azure.mappingDescription') }}</div>
        <div style="overflow: hidden; margin-top: var(--app-space-xs);">
            <VxeGrid ref="tableRef" v-bind="tableConfig" >
                <template #toolbar_buttons>
                    <slot name="toolbar_buttons" />
                </template>
                <template #status="{row}">
                <el-tag v-if="row.status === 'open'" type="success">{{$t('actions.activated')}}</el-tag>
             
                <el-tag v-else type="danger">{{$t('actions.inactived')}}</el-tag>
                </template>
                
                <template #more="{row}">
                    <el-dropdown>
                        <SvgIcon src="/icons/dots.svg"></SvgIcon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-loading="tableConfig.loading" @click="handleDblclick(row)">{{$t('dpTool_edit')}}</el-dropdown-item>
                                <el-dropdown-item v-if="row.status === 'open'" :disabled="tableConfig.loading" @click="handleActive('close', row)">{{$t('actions.inactive')}}</el-dropdown-item>
                                <el-dropdown-item v-else :disabled="tableConfig.loading" @click="handleActive('open', row)">{{$t('actions.active')}}</el-dropdown-item>
                                <!-- <el-dropdown-item v-loading="tableConfig.loading" @click="handleActive(row)">{{$t('masterTable.editDetail')}}</el-dropdown-item> -->
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </VxeGrid>
        </div>
        <el-button class="p-btn" type="primary" :loading="tableConfig.loading" @click="handleAdd">{{ $t('azureSettingMapping.add') }}</el-button>
    </el-card>
    <AzureSettingMappingDialog ref="AzureSettingMappingDialogRef" :exitList="tableData" @refresh="emits('refresh')"/>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
const azureProvider = inject(AzureProviderKey)
import { ElMessage, ElMessageBox } from 'element-plus'
const props = defineProps(['tableData'])
const emits = defineEmits(['refresh'])
const state = reactive<any>({
})
const tableConfig = ref({
    id: 'azureSettingMappingTableSetting',
    columns:  [
        { id: "10",  field: 'id', title: 'dpTable_id', fixed: 'left', },
        { field: 'ocrProfileName', title: 'azureSettingMapping.name',},
        { field: 'state', title: 'dpTable_status', 
            slots:{
                default:'status',
            }
        },
        { field:'scanProfile', title: 'azureSettingMapping.scanProfile', },
        { field:'normalizeSetting', title: 'azureSettingMapping.normalizeSetting', },
        { field:'scanType', title: 'azureSettingMapping.scanType', },
        { field: 'createdDate', title: 'dpTable_createdDate', sortable: true,
            formatter ({ cellValue }:any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
        { field: 'modifiedDate', title: 'table_modifiedDate', sortable: true,
            formatter ({ cellValue }:any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
        { field:'createdBy', title: 'role.creator', },
        {  title: 'dpTable_actions', 
            slots:{
                default:'more',
            }
        },
    ],  
    border: true,
    round: true,
    showOverflow: true,
    height: 'auto',
    data: [],
    loading: false
})
const AzureSettingMappingDialogRef  = ref()
function handleAdd () {
    AzureSettingMappingDialogRef.value.handleOpen()
}
function handleDblclick(row) {
    AzureSettingMappingDialogRef.value.handleOpen(row)
}
async function handleActive(status: 'close' | 'open', row: any) {
    tableConfig.loading = true
    try {
        await azureProvider?.UpdateAzureOcrMappingApi({
            ...row,
            name: row.ocrProfileName,
            status
        })
        emits('refresh')
        ElMessage.success($i18n.t('dpMsg_success'))
    } catch (error) {
    }
    tableConfig.loading = false
}
watch(() => props.tableData, (newVal) => {
    if(!newVal) return
    tableConfig.value.data = newVal
})
</script>

<style lang="scss" scoped>
.el-card {
    position: relative;
    margin-top: var(--app-space-s);
    :deep .el-card__body {
        height: 70vh;
        overflow: hidden;
        display: grid;
        grid-template-rows: min-content min-content 1fr;
    }
    .p-btn {
        position: absolute;
        right: var(--app-space-xs);
        top: var(--app-space-xs);
    }
}
.title {
    font-weight: bold;
    font-size: 18px;
}
</style>
