<script lang="ts" setup >
import {TabManagerKey,} from '../type'
import type {TabPanelContainer} from '../type'

const tabManger = inject(TabManagerKey)
if(!tabManger) {
    throw createError('no '+ TabManagerKey.toString + "provided")
}

const {panel} = defineProps<{panel:TabPanelContainer}>()





</script>

<template>
    <div class="tabHeaderContainer">
        <TabHeaderTab v-for="(tab,index) in panel.tabs" :key="tab.id" :tab="tab" :index="index" :selected="index === panel.showingTabIndex" />
    </div>
</template>

<style lang="scss" scoped>
.tabHeaderContainer{
    border-bottom: 1px solid var(--app-grey-850);
    display: flex;
    flex-flow: row nowrap;
    overflow: auto;
}

</style>