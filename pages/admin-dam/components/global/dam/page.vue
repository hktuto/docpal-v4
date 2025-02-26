<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api'
import {DamListTable} from '#components'
// deepCopy, GetDocDetailApi

// #region  tree
const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
if(!tabProvider || !routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}
// #endregion
const tableRef = ref<InstanceType<typeof DamListTable>>();
const tableData = ref([]);
const filteredData = ref<any[]>();
const { t } = useI18n()
function handleKeywordFilter(data:any) {
    console.log("handleKeywordFilter", data)
}


async function handleDelete (tag:any) {
    ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
    .then(async() => {
        await adminApi.api.postDamDeletesettings([tag.id])
        tableRef.value?.reload()
    })
    
}

function handleDialog(data?:any) {
    console.log("handleDialog", data)
    DamDialogRef.value.handleOpen(deepCopy(data))
}

const DamDialogRef = ref();

provide(DamProviderKey, {
    getListApi: async(params:any) =>{
        console.log("getListApi", params, filteredData.value)
        if(!filteredData.value ){
            const { data:{list} } = await adminApi.api.postDamGetallsetting() as any
            const data = mergeDataByKey(list, 'sourceType') as any
           
            tableData.value = data
            filteredData.value = data
            return data
        }
        return filteredData.value
    },
    handleDialog,
    handleDelete
})

</script>


<template>
     <div class="pageContainer--padding">
        <DamListTable ref="tableRef">
            <template #toolbar_buttons>
                <div class="filter-container">
                    <KeywordFilter :list="tableData" attr="sourceType"
                        @filter="handleKeywordFilter"></KeywordFilter>
                    <el-button class="button-add" type="primary"
                        @click="handleDialog()">{{$t('common_add')}}</el-button>
                </div>
            </template>
        </DamListTable>
        <DamDialog ref="DamDialogRef" @refresh="tableRef?.reload"></DamDialog>

    </div>   
</template>

<style lang="scss" scoped>
</style>