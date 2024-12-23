<script lang="ts" setup>
import {CaseManagementListProviderKey, MenuRouterKey} from '#imports';
import { adminApi} from 'api'

const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}

const props= defineProps<{
    pageNum: number,
    pageSize: number,
    sort: any,
    filters: any,
}>();
const { pageNum, pageSize, sort, filters } = toRefs(props)

function updatePageParams({pageNum, pageSize, sort, filters}:any){
    routerProvider?.updateProps({
        pageNum,
        pageSize,
        sort,
        filters
    })
}

const tableRef = ref()


provide(CaseManagementListProviderKey,{
    getListApi: (params:any) => adminApi.caseTypeController.postList(params),
    updatePageParams
})

</script>


<template>
    <div class="pageContainer">
        <CaseManagementListTable ref="tableRef" />
    </div>
</template>

<style lang="scss" scoped>

</style>