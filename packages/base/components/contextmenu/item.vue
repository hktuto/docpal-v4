<script lang="ts" setup>

const {item} = defineProps<{
    item:TableMenuActions
}>()


</script>

<template>
    <div class="contextItem">
        {{ item.name }}
    </div>
</template>

<style lang="scss" scoped>
.contextItem{
    height: 40px;
    padding: var(--app-space-xs);
}
</style>