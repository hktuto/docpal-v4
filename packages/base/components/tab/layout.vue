<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes'
import {paneResized} from '#imports'
const { layout } = defineProps<{
    layout: TabPanel[]
}>()


</script>

<template>
    <splitpanes vertical @resized="paneResized" :push-other-panes="false" @ready="$emit('ready')">
        <Pane v-for="tab in layout" :key="tab.id" :size="tab.size">
            <TabPanel :panel="tab" />
        </Pane>
    </splitpanes>
    
</template>

<style>

</style>
