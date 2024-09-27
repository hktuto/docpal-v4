<script lang="ts" setup>
import {ref, BPMN_PROVIDER, provide} from '#imports'
import {Graph} from '@antv/x6'
import type { Node } from '@antv/x6'
import { DagreLayout } from '@antv/layout'

import { bpmnStringToJson, jsonToX6Node } from '~/utils/bpmnConverter';

const containerEl = ref()
const graph = ref<Graph>();

const {options = {}} = defineProps<{
    options: any
}>()
const emits = defineEmits(['graphReady']);
const flatGraphObject = ref<any>({})
const bpmnJson = ref<any>({})

function init(bpmnXml :string, x6Json?:any){
    if(!containerEl.value) {
        throw new Error('Container is not found')
    }
    // step 2 - prevent bpmnXml is not define or is not string
    if(!bpmnXml || typeof bpmnXml !== 'string') {
        throw new Error('BpmnXml is not define')
    }
    // step 3 - reset graph if exists
    if(graph.value) {
        graph.value.dispose()
    }
    // step 4 - init graph
    const graphOptions = Object.assign({
        container: containerEl.value,
        grid:{
            visible: true,
            type: 'mesh',
            args: {
                color: '#eee',
                thickness: 1
            }
        },
        scaling:{
            min: 0.01, max: 2
        },
        background: {
            color: 'var(--color-grey-0000)',
        },
        autoResize: true,
        panning: {
            enabled: true,
            eventTypes: ['leftMouseDown', 'mouseWheel'],
        },
        embedding: {
            enabled: false,
        },
        mousewheel: {
            enabled: true,
            factor: 1.05,
            modifiers: ['ctrl', 'meta'],
        },
        connecting:{
            connector: 'rounded',
        },
        interacting: false,
    }, options )
    graph.value = new Graph({
        container: containerEl,
        ...graphOptions
    });
    autoLayout(bpmnXml)
    emits('graphReady', x6Json)
}

function autoLayout(xml:string){
    const {json, flatObj} = bpmnStringToJson(xml)
    // flatGraphObject.value = flatObj
    bpmnJson.value = json;
    const layout =  new DagreLayout({
        type: 'dagre',
        rankdir: 'LR',
        ranksep: 80,
        nodesep: 60,
    });
    const result = jsonToX6Node(bpmnJson.value, flatGraphObject.value );
    const position = layout.layout(result)
    graph.value?.fromJSON(position);
    // check window width, if width is more than 1024, zoom graph with padding 200, more than 1280 with padding 300
    nextTick(() => {

        if(window.innerWidth >= 1280){
            graph.value?.zoomToFit({padding: 100})
        }
        graph.value?.zoomToFit({padding: 40})
    })
}


provide(BPMN_PROVIDER, {
    init,
    graph,
    bpmnJson,
    flatGraphObject,
    key: Symbol('BPMN_PROVIDER_KEY')
})

defineExpose({
    init,
    graph
})

</script>

<template>
    <div class="bpmnViewerContainer">
        <div class="bpmnGraphContainer" ref="containerEl" >

        </div>
        <slot />
  </div>
</template>

<style scoped lang="scss">
.bpmnViewerContainer{
  width: 100%;
  height : 100%;
  border: 1px solid #eee;
  overflow: hidden;
  > .bpmnGraphContainer {
    width:100%;
    height:100%;
  }
}
</style>

<style>
@keyframes running-line {
    to {
        stroke-dashoffset: -1000;
    }
}
.x6-highlight-stroke{
    stroke: var(--primary-color) !important;
    stroke-dasharray: 5;
    animation: running-line 60s infinite linear;
}
</style>