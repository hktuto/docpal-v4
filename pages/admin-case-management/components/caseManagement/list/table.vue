<script lang="ts" setup>

import dayjs from 'dayjs'
import type {VxeGridInstance, VxeGridListeners} from 'vxe-table'
const listProvider = inject(CaseManagementListProviderKey)
if(!listProvider) {
    throw new Error('CaseManagementListProviderKey not found')
}
const tableRef = ref<VxeGridInstance<any>>()
const { t } = useI18n()

const {pageNum, pageSize, orderBy, isDesc, filters}= defineProps<{
    pageNum?: number,
    pageSize?: number,
    orderBy?: string,
    isDesc?: boolean,
    filters?: any
}>();

function reload() {
    // tableRef.value.reload()
    tableRef.value?.commitProxy('reload')
}

const tableConfig = reactive(createTableConfig({
    id: 'adminCaseManagementList',
    api: (pageParams:any) => listProvider?.getListApi(pageParams),
    sort:true,
    filter:false,
    pageSize,
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
    menuConfig:{
        body:{
            options:[
               [ 
                    {
                        name:"editLatest",
                        children:[
                            {code:'edit_latest_version', name:"edit.currentTab"},
                            {code:'edit_latest_version_new_tab', name:"edit.newTab"},
                        ]
                    },
                    {
                        name:"editProduction",
                        children:[
                            {code:'edit_production_version', name:"edit.currentTab"},
                            {code:'edit_production_new_tab', name:"edit.newTab"},
                        ]
                    },{
                        name:"listVersion",
                        children:[
                            {code:'list_version', name:"list.version"},
                            {code:'list_version_new_tab', name:"list.newTab"},
                        ]
                    }
                    
                    
               ],
            ]
        },
        visibleMethod ({options, column, row, rowIndex})  {
            options.forEach(list => {
                    list.forEach(item => {
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
                return true;
        }
    },
    sortConfig:{
        remote: true,
        defaultSort: orderBy ? [{field: orderBy, order: isDesc ? 'desc' : 'asc'}] : []
    }
}))

const tableEvent :VxeGridListeners<any> = {
    cellDblclick: ({ row, column, event }:any) => {
        listProvider.openLatestVersion(row)
    },
    menuClick: ({menu, row, column}:any) => {
        switch(menu.code){
            case 'edit_latest_version':
                listProvider.openLatestVersion(row)
                break;
            case 'edit_latest_version_new_tab':
                listProvider.openLatestVersion(row, true)
                break;
            case 'edit_production_version':
                listProvider.openProductionVersion(row)
                break;
            case 'edit_production_new_tab':
                listProvider.openProductionVersion(row, true)
                break;
            case 'list_version':
                listProvider.openVersion(row)
                break;
            case 'list_version_new_tab':
                listProvider.openVersion(row, true)
                break;
        }
    }

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
                        <el-dropdown-item v-loading="tableConfig.loading" @click="listProvider.openLatestVersion(row)">{{$t('editLatest')}}</el-dropdown-item>
                        <el-dropdown-item v-loading="tableConfig.loading" @click="listProvider.openProductionVersion(row)">{{$t('editProduction')}}</el-dropdown-item>
                        <el-dropdown-item v-loading="tableConfig.loading" @click="listProvider.openVersion(row)">{{$t('listVersion')}}</el-dropdown-item>
                        <!-- <el-dropdown-item v-if="row.publishStatus !== 'P' && row.enable" v-loading="tableConfig.loading" @click="handleActive(row, false)">{{$t('actions.inactive')}}</el-dropdown-item>
                        <el-dropdown-item v-else-if="row.publishStatus !== 'P' && !row.enable" v-loading="tableConfig.loading" @click="handleActive(row, true)">{{$t('actions.active')}}</el-dropdown-item> -->
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </template>
    </VxeGrid>
</template>