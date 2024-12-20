<script lang="ts" setup>
import dayjs from 'dayjs'
import type {VxeGrid} from 'vxe-table'

const listProvider = inject(WorkflowEditorVersionListProviderKey)
if(!listProvider) {
    throw new Error('WorkflowEditorVersionListProviderKey not found')
}

const { draftId } = defineProps<{
    draftId:string
}>()

const tableRef = ref<InstanceType<typeof VxeGrid>>()
const tableConfig = createTableConfig({
    id: 'workflowEditorVersionTableSetting',
    api: (pageParams:any) => listProvider.getListApi({...pageParams, draftId}),
    columns:  [
        {
            field: 'versionNumber',
            title: 'Version',
            minWidth: 60,
            fixed: 'left',
            sortable: true,
        },
        {
            field:'isProduction',
            title: 'Production',
            minWidth: 60,
            formatter ({ cellValue }:any) {
                return cellValue === 'A' ? 'Production' : '--'
            }
        },
        {
            field: 'modifiedDate',
            title: 'modifiedDate',
            minWidth: 120,
            sortable: true,
            formatter ({ cellValue }:any) {
                return dayjs(cellValue).format('YYYY-MM-DD HH:mm')
            }
        },
        {
            field: 'createdBy',
            title: 'createdBy',
            minWidth: 120,
            sortable: true,
        },
        {
            field: 'modifiedBy',
            title: 'modifiedBy',
            minWidth: 120,
            sortable: true,
        },
        {
            title: 'Action',
            width: 65,
            fixed: 'right',
            slots:{
                default:'action'
            }
        }
    ],
    },
    {
        menuConfig:{
            body:{
                options:[
                    [
                        { code: 'edit', name: 'Edit', visible: true, disabled: false },
                        { code: 'edit_new_tab', name: 'Edit in new tab', visible: true, disabled: false },
                        { code: 'promote_to_production', name: 'Promote to Production', visible: true, disabled: false },
                        { code: "save_as_new_version", name: "Save as new version", visible: true, disabled: false },
                    ]
                ]
            },
            visibleMethod: ({options, column, row, rowIndex}) => {
                // options 是 menuConfig 中的 body 配置
                
                options.forEach(list => {
                    list.forEach(item => {
                        const {visible, disabled} = listProvider.actionPermission(row, rowIndex, item.code)
                        item.visible = visible
                        item.disabled = disabled
                    })
                })
                return true;
            }
        },
        sortConfig: {
            remote: true,
            defaultSort:[
                {
                    field: 'versionNumber',
                    order: 'desc'
                }
            ]
        },
    }
)

const tableEvent = {
    cellDblclick:({ row, column, rowIndex }) => {
        listProvider.editHandler(row)
    },
    menuClick: ({menu, row, column}:any) => {
        switch(menu.code){
            case 'edit':
                listProvider.editHandler(row)
                break;
            case 'edit_new_tab':
                listProvider.editNewTabHandler(row)
                break;
            case 'promote_to_production':
                break;
            case 'save_as_new_version':
                break;
        }
    }
}


</script>

<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
            <slot name="toolbar_buttons" />
            
        </template>
        <template #action="{row, rowIndex}"> 
            <ElDropdown >
                <ElButton type="primary" link>
                    <ElIcon><SvgIcon src="/icons/dots.svg"/></ElIcon>
                </ElButton>
                <template #dropdown>
                    <ElDropdownMenu>
                        <ElDropdownItem @click="listProvider.editHandler(row)">Edit</ElDropdownItem>
                        <ElDropdownItem @click="listProvider.editNewTabHandler(row)">Edit in new tab</ElDropdownItem>
                    </ElDropdownMenu>
                </template>
            </ElDropdown>       
        </template>
    </VxeGrid>
</template>