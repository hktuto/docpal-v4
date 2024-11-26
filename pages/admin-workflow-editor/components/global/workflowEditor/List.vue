<script lang="ts" setup>
import {TabManagerKey, useI18n, workflowEditorListTableSetting} from '#imports'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api';
import { createTableConfig } from '../../../../../packages/base/utils/tableHelper';



const tabManager = inject(TabManagerKey)
if(!tabManager) {
    throw createError('menu manger not found')
}
const { t } = useI18n()
const {page, pageSize, time, tab} = defineProps<{
    page:number, pageSize:number, time?:number, tab:any
}>()


const pageParams = reactive({
    pageNum: 0,
    pageSize: 20,
    totalSize:0,
    
})
const tableSetting = workflowEditorListTableSetting
    const state = reactive({
        loading: false,
        tableData: [],
        options: {
            showPagination: true,
            paginationConfig: {
                total: 0,
                currentPage: 1,
                pageSize: pageParams.pageSize
            },
            rowKey: 'id'
        },
        extraParams: {}
    })

    async function getList (param?:any) {
        state.loading = true
        try {

            const {data}:any = await adminApi.workflowProcessDefinitionController.postPage(pageParams)
            // await GetWorkflowDraftPageApi({ ...param, ...state.extraParams })
            state.tableData = data.entryList
            pageParams.totalSize = data.totalSize
            pageParams.pageSize = param.pageSize
            state.options.paginationConfig.total = data.totalSize
            state.options.paginationConfig.pageSize = param.pageSize
            state.options.paginationConfig.currentPage = param.pageNum + 1
        } catch (error) {
            throw error
        }
        state.loading = false
    }

    function handlePaginationChange (page: number, pageSize?: number) {
        if(!page) page = pageParams.pageNum + 1
        if(!pageSize) pageSize = pageParams.pageSize
        const time = new Date().valueOf().toString()
        tabManager?.navigateTo({
            menuKey: tabManager.menuSymbol,
            id:'workflow-editor-list',
            label: "Workflow Editor List",
            icon: "dp-icon:flow-outline",
            component: "LazyWorkflowEditorList",
            props: {
                page, pageSize, time
            }
        })
        // scroll top

    }

    function handleAction (command:string, row: any, rowIndex: number) {
    switch (command) {
        case 'edit':
            handleDblclick(row)
            break
    }
}


async function handleDeactive(row:any) {
    const action = await ElMessageBox.confirm(`${t('msg.confirmWhetherToDeactivate')}`)
    if(action !== 'confirm') return
    state.loading = true
    await adminApi.workflowProcessDefinitionController.deleteSuspend(row.id)
    // await DeactiveWorkflowApi(row.id)
    state.loading = false
    handlePaginationChange(1)
}
async function handleActive(row:any) {
    state.loading = true
    try {
        await adminApi.workflowProcessDefinitionController.postActive(row.id)

        // await ActiveWorkflowApi(row.id)
        handlePaginationChange(1)
    } catch (error) {
    }
    state.loading = false
}
function handleDblclick(row:any) {
    tabManager?.navigateTo({
        menuKey: tabManager.menuSymbol,
        id: 'workflow-editor-detail',
        icon: 'dp-icon:flow-outline',
        label: 'workflowEditorDetail',
        component: 'LazyWorkflowEditorDetail',
        props: {
            id: row.id
        }
    })
}
const WorkflowEditorDialogRef = ref()
function handleAdd () {
    WorkflowEditorDialogRef.value.handleOpen()
}

const config = createTableConfig(
    "workflowEditorListTableSetting", 
    adminApi.workflowProcessDefinitionController.postPage,
    [
                {
                    field: 'name',
                    title: 'Name',
                    fixed:'left',
                    'min-width': 100,
                },
                {
                    field: 'productionVersion',
                    title: 'productionVersion',
                    'min-width': 100,
                },
                {
                    field: 'latestVersion',
                    title: 'latestVersion',
                    'min-width': 100,
                },
                {
                    field:'modifiedBy',
                    title: 'modifiedBy',
                    'min-width': 100,
                },
                {
                    title: 'Action',
                    fixed: 'right',
                    width: 60,
                }
            ]
)

onMounted(() => {
    // TODO: move ResponsiveFilterRef from old repo to here

})
</script>

<template>
    <div class="pageContainer">
        <vxe-grid
            v-bind="config"
        > </vxe-grid>

    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    padding: var(--app-space-s);
    height: 100%;
    overflow: hidden;
    position: relative;
}
</style>