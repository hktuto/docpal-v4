<script lang="ts" setup>


</script>


<template>
    <div class="pageContainer">
        <SettingDateTimeSetting />
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    padding : var(--app-space-s);
    height: 100%;
    width: 100%;
    display : flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-space-s);
    > * {
        padding: var(--app-space-xs);
        border-radius: var(--app-border-radius-m);
        border: 1px solid var(--app-grey-900);
        height: auto;
    }
}
</style>