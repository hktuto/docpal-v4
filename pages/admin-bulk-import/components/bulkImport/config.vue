<template>
<el-card >
    <template #header>
        <div class="card-header">
            <span>{{$t('docType_captureProfile')}}</span>
            <el-button class="button" type="primary"
                @click="handleDialogShow()">{{$t('common_add')}}</el-button>
        </div>
    </template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">

    </VxeGrid>
    
    <BulkImportConfigDialog :name="name" ref="BulkImportConfigDialogRef" @refresh="newSuccess"></BulkImportConfigDialog>
</el-card>
</template>


<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api';
const { name } = defineProps<{
    name: string
}>()
const state = reactive({
    list: [],
    _list: [],
})
const { t} = useI18n()
function newSuccess() {
    ElMessage.success(`${t('msg_success')}`)
    reload()
}

const { tableConfig, tableEvent, tableRef, reload} = useVxeTable({
    id:'admin-bulk-import-config',
    api: async() => {
        const { data } = await adminApi.api.getWorkflowQuerydocumenttypeprofileid({ documentType: name }) as any
        if(data.length > 0) {
            return []
        }
        return data
    },
    virtualScroll: true,
    columns:[
        {
            field:"profileID",
            title: 'dpTable_id'
        },
        {
            field:"profileName",
            title: 'dpTable_name'
        },
    ],
    bodyActions:[
        [
            {
                name: 'delete',
                actions: async (row: any, rowIndex: number) => {
                    handleDelete(row)
                }
            }
        ]
    ]
})


async function handleDelete(row:any) {
    ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
        .then(async() => {
            try {
                await adminApi.api.deleteWorkflowDeletedocumenttypeprofile(row.profileID)
            } catch (error) {
            }
            reload()
        })
}
const BulkImportConfigDialogRef = ref()
function handleDialogShow(row?:any) {
    const data = row ? deepCopy(row) : ''
    BulkImportConfigDialogRef.value.handleOpen(data)
}


</script>

<style lang="scss" scoped>
.el-card {
    display: grid;
    grid-template-rows: min-content 1fr;
    :deep(.el-card__body) {
        overflow: auto;
    }
    .card-header {
        display: flex;
        justify-content: space-between;
    }
}
</style>