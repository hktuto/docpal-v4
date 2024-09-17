<script lang="ts" setup>
const props = defineProps<{tab: any}>()
import { TabManagerKey } from './type';
const counter = ref(0)
const tabManager = inject(TabManagerKey)
if(!tabManager){
    throw createError('Tab manger not found')
}

</script>
<template>
    <div class="emptyContainer">
        <div class="content">

        {{ tab.id }} <br/>
        local stage : {{ counter }}<br/>
        <ElButton @click="() => counter++">add 1</ElButton>
        </div>
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