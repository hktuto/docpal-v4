<script lang="ts" setup>
import { adminApi } from 'api'
import { provide } from 'vue';

const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}

const props = defineProps<{
    pageNum: number,
    pageSize: number,
    orderBy?: string,
    isDesc?: boolean,
    filters?: any
}>()
const { pageNum, pageSize, isDesc, orderBy, filters } = toRefs(props)

const filterData = ref();
const ResponsiveFilterRef = ref();


provide(InternalShareListProviderKey, {
    getListApi: (params:any) => {
        let filters:any = undefined;
        if(filterData.value){
            Object.keys(filterData.value).forEach(key => {
                if(filterData.value[key]) params[key] = filterData.value[key]
            })
            filters = {...filterData.value}
        }
        routerProvider?.updateProps({
            pageNum: params.pageNum + 1,
            pageSize: params.pageSize,
            orderBy: params.orderBy,
            isDesc: params.isDesc,
            filters
        })
        return adminApi.api.postInternalsharePage(params)
    },
    actionPermission: (args:PermissionMethodParams) => {
        return {visible:true, disabled: false}
    }
})

</script>


<template>
<div class="pageContainer">
    
</div>

</template>