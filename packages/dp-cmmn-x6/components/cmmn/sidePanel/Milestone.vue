<script lang="ts" setup>
import { updateExtentionProperties, getExtentionProperties } from '../../../utils/cmmnConfig'
const props = defineProps(['graph', 'node'])
const {node} = toRefs(props)
</script>

<template>
    <div class="cmmnSidebarItemContainer">
        <CmmnSidePanelUiHeader title="Milestone" />
        <CmmnSidePanelUiLabel :node="node"/>
        <CmmnSidePanelUiItemControl :node="node" :options="['repetitionRule']"/>
    </div>
</template>

<style scoped lang="scss">

</style>