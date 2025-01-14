<script lang="ts" setup>

const props = defineProps<{
    query?:any,
    pageSize:number,
    pageNum:number,
}>()

</script>

<template>
    <div class="pageContainer">
        <SearchGroup v-bind="props"/>
    </div>
</template>

<style scoped lang="scss">
.pageContainer{
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: var(--app-space-s);
}
</style>