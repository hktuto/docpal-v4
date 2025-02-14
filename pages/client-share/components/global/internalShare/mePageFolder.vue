<script lang="ts" setup>
const props = defineProps<{ 
    idOrPath: string ,
    filter: any,
}>();
</script>
<template>
<BrowseListTable :idOrPath="idOrPath"></BrowseListTable>
</template>
<style lang="scss" scoped>
</style>