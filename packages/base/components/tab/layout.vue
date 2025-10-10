<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes'

import {paneResized} from '#imports'
const props = defineProps<{
    layout: TabPanel[]
}>()
const {layout} = toRefs(props)
const emits = defineEmits(['ready'])

const containerSize = ref(0)
function setMinSize() {
    const appContent = document.querySelector('.appContent');
    if(!appContent) {
      console.log("no appContent")
      return window.innerWidth;
    }
    const appContentRect = appContent.getBoundingClientRect();
    const layoutWIdth = (layout.value ? layout.value.length : 1) * 640;
    containerSize.value = Math.min(layoutWIdth, appContentRect.width);
}


function layoutReadyHandler(){
    emits('ready')
}
const splitRef = ref<InstanceType<typeof Splitpanes>>()

const panelMinWidth = computed(() => {
  return 100 / (layout.value ? layout.value.length : 1) 
})

watch(layout, () => {
  setMinSize()
},{
  immediate: true,
  deep: true
})

onMounted(() => {
    emits('ready')

})

</script>

<template>
    <div class="layoutContainer" :style="`--panel-min-size: ${setMinSize}px`">
        <splitpanes vertical ref="splitRef" @resized="paneResized" :push-other-panes="false" @ready="layoutReadyHandler">
            <Pane v-for="(tab, index) in layout" :key="tab.id" :minSize="panelMinWidth" >
                <TabPanel :panel="tab" :index="index"/>
            </Pane>
        </splitpanes>
    </div>
    
</template>

<style lang="scss" scoped>
.layoutContainer{
    --panel-border-radius: var(--app-border-radius-m);
    height: 100%;
    width: var(--panel-min-size);
    border-radius: var(--app-border-radius-l);
    position: relative;
    overflow: visible;
    :deep(.splitpanes__pane) {
        height:100%;
        transition: none;
        // box-shadow: var(--app-shadow-m)!important;
        // border-radius: var(--app-border-radius-m);
        overflow: hidden;
        &:has(.activePanel) {
            box-shadow: var(--app-shadow-xl)!important;
            z-index: 20;
        }
    }
    
    

}
</style>
