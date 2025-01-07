<script lang="ts" setup>
import { adminApi } from 'api';
import {BulkImportListTable} from '#components'
import { newBulkImportDetail } from '~/utils/bulkImportRouter';
import {ElMessageBox, ElMessage} from 'element-plus';
const routerProvider = inject(MenuRouterKey)

if(!routerProvider) {
    throw createError('provider not found')
}
const {t} = useI18n()
const props = defineProps<{
    orderBy?: string,
    isDesc?: boolean,
    filters?: any
}>();

const allMetaSetting = ref<any>();
const allMetaList = ref<any>();
const MetaAddDocTypeDialogRef = ref()
function handleAdd(){
    MetaAddDocTypeDialogRef.value.handleOpen(allMetaList.value)
}
const tableRef = ref<InstanceType<typeof BulkImportListTable>>()
provide(BulkImportListProviderKey, {
    getListApi: async(params:any) => {
        let [
            {data:metaSettingData},
            {data:documentTypeProfileList},
            {data:metaMappingList}
        ]:any = await Promise.all([
            adminApi.api.getNuxeoAdminSetting(""),
            adminApi.api.getWorkflowQuerydocumenttypeprofile(),
            adminApi.api.getWorkflowQuerymetadatamapping(),
        ]) 
        allMetaSetting.value = metaSettingData
        console.log("response", metaSettingData, documentTypeProfileList, metaMappingList)
        const metaList:any[] = []
        
        metaMappingList.forEach((item:any) => {
            if (!!item.metaDataMapper) {
                if(metaSettingData[item.name]) {
                    metaSettingData[item.name].mappingMeta = JSON.parse(item.metaDataMapper)
                }
            }
        })
        documentTypeProfileList.forEach((item:any) => {
            if (item.profileName) {
                if(metaSettingData[item.documentType]) {
                    if(!metaSettingData[item.documentType].bulkImportConfigs){
                        metaSettingData[item.documentType].bulkImportConfigs = []
                    }
                    metaSettingData[item.documentType].bulkImportConfigs.push(item.profileName)
                }
            }
        })
        Object.keys(metaSettingData).forEach(key => {
            metaList.push({ ...metaSettingData[key], documentType: key })
        })
        const response = metaList.sort((a,b)=> (a.documentType.localeCompare(b.documentType) ))
        allMetaList.value = response
        //TODO : handle sort local
        return response

    },
    handelDblclick:(row:any) => {
        const newItem = newBulkImportDetail(row)
        routerProvider?.navigateTo(newItem)
    },
    handelDelete: async(row:any) => {
        ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`).then( async() => {

            const newMetaList = {...allMetaSetting.value}
            delete newMetaList[row.documentType]
            await adminApi.api.putNuxeoAdminSetting("",newMetaList)
            // TODO : show pop confirm to remove
            
            tableRef.value?.reload()
        })
    },
    permissionMethod: (params:PermissionMethodParams) => {
        return {visible:true, disabled: false}
    }
})


function addSuccess(){
    ElMessage.success(
            t('dpMsg_success')
        )
    tableRef.value?.reload()
}


</script>


<template>
     <div class="pageContainer">
        <BulkImportListTable ref="tableRef">
            <template #toolbar_buttons>
                <KeywordFilter attr="documentType"
                            ></KeywordFilter>
                <el-button class="button-add" type="primary"
                    @click="handleAdd()">{{$t('common_add')}}</el-button>
            </template>
        </BulkImportListTable>
        <BulkImportAddDocTypeDialog ref="MetaAddDocTypeDialogRef" :metaSettingData="allMetaSetting" @refresh="addSuccess" ></BulkImportAddDocTypeDialog>
        </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    width: 100%;
    height: 100%;
    position: relative;
    padding: var(--app-space-xs);
    overflow: hidden;
}
</style>