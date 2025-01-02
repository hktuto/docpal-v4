<script lang="ts" setup>
import dayjs from 'dayjs'
import type {VxeGridInstance, VxeGridListeners} from 'vxe-table'
const listProvider = inject(CaseManagementVersionProviderKey)
if(!listProvider) {
    throw new Error('CaseManagementListProviderKey not found')
}
const gridRef = ref<VxeGridInstance<any>>()

const {pageNum, pageSize, orderBy, isDesc, filters}= defineProps<{
    pageNum?: number,
    pageSize?: number,
    orderBy?: string,
    isDesc?: boolean,
    filters?: any
}>();
function reload(){
    gridRef.value?.commitProxy('reload')
}

const { tableConfig , tableEvent } = useVxeTable({
    id: 'adminCaseManagementVersionList',
    api: (pageParams:any) => listProvider?.getListApi(pageParams),
    remoteSort: true,
    defaultSort: orderBy ? [{field: orderBy, order: isDesc ? 'desc' : 'asc'}] : [],
    pageSize,
    columns:  [
        {
            field:'versionNumber',
            title: 'table_version',
            sortable: true,
            fixed:'left',
        },
        {
            field:"production",
            title: "dpTable_status",
            sortable: true,
        },
        {
            field:"modifiedDate",
            title: "dpTable_updateDate",
            sortable: true,
            formatter ({ cellValue }:any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
        {
            field:"modifiedBy",
            title: "dpTable_updatedBy",
            sortable: true,
        },
        {
            field:"createdDate",
            title: "dpTable_createDate",
            sortable: true,
            formatter ({ cellValue }:any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
        {
            field:"createdBy",
            title: "dpTable_createdBy",
            sortable: true,
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
    dblClickAction: ({ row, column, event }:any) => {
        listProvider.openVersionDetail(row)
    },
    bodyActions: [
        [
            {
                name: "edit",
                children:[
                    {
                        code:'edit_version', 
                        name:"edit.currentTab",
                        action: ({row}:any) => {
                            listProvider.openVersionDetail(row)
                        }
                    },
                    {
                        code:'edit_version_new_tab', 
                        name:"edit.newTab",
                        action: ({row}:any) => {
                            listProvider.openVersionDetail(row)
                        }
                    },
                ]
            },
            {
                name:'save_as_new_version',
                code: 'save_as_new_version',
                action: ({row}:any) => {
                    listProvider.saveAsNewVersion(row)
                }
            },
            {
                code: "promote_version",
                name:"promote",
                action: ({row}:any) => {
                    listProvider.promoteVersion(row)
                }
            }
        ]
    ],
    permissionMethod: listProvider.actionPermission,
})

defineExpose({ reload })
</script>

<template>
    <VxeGrid ref="gridRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
        </template>
        <template #actions="{row}">
            <!-- <el-dropdown >
                <SvgIcon src="/icons/dots.svg"></SvgIcon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :disabled="listProvider.actionPermission(row, 'edit_version').disabled"  @click="listProvider.openVersionDetail(row)">{{$t('edit')}}</el-dropdown-item>
                        <el-dropdown-item :disabled="listProvider.actionPermission(row, 'save_as_new_version').disabled"  @click="listProvider.saveAsNewVersion(row)">{{$t('save_as_new_version')}}</el-dropdown-item>
                        <el-dropdown-item :disabled="listProvider.actionPermission(row, 'promote_version').disabled"  @click="listProvider.promoteVersion(row)">{{$t('promote_to_production')}}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown> -->
        </template>
    </VxeGrid>
</template>