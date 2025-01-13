<script lang="ts" setup>

const listProvider = inject(SearchListProviderKey);

const { tableConfig, tableEvent, tableRef, reload, query} = useVxeTable({
    id: 'search-result',
    api: listProvider?.getListApi,
    virturalScroll: true,
    columns:[
        
    ]
})
</script>


<template>


</template>