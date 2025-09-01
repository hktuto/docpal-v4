<script lang="ts" setup>

const props = defineProps<{
    searchParams?:any,
}>()

</script>

<template>
    <div class="pageContainer">
        <SearchGroup v-bind="props" tableId="client-search"/>
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
