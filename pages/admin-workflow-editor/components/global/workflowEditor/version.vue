<script lang="ts" setup>
import {adminApi} from 'api';
import dayjs from 'dayjs'

const { id, name, latestVersion } = defineProps<{
    id:string,
    name:string
    latestVersion:string
}>()

const tableConfig = createTableConfig({
    id: 'workflowEditorVersionTableSetting',
    api:  (pageParams:any) => adminApi.workflowVersionController.postPage({...pageParams, id:id}),
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
                    { code: 'promote_to_production', name: 'Promote to Production', visible: true, disabled: false },
                    { code: "save_as_new_version", name: "Save as new version", visible: true, disabled: false },
                ]
            ]
        },
        visibleMethod: ({options, column, row, rowIndex}) => {
            // options 是 menuConfig 中的 body 配置
            console.log(row, latestVersion)
            const isProduction = row.isProduction === 'A'
            const isLatest = row.versionNumber === latestVersion
            options.forEach(list => {
                console.log(list)
                list.forEach(item => {
                    if(item.code === 'edit'){
                        item.disabled = isLatest && !isProduction
                    }
                    if(item.code === 'promote_to_production'){
                        item.disabled = isProduction
                    }
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
</script>

<template> 
<div class="pageContainer">

    <VxeGrid v-bind="tableConfig">
        <template #toolbar_buttons>
            <h2>{{ name }}</h2>
        </template>
        <template #action="{row, rowIndex}"> 
                <ElDropdown >
                    <ElButton type="primary" link>
                        <ElIcon><SvgIcon src="/icons/dots.svg"/></ElIcon>
                    </ElButton>
                    <template #dropdown>
                        <ElDropdownMenu>
                            <ElDropdownItem >Edit</ElDropdownItem>
                            
                        </ElDropdownMenu>
                    </template>
                </ElDropdown>       
            </template>
    </VxeGrid>
</div>
</template>

<style lang="scss" scoped>
h2{
    margin: 0;
}
.pageContainer{
    padding: var(--app-space-s);
    height: 100%;
    overflow: hidden;
}
</style>