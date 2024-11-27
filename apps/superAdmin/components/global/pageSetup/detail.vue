<script lang="ts" setup>
const { id, item } = defineProps<{
    id:string
    item:any
}>()
</script>

<template>
    <div class="pageContainer">
        <PageSettingEditor :item="item"/>
    </div>
</template>
<style lang="scss" scoped>
.pageContainer{
    padding: var(--app-space-s);
    height: 100%;
    overflow: hidden;
}
</style>