<script lang="ts" setup>
import {CaseManagementListProviderKey, MenuRouterKey} from '#imports';
import {ResponsiveFilter, CaseManagementNewDialog} from '#components'
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

function openLatestVersion(data:any){
    const newItem = newCaseManagementDetail(data)
    routerProvider?.navigateTo(newItem)
}

function openProductionVersion(data:any){
    const newItem = newCaseManagementDetail(data)
    routerProvider?.navigateTo(newItem)
}


function openNewCaseDialog(){
    dialogRef.value?.handleOpen()
}

function reload(){
    tableRef.value?.reload()
}
onMounted(() => {
    console.log("mounted", props)
})
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
        
        return adminApi.caseTypeController.postPage(params)
    },
    updatePageParams,
    openLatestVersion,
    openProductionVersion
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
      <CaseManageNewDialog ref="dialogRef" @refresh="reload"/>

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