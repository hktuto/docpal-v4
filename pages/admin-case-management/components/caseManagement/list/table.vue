<script lang="ts" setup>

import dayjs from 'dayjs'
import type {VxeGridInstance, VxeGridListeners} from 'vxe-table'
const listProvider = inject(CaseManagementListProviderKey)
if(!listProvider) {
    throw new Error('CaseManagementListProviderKey not found')
}
const { t } = useI18n()

const {pageNum, pageSize, orderBy, isDesc, filters}= defineProps<{
    pageNum?: number,
    pageSize?: number,
    orderBy?: string,
    isDesc?: boolean,
    filters?: any
}>();

const { tableConfig, tableEvent , tableRef, reload, query } = useVxeTable({
    id: 'adminCaseManagementList',
    api: (pageParams:any) => listProvider?.getListApi(pageParams),
    remoteSort: true,
    defaultSort: orderBy ? [{field: orderBy, order: isDesc ? 'desc' : 'asc'}] : [{field:"modifiedDate", order: "desc"}] ,
    columns:  [
        {
            field:'name',
            title: 'table_name',
            sortable: true,
            fixed:'left',
        },
        {
            field:'productionVersion',
            title: 'dpTable.productionVersion',
        },
        {
            field:'latestVersion',
            title: 'dpTable.latestVersion',
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
            field:'modifiedDate',
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
            formatter: ({ cellValue }:any) => {
                return cellValue ? t('Enabled') : t('Disabled')
            },
        },
    ],
    bodyActions: [
        [ 
            {
                name:"editLatest",
                children:[
                    {
                        code:'edit_latest_version', 
                        name:"edit.currentTab", 
                        action: ({row}) => listProvider.openLatestVersion(row)},
                    {
                        code:'edit_latest_version_new_tab', 
                        name:"edit.newTab", 
                        action: ({row}) => listProvider.openLatestVersion(row, true)
                    },
                ]
            },
            {
                name:"editProduction",
                children:[
                    {
                        code:'edit_production_version', 
                        name:"edit.currentTab",
                        action: ({row}) =>  listProvider.openProductionVersion(row)
                    },
                    {
                        code:'edit_production_new_tab', 
                        name:"edit.newTab",
                        action: ({row}) =>  listProvider.openProductionVersion(row, true)

                    },
                ]
            },{
                name:"listVersion",
                children:[
                    {
                        code:'list_version', 
                        name:"list.version",
                        action:({row}) => listProvider.openVersion(row)
                    },
                    {
                        code:'list_version_new_tab', 
                        name:"list.newTab",
                        action:({row}) => listProvider.openVersion(row, true)
                    },
                ]
            }
            
            
        ],
    ],
    permissionMethod: listProvider.actionPermission,
    dblClickAction:({ row, column, event }:any) => {
        listProvider.openLatestVersion(row)
    },
    optionalConfig:{
        rowConfig:{
            height: 60,
            isCurrent: true,
            isHover: true
        }
    }
})


defineExpose({ reload })
</script>


<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
        </template>
    </VxeGrid>
</template>