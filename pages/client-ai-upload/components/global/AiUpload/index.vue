<template>
    <div class="pageContainer--padding">
        <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
            <template #toolbar_buttons>
                <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange"
                    inputKey="fileName" inputPlaceHolder="tip.fileOrFolderName" />
            </template>
            <template #path="{row, index}">
                <path-tab-button :path="row.nuxeoPath" :displayPath="row.uploadPath" :canOpen="row.nuxeoPath"/>
            </template>
            <template #status="{ row, index }">
                <el-tag :type="getTagType(row.uploadStatus )">
                    {{ $t(`ai.status.${row.uploadStatus}`) }}
                </el-tag>
            </template>
        </VxeGrid>
        <AiUploadPreviewDialog ref="AiUploadPreviewDialogRef" />
    </div>
</template>

<script lang="ts" setup>
import {useVxeTable} from '#imports'
import { ElMessageBox } from 'element-plus'
import {clientApi, publicApi} from 'api'
import { createAiUploadDetail } from '../../../utils/aiUpoloadHelper'

const routerProvider = inject(MenuRouterKey)

const { t } = useI18n()
const userId = useUserId()

// #region module: ResponsiveFilterRef
const ResponsiveFilterRef = ref()
    const extraParams = ref<any>({})
    async function getFilter() {
        const data = [
            { key: "fileUploadStatus", label: t('common_status'), type: "string", 
                options: [
                        { label: 'ai.status.Prepare', value: 'Prepare'},
                        { label: 'ai.status.Ready', value: 'Ready' },
                        { label: 'ai.status.Confirmed', value: 'Confirmed' },
                        { label: 'ai.status.Canceled', value: 'Canceled' },
                        // { label: 'Progress', value: 'Progress' },
                    ]
            }
        ]
        ResponsiveFilterRef.value.init(data)
    }
    function handleFilterFormChange(formModel) {
        console.log("handleFilterFormChange", formModel)
        extraParams.value = formModel
        reload()
    }
// #endregion


const { tableConfig, tableEvent, tableRef, reload } = useVxeTable({
    id: 'client-ai-upload',
    api: async(pageParams:any) => {
        if(!pageParams.orderBy) {
            pageParams.orderBy = 'createdDate'
            pageParams.isDesc = true
        }
        pageParams.userId = userId.value
        console.log("extraParams", extraParams.value)
        if(extraParams.value){
            pageParams = {
                ...pageParams,
                ...extraParams.value
            }
        }
        const { data:response } = await clientApi.api.postNuxeoDocumentQueryuploadfiledtopage(pageParams) as any
        return {
            data: {
                entryList: response.content,
                totalSize: response.totalElements
            }
        }
    },
    defaultSort: {field:'createdDate', order:'desc'},
    rowKey: 'id',
    columns: [
        {
            title:"tableHeader_path",
            field:"uploadPath",
            slots:{
                default: 'path'
            }
        },
        {
            field:'createdDate',
            title:"dpTable_createdDate",
            formatter: ({ cellValue }:any) => {
                return formatDate(cellValue)
            }
        },
        {
            title:"tableHeader_filesCount",
            field:'filesCount',
        },
        {
            field:'uploadStatus',
            title:"common_status",
            slots:{
                default: 'status'
            }
        }
    ],
    dblClickAction: ({ row, column, event }:any) => {
        dblclickHandler(row)
    },
    bodyActions: [
        [
            {
                code:'open',
                name:'Open',
                action: ({row}:any) => {
                    dblclickHandler(row)
                }
            },
            {
                code:'showStructure',
                name:'Show Structure',
                action: ({row}:any) => {
                    showStructure(row)
                }
            },
            {
                code:'delete',
                name:'Delete',
                action: ({row}:any) => {
                    handleDelete(row.id)
                }
            }
        ]
    ]
})

function dblclickHandler(row:any) {
    if(row.uploadStatus === 'Ready') {
        const item = createAiUploadDetail({
            id: row.uploadId,
            status: row.uploadStatus
        })
        routerProvider?.navigateTo(item)
    } else {
        showStructure(row)
    }
}
// #region module: page
    
    function getTagType(status) {
        const map = {
            Prepare: 'info',
            Ready: '',
            Confirmed: 'success',
            Canceled: 'danger',
            Error: 'info',
        }
        return map[status] || map[status] === '' ? map[status] : 'warning'
    }


async function handleDelete(id: any) {
    const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
    if(action !== 'confirm') return
    await publicApi.api.deleteUserDashboardId(id )
    reload()
}

const AiUploadPreviewDialogRef = ref()
function showStructure(row) {
    AiUploadPreviewDialogRef.value.handleOpen(row)
}



onMounted(() => {
    getFilter()
})
</script>

<style lang="scss" scoped>
</style>
