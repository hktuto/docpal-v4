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
    columns:  [
        {
            field:'name',
            title: 'table_name',
            sortable: true,
            fixed:'left',
        },
        {
            field:'latestVersion',
            title: 'workflow_latestVersion',
        },
        {
            field:'productionVersion',
            title: 'workflow_productionVersion',
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
    visibleMethod: ({options, column, row, rowIndex}) => {
        options.forEach((section:TableMenuActions[]) => {
            section.forEach((item:TableMenuActions) => {
                if(item.children){
                    // loop all children , and set visible and disabled
                    // if all children are not visible , set iten.visible = false
                    // if all children are disabled , set item.disabled = true
                    item.children.forEach(child => {
                        const {visible, disabled} = listProvider.actionPermission(row, child.code as string)
                        child.visible = visible
                        child.disabled = disabled
                    })
                    const allVisible = item.children.every(child => child.visible)
                    const allDisabled = item.children.every(child => child.disabled)
                    item.visible = allVisible
                    item.disabled = allDisabled
                }else{
                    const {visible, disabled} = listProvider.actionPermission(row, item.code as string)
                    item.visible = visible
                    item.disabled = disabled
                }
            })
        })
        return options;
    },
    dblClickAction:({ row, column, event }:any) => {
        listProvider.openLatestVersion(row)
    },
    optionalConfig:{
        sortConfig:{
            remote: true,
            defaultSort: orderBy ? [{field: orderBy, order: isDesc ? 'desc' : 'asc'}] : []
        },
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