<script lang="ts" setup>
const {elements, index} = defineProps<{
    elements: any[],
    index: number
}>()

</script>

<template>
    <div class="conditionContainer">
        <div class="conditionItem" v-for="(item,index) in elements" :key="index">
            {{item}}
         </div>
    </div>

</template>

<style scoped lang="scss">
.conditionContainer{
    width:100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: var(--app-space-xs);
    overflow: auto;
    padding: var(--app-space-s);
    border: 1px solid var(--app-grey-700);
    border-radius: var(--app-border-radius-m);
}
</style>