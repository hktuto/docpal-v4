<script lang="ts" setup>
import type {TabLayout, TabPanelContainer} from '#imports'
import { Splitpanes, Pane } from 'splitpanes'


const { layout } = defineProps<{
    layout: TabLayout
}>()

</script>

<template>
    <splitpanes :horizontal="layout.direction === 'horizontal'" :vertical="layout.direction === 'vertical'">
        <Pane v-for="tab in layout.tabs" :key="tab.id" >
            <template v-if="tab.type === 'TabLayout'">
                <TabLayout :layout="(tab as TabLayout)" />
            </template>
            <template v-else>
                <TabPanel :panel="(tab as TabPanelContainer)" />
            </template>
        </Pane>
    </splitpanes>
    
</template>

<style>

</style>
