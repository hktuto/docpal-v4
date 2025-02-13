<script lang="ts" setup>
import {CaseManagementListProviderKey, MenuRouterKey} from '#imports';
import {ResponsiveFilter, CaseManagementNewDialog , CaseManagementSaveAsDialog} from '#components'
import { adminApi} from 'api'
import { newCaseManagementDetail } from '~/utils/caseManagementHelper';
import tableComponent from '../../caseManagement/list/table.vue'
const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}
const responsiveFilterRef = ref<InstanceType<typeof ResponsiveFilter>>()
const props= defineProps<{
    pageNum: number,
    pageSize: number,
    orderBy?: string,
    isDesc?: boolean,
    filters?: any
}>();
const { pageNum, pageSize, isDesc, orderBy, filters } = toRefs(props)
const filterFormdata = ref();
const dialogRef = ref<InstanceType<typeof CaseManagementNewDialog>>()
const saveAsDialogRef = ref<InstanceType<typeof CaseManagementSaveAsDialog>>()
function updatePageParams({pageNum, pageSize, sort, filters}:any){
    routerProvider?.updateProps({
        pageNum,
        pageSize,
        sort,
        filters
    })
}

const tableRef = ref<InstanceType<typeof tableComponent>>()

function handleFilterFormChange(formData:any) {
    filterFormdata.value = formData
    tableRef.value?.reload()
}

function openLatestVersion(data:any, openInNewTab:boolean = false){
    const newItem = newCaseManagementDetail(data.latestVersionId, data.name, data.latestVersion)
    routerProvider?.navigateTo(newItem, openInNewTab)
}

const selectedItem = ref({
    latestVersion:""
})
function saveAsNewCase(data:any){
    selectedItem.value = data
    saveAsDialogRef.value?.open()
}

function openProductionVersion(data:any, openInNewTab:boolean = false){
    // TODO : promote to production
    const newItem = newCaseManagementDetail(data.productionVersionId, data.name, data.productionVersion)
    routerProvider?.navigateTo(newItem, openInNewTab)
}

function openVersion(data:any, openInNewTab:boolean = false){
    const newItem = newCaseManagementVersionList(data, data.version)
    routerProvider?.navigateTo(newItem, openInNewTab)
}

function openNewCaseDialog(){
    dialogRef.value?.handleOpen()
}

function reload(){
    tableRef.value?.reload()
}
onMounted(() => {
    if(filters.value){
        filterFormdata.value = filters.value
        responsiveFilterRef.value?.setValue('name', filters.value.name)
    }
})

function actionPermission({row, code}:PermissionMethodParams) {
    const isProdcution = row.latestVersion === row.productionVersion
    const hasProdcution = !!row.productionVersion
    switch(code){
        case 'edit_latest_version':
            return {visible:!isProdcution, disabled: isProdcution}
        case 'edit_latest_version_new_tab':
            return {visible:!isProdcution, disabled: isProdcution}
        case 'edit_production_version':
            return {visible:hasProdcution, disabled: !isProdcution}
        case 'edit_production_new_tab':
            return {visible:hasProdcution, disabled: !isProdcution}
        default:
            return {visible:true, disabled: false}
    }
}
provide(CaseManagementListProviderKey,{
    getListApi: (params:any) => {
        let filters:any = undefined;
        if(filterFormdata.value){
            Object.keys(filterFormdata.value).forEach(key => {
                if(filterFormdata.value[key]) params[key] = filterFormdata.value[key]
            })
            filters = {...filterFormdata.value}
        }
        routerProvider?.updateProps({
            pageNum: params.pageNum + 1,
            pageSize: params.pageSize,
            orderBy: params.orderBy,
            isDesc: params.isDesc,
            filters
        })
        return adminApi.api.postCaseTypesPage(params)
    },
    updatePageParams,
    openLatestVersion,
    openProductionVersion,
    actionPermission,
    openVersion,
    saveAsNewCase
})

</script>


<template>
    <div class="pageContainer">
        <CaseManagementListTable ref="tableRef" v-bind="props" >
            <template #toolbar_buttons>
                <div class="actionsContainer">
                    <ResponsiveFilter ref="responsiveFilterRef" @form-change="handleFilterFormChange"
                    inputKey="name"/>
                    <el-button type="primary" @click="openNewCaseDialog">{{$t('button.add')}}</el-button>
                </div>
            </template>
        </CaseManagementListTable>
      <CaseManagementNewDialog ref="dialogRef" @refresh="reload"/>
        <CaseManagementSaveAsDialog ref="saveAsDialogRef" :copyVersion="selectedItem.latestVersion" :data="selectedItem" @close="reload" />
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    width: 100%;
    height: 100%;
    position: relative;
    padding: var(--app-space-xs);
}
.actionsContainer{
    display: flex;
    flex-flow: row nowrap;
    gap: var(--app-space-s);
    justify-content: flex-start;
    align-items: center;
}
</style>