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

const tableConfig = reactive(createTableConfig({
    id: 'adminCaseManagementVersionList',
    api: (pageParams:any) => listProvider?.getListApi(pageParams),
    sort:true,
    filter:false,
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
},{
    menuConfig:{
        body:{
            options:[
                [
                    {
                        name: "edit",
                        children:[
                            {code:'edit_version', name:"edit.currentTab"},
                            {code:'edit_version_new_tab', name:"edit.newTab"},
                        ]
                    },
                    {
                        name:'save_as_new_version',
                        code: 'save_as_new_version',
                    },
                    {
                        code: "promote_version",
                        name:"promote",
                    }
                ]
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
        listProvider.openVersionDetail(row)
    },
    menuClick: ({menu, row, column}:any) => {
        switch(menu.code){
            case 'edit_version':
                listProvider.openVersionDetail(row)
                break;
            case 'edit_version_new_tab':
                listProvider.openVersionDetail(row, true)
                break;
            case 'save_as_new_version':
                listProvider.saveAsNewVersion(row)
                break;
            case 'promote_version':
                listProvider.promoteVersion(row)
                break;
        }
    }
}

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