<script lang="ts" setup>
import { updateExtentionProperties, getExtentionProperties } from '../../../utils/cmmnConfig'
const props = defineProps(['graph', 'node'])
const {node} = toRefs(props)
</script>
<template>
    <div class="cmmnSidebarItemContainer">
        <CmmnSidePanelUiHeader title="Case Task" />
        <CmmnSidePanelUiLabel :node="node"/>
        <!-- :options="['repetitionRule']" -->
        <CmmnSidePanelUiItemControl :node="node" />
    </div>
</template>

<style scoped lang="scss">

</style>