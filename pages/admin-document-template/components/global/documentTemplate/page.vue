<script lang="ts" setup>
import { provide, toRefs, ref } from 'vue';
import { DocumentTemplateListTable } from '#components'
import { adminApi } from 'api'
import { DocumentTemplateProviderKey } from '~/utils/documentTemplateHelper';
const { t } = useI18n()

const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw createError('MenuRouterKey is not provided')
}

const props = defineProps<{
    pageNum: number,
    pageSize: number,
    orderBy: string,
    isDesc: boolean
    filters?: any
}>();
const { pageNum, pageSize, isDesc, orderBy, filters } = toRefs(props)

const tableRef = ref<InstanceType<typeof DocumentTemplateListTable>>();
const filterFormdata = ref();
const ResponsiveFilterRef = ref();
function handleFilterFormChange(formData:any) {
    filterFormdata.value = formData
    tableRef.value?.reload()
}

onMounted(() => {
    if(filters.value){
        filterFormdata.value = filters.value
        ResponsiveFilterRef.value?.setValue('name', filters.value.name)
    }
})

provide(DocumentTemplateProviderKey, {
    getListApi: async(params:any) =>{
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
        return adminApi.api.postTemplateDocumentPage(params)
    },
})


</script>

<template>
    <div class="pageContainer">
        <DocumentTemplateListTable ref="tableRef" v-bind="props">
            <template #toolbar_buttons>
                <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange"
                inputKey="name"/>
            </template>
        </DocumentTemplateListTable>
    </div>

</template>

<style lang="scss" scoped>
.pageContainer{
    width:100%;
    height:100%;
    position: relative;
    padding: var(--app-space-xs);

}
</style>