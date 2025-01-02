<script lang="ts" setup>
import {TabManagerKey, MenuRouterKey} from '#imports'
import { dayjs } from 'element-plus';

const tabManager = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)

if(!tabManager) {
    throw createError('tab manger not found')
}

const defaultPageList = [
    {
        id: 'browse',
        name: 'browse',
        userGroup: ['admin','member'],
    }
]
const { tableConfig , tableEvent, tableRef } = useVxeTable({
    id: 'pageSetupTableSetting',
    columns:  [
        {
            field: 'name',
            title: 'Name',
            minWidth: 120,
            fixed: 'left',
        },
        {
            field: 'userGroup',
            title: 'User Group',
            minWidth: 120,
            formatter ({ cellValue }:any) {
                return cellValue.join(',')
            }
        },
        {
            field:'action',
            title: 'Action',
            width: 65,
            fixed: 'right',
            slots:{
                default:'action'
            }
        }
    ],
    dblClickAction: ({ row, column, event }:any) => {
        handleDblclick(row)
    },
    bodyActions: [
        [
            { 
                code: 'edit', 
                name: 'Edit',
                action: ({row}:any) => {
                    handleDblclick(row)
                }
            }
        ]
    ],
    optionalConfig:{
        data:defaultPageList
    }
});

function handleDblclick(data:any){
    const newItem = {
        id: 'page-setup-detail-' + new Date().getTime(),
        name: 'page-setup-detail-' + data.id,
        label: data.name + ' setting',
        icon : 'lucide:columns-2',
        component: 'LazyPageSetupDetail',
        props:{
            id:data.id,
            item:data
        }
    }
    routerProvider?.navigateTo({...newItem})

}
</script>

<template>
    <div class="pageContainer">
        <vxe-grid
        ref="tableRef"
            v-bind="tableConfig"
            v-on="tableEvent"
        >
        <template #toolbar_buttons>

        </template>
            <template #action="{row, rowIndex}">
                <ElDropdown >
                    <ElButton type="primary" link>
                        <ElIcon><SvgIcon src="/icons/dots.svg"/></ElIcon>
                    </ElButton>
                    <template #dropdown>
                        <ElDropdownMenu>
                            <ElDropdownItem @click="handleDblclick(row)">Edit</ElDropdownItem>
                            
                        </ElDropdownMenu>
                    </template>
                </ElDropdown>
            </template>
        </vxe-grid>
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    padding: var(--app-space-s);
    height: 100%;
    overflow: hidden;
}
</style>