<script lang="ts" setup generic="T extends ToolBar">

export type ToolBar = ToolbarItem[]

export type ToolbarItem = {
    label: string,
    icon?: string,
    callback?: () => void,
    children?: ToolbarItem[]
}
const { toolbar } = defineProps<{
    toolbar: T
}>()

</script>

<template>
    <div class="toolsbarContainer">
        <AppToolbarItem v-for="item in toolbar" :item="item" :level="0" />
    </div>
</template>

<style lang="scss" scoped>
.toolsbarContainer{
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: var(--app-space-xs);
    font-size: var(--app-font-size-s);
    background: var(--app-grey-900);
    padding: var(--app-font-size-s) var(--app-space-xs);

}

</style>
