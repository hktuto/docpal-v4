<script lang="ts" setup>
import { adminApi } from 'api';


const tabManager = inject(TabManagerKey)
if(!tabManager) {
    throw createError('menu manger not found')
}

const pageParams = ref({
        pageNum: 0,
        pageSize: 20,
        orderBy: 'createdDate',
        isDesc: true
})

const list = ref<any[]>([])
const loading = ref(false)

async function getList() {
    loading.value = true
    const {data}:any = await adminApi.workflowProcessDefinitionController.postPage(pageParams.value)
    if(!data && !data.entryList) {
        throw createError('data not found')
    }
    list.value.push(...data?.entryList)
    pageParams.value.pageNum = (Number(pageParams.value.pageNum) + 1) || 0
    loading.value = false
}

onMounted( async() => {
    await getList()
})

</script>



<template>
    <div class="inlineListContainer">
        <WorkflowEditorMenuItem v-for="item in list" :key="item.key" :item="item" />
    </div>
</template>