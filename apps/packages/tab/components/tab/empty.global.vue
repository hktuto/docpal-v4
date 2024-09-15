<script lang="ts" setup>
const props = defineProps<{tab: TabItem}>()

const counter = ref(0)

</script>
<template>
    <div class="emptyContainer">
        empty tab can display
        {{ $props.tab }}
        {{ counter }}
        <ElButton @click="() => counter++">add 1</ElButton>
    </div>

</template>

<style lang="scss" scoped>
.emptyContainer{
    width:100%;
    height: 100%;
    display: grid;
    place-items: center;
}
</style>