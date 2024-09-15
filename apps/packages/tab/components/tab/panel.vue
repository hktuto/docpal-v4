<script setup lang="ts">
import type { TabPanelContainer } from '../../composables/useTab';

const { panel } = defineProps<{
    panel: TabPanelContainer
}>()

const displayTab = panel.tabs[0]


</script>

<template>
    <div class="tabContainer">
        <div class="tabHeaderContainer">
            {{ displayTab }}
        </div>
        <div class="tabBody">
            <component :is="resolveComponent(displayTab.component)" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.tabContainer{
    display: grid;
    grid-template-rows: min-content 1fr;

}
.tabBody{
    width:100%;
    height:100%;
    overflow: auto;
}
</style>