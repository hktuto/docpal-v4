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

    ],
},{
    menuConfig:{
        body:{
            options:[
                []
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
        }
    },
    sortConfig:{
        remote: true,
        defaultSort: orderBy ? [{field: orderBy, order: isDesc ? 'desc' : 'asc'}] : []
    }
},{}))

const tableEvent :VxeGridListeners<any> = {
}

defineExpose({ reload })
</script>

<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
        </template>
    </VxeGrid>
</template>