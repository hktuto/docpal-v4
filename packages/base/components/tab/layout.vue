<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes'


const { layout } = defineProps<{
    layout: TabPanel[]
}>()

</script>

<template>
    <splitpanes vertical>
        <Pane v-for="tab in layout" :key="tab.id" >
            <TabPanel :panel="tab" />
        </Pane>
    </splitpanes>
    
</template>

<style>

</style>
