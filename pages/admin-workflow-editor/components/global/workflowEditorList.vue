<script lang="ts" setup>
import {MenuRouterKey, useI18n} from '#imports'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api';
import { workflowEditorListTableSetting } from '../workflowEditorPage/table'

const menuManager = inject(MenuRouterKey)
if(!menuManager) {
    throw createError('menu manger not found')
}
const { t } = useI18n()
const {page, pageSize, time, tab} = defineProps<{
    page:number, pageSize:number, time?:number, tab:any
}>()
const pageParams = {
        pageNum: 0,
        pageSize: 5,
        orderBy: 'createdDate',
        isDesc: true
}

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

    async function getList (param:any) {
        state.loading = true
        try {
            const {data}:any = await adminApi.workflowProcessDefinitionController.postPage(param)
            // await GetWorkflowDraftPageApi({ ...param, ...state.extraParams })
            state.tableData = data.entryList
            state.options.paginationConfig.total = data.totalSize
            state.options.paginationConfig.pageSize = param.pageSize
            state.options.paginationConfig.currentPage = param.pageNum + 1
            console
        } catch (error) {
            throw error
        }
        state.loading = false
    }

    function handlePaginationChange (page: number, pageSize?: number) {
        if(!page) page = pageParams.pageNum + 1
        if(!pageSize) pageSize = pageParams.pageSize
        const time = new Date().valueOf().toString()
        menuManager?.navigateTo({
            menuKey: menuManager.menuSymbol,
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
    watch(
        () => [page, pageSize, time],
        async () => {
            nextTick(() => {

              pageParams.pageNum = (Number(page) - 1) || 0
              pageParams.pageSize = Number(pageSize) || pageParams.pageSize
              getList(pageParams)
            })
        },
        { immediate: true, deep:true }
    )

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
    menuManager?.navigateTo({
        menuKey: menuManager.menuSymbol,
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
// #region module: ResponsiveFilterRef
    function handleFilterFormChange(formModel:any) {

    if (!formModel.isDesc) formModel.isDesc = true
    if (!!formModel.isDesc) formModel.isDesc = formModel.isDesc === 'false' ? false : true
    let filterParams = {
        name: formModel.name === "" ? undefined : formModel.name,
        orderBy: formModel.orderBy === undefined || formModel.orderBy === "" ? "createdDate" : formModel.orderBy,
        isDesc: formModel.isDesc
    };
    state.extraParams = filterParams
    handlePaginationChange(1)
    }
// #endregion
const ResponsiveFilterRef = ref()
onMounted(() => {
    // TODO: move ResponsiveFilterRef from old repo to here
    if(!ResponsiveFilterRef.value) return;
        ResponsiveFilterRef.value.init(
            [{ key: "orderBy", label: "tableHeader.sortBy", type: "string", isMultiple: false,
                    options: [
                        { label: 'table_name', value: 'name' },
                        { label: 'dpTable_status', value: 'publishStatus' },
                        { label: 'workflow_createDate', value: 'createdDate' },
                    ]
                },
                { key: "isDesc", label: "tableHeader.sortOrder", type: "string", isMultiple: false,
                    options: [
                        { label: 'tableHeader.desc', value: false },
                        { label: 'tableHeader.asc', value: true }
                    ]
        }])
})
</script>

<template>
    <div class="pageContainer">
        
        <WorkflowEditorPageList 
            :loading="state.loading" 
            :columns="tableSetting.columns" 
            :table-data="state.tableData" 
            :options="state.options" 
            @handleAction="handleAction"
            @handleDblclick="handleDblclick"
            @handlePaginationChange="handlePaginationChange"
            @handleAdd="handleAdd"
            @inactive="handleDeactive"
            @active="handleActive"
        />
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    padding: var(--app-space-s);
}
</style>