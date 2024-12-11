<script lang="ts" setup>
import type {VxeGrid} from 'vxe-table'
import {adminApi} from 'api';
import dayjs from 'dayjs'

const { id, name, draftId, latestVersion } = defineProps<{
    id:string,
    draftId:string,
    name:string
    latestVersion:string
}>()
const workflowData = ref<any>()

const routerProvider = inject(MenuRouterKey)
const tabProvider = inject(TabManagerKey)
if(!routerProvider || !tabProvider) {
    throw new Error('MenuRouterKey is not provided')
}
const tableRef = ref<InstanceType<typeof VxeGrid>>()
const tableConfig = createTableConfig({
    id: 'workflowEditorVersionTableSetting',
    api: (pageParams:any) => adminApi.workflowVersionController.postPage({...pageParams, draftId:id || draftId}),
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
                const isProduction = row.isProduction === 'A'
                const isLatest = row.versionNumber === workflowData.value.latestVersion
                options.forEach(list => {
                    list.forEach(item => {
                        if(item.code === 'edit' || item.code === 'edit_new_tab'){
                            item.disabled = !isLatest || isProduction
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

const tableEvent = {
    menuClick: ({menu, row, column}:any) => {
        switch(menu.code){
            case 'edit':
                editHandler(row)
                break;
            case 'edit_new_tab':
                editNewTabHandler(row)
                break;
            case 'promote_to_production':
                break;
            case 'save_as_new_version':
                break;
        }
    }
}


async function getWorkflowDetail(){
    const {data: draftData}:any = await adminApi.workflowProcessDefinitionController.getDraft(draftId)
    workflowData.value = draftData
    routerProvider?.updateTabName(draftData.name + '- versions list' )
}

function editHandler(row:any){
    routerProvider?.navigateTo({
        menuKey: routerProvider?.menuSymbol,
        id: "workflow-editor-detail-" + workflowData.value.id + new Date().getTime(),
        name: "workflow-editor-detail-" + workflowData.value.id,
        icon: 'dp-icon:flow-outline',
        label: workflowData.value.name,
        component: 'LazyWorkflowEditorDetail',
        props: {
            id: row.draftId,
            draftId: row.draftId,
            currentVersion: row.versionNumber,
            name: row.name,
            item: row,
        }
    })
}

function editNewTabHandler(row:any){
    tabProvider?.openTab({
        id: "workflow-editor-detail-" + workflowData.value.id + new Date().getTime(),
        name: "workflow-editor-detail-" + workflowData.value.id,
        icon: 'dp-icon:flow-outline',
        label: workflowData.value.name,
        component: 'LazyWorkflowEditorDetail',
        props: {
            id: row.draftId,
            draftId: row.draftId,
            currentVersion: row.versionNumber,
            name: row.name,
            item: row,
        }
    })
}

onMounted(async () => {
    await getWorkflowDetail()
})


</script>

<template> 
<div class="pageContainer">
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
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
                        <ElDropdownItem @click="editHandler(row)">Edit</ElDropdownItem>
                        <ElDropdownItem @click="editNewTabHandler(row)">Edit in new tab</ElDropdownItem>
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