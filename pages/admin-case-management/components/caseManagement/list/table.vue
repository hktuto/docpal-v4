<script lang="ts" setup>
import dayjs from 'dayjs'
import type {VxeGridInstance} from 'vxe-table'
const listProvider = inject(CaseManagementListProviderKey)
if(!listProvider) {
    throw new Error('CaseManagementListProviderKey not found')
}
const tableRef = ref<VxeGridInstance<any>>()
const { t } = useI18n()
function reload() {
    // tableRef.value.reload()
    tableRef.value?.commitProxy('reload')
}

const tableConfig = reactive(createTableConfig({
    id: 'adminCaseManagementList',
    api: (pageParams:any) => listProvider?.getListApi(pageParams),
    sort:true,
    filter:false, 
    columns:  [
        {
            field:'name',
            title: 'table_name',
            sortable: true,
            fixed:'left',
        },
        {
            field:'createdDate',
            title: 'workflow_createDate',
            sortable: true,
            formatter ({ cellValue }:any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
        {
            field:'updatedDate',
            title: 'workflow_updateDate',
            sortable: true,
            formatter ({ cellValue }:any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
        {
            field:'caseIdPrefix',
            title: 'caseManagement.prefix',
        },
        {
            field:'caseIdDigit',
            title:'caseManagement.digit',
        },
        {
            field:'enable',
            title: 'dpTable_status',
            sortable: true,
            slots:{
                default:'status',
            }
        },
        {
            title: "dpTable_actions",
            fixed:'right',
            width: 60,
            slots:{
                default:'actions'
            }
        }
    ],
},{
}))

const tableEvent = {
    
}

function statusFilterChange(option:any) {
    const $grid = tableRef.value as VxeGridInstance
    $grid.updateFilterOptionStatus(option, true)
}

defineExpose({ reload })
</script>


<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
        </template>
        <template #status="{row}">
            {{ row.enable ?
                $t('actions.activated') :
                $t('actions.inactived') }}
        </template>
        
        <template #actions="{row}">
            <el-dropdown>
                <SvgIcon src="/icons/dots.svg"></SvgIcon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-loading="tableConfig.loading" @click="listProvider.openLatestVersion(row)">{{$t('masterTable.editDetail')}}</el-dropdown-item>
                        <!-- <el-dropdown-item v-if="row.publishStatus !== 'P' && row.enable" v-loading="tableConfig.loading" @click="handleActive(row, false)">{{$t('actions.inactive')}}</el-dropdown-item>
                        <el-dropdown-item v-else-if="row.publishStatus !== 'P' && !row.enable" v-loading="tableConfig.loading" @click="handleActive(row, true)">{{$t('actions.active')}}</el-dropdown-item> -->
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </template>
    </VxeGrid>
</template>