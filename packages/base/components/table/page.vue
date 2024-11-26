<script lang="ts" setup>

const {
    getListApi,
    columns,
    height = 'auto',
    extraParams = {},
} = defineProps<{
    getListApi: Function,
    height: string,
    columns:any[],
    extraParams?:any
}>()
const currentPage = ref(1);
const emits = defineEmits(['checkbox-all', 'checkbox-change', 'cell-click', 'cell-dblclick', 'sort-change', 'filter-change', 'resizable-change' ,'row-dragstart', 'row-dragover','row-dragend','column-dragstart','column-dragover','column-dragend'])
const pageParams = reactive({
    pageSize: 10,
    totalSize:0,
})

const columnDragConfig = reactive({
  icon: 'vxe-icon-swap'
})

const loading = ref(false);
const tableData = ref([]);


async function getData(){
    loading.value = true;
    try {
        const {data}:any = await getListApi({pageNum:currentPage.value -1, pageSize:pageParams.pageSize, ...extraParams})
        console.log(data)
        tableData.value = data.entryList
        pageParams.totalSize = data.totalSize
        pageParams.pageSize = pageParams.pageSize
    } catch (error) {
        throw error
    }
    loading.value = false;
}


onMounted(() => {
    getData()
})

</script>

<template>
    <div class="tableContainer">

        <div class="table">

        <vxe-table
            border
            show-overflow
            :height="height"
            :loading="loading"
            auto-resize
            :column-config="{resizable: true, useKey: true, drag: true}"
            :columnDragConfig="columnDragConfig"
            :scroll-y="{enabled: true, gt: 0}"
            :data="tableData"
            @checkbox-all="(ev) => $emit('checkbox-all', ev)"
            @checkbox-change="(ev) => $emit('checkbox-change', ev)"
            >
                <vxe-column v-for="(column,index) in columns" :key="index" v-bind="column"></vxe-column>
            </vxe-table>
        </div>
        <vxe-pager
            v-model:currentPage="currentPage"
            v-model:pageSize="pageParams.pageSize"
            :total="pageParams.totalSize"
            @page-change="getData">
        </vxe-pager>
    </div>
</template>

<style lang="scss" scoped>
.tableContainer{
    height: 100%;
    display: grid;
    grid-template-rows: 1fr min-content;
    gap: 0px;
    overflow: hidden;
}
.table{
    height: 100%;
    position: relative;
    overflow: hidden;
}
</style>