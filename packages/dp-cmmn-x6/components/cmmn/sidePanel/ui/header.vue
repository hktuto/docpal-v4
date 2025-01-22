<script lang="ts" setup>
const props = defineProps<{
    title:string
}>()
</script>

<template>
    <div class="headerContainer">
        <span>{{ title }}</span>
    </div>
</template>

<style scoped lang="scss">
.headerContainer{
    font-size: 1rem;
    font-weight: 800;
    display: block;
    margin-bottom: 1px solid var(--app-grey-000);
    padding: var(--app-space-xs) 0 ;
}
</style>