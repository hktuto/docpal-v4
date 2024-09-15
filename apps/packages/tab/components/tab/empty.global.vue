<script lang="ts" setup>
import {TabManagerKey} from './type'
const props = defineProps<{tab: TabItem}>()


</script>
<template>
    <div class="emptyContainer">
        empty tab can display
        {{ $props.tab }}
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