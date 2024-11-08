<script lang="ts" setup>
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { History } from '@antv/x6-plugin-history'
import { graphToBpmnJson } from '~/utils/bpmnConverter';
import type { ElTooltip } from 'element-plus';
function init(bpmnXml :string, x6Json?:any){
    viewerRef.value.init(bpmnXml, x6Json)
}
const viewerRef = ref()
const ready = ref(false)

// el
const nodeEl = ref()
const edgeEl = ref()

function graphReady(){
    ready.value = true
    const graph = viewerRef.value.graph;
    
    graph.use(
        new Transform({
            resizing: {
                enabled:true,
                allowReverse:false,
            },
        }),
    )

    graph.use(
        new Selection({
            enabled: true,
            multiple: true,
            rubberband: true,
            movable: true,
            showNodeSelectionBox: true,
            modifiers:['shift']
        }),
    )

    graph.use(
        new History({
            enabled: true,
            beforeAddCommand:(event:any, args:any) => {
                const ignoreKeys = ['tools', 'ports']
                if(ignoreKeys.includes(args.key)) return false
            }
        }),
    )
    graph.cleanHistory()
}
const graphOptions = {
    interacting:true,
    panning: {
            enabled: true,
            eventTypes: ['leftMouseDown', 'mouseWheel'],
            
        },
    highlighting: {
        magnetAvailable: {
            name: 'stroke',
            args: {
                padding: 3,
                attrs: {
                    strokeWidth: 3,
                    stroke: '#c41a1a',
                },
            },
        },
    },
    connecting:{
        // router: 'orth',
        connector: 'rounded',
        snap: true,
        allowBlank: false,
        allowLoop: false,
        allowNode: true,
        allowMulti:false,
        allowEdge:false,
        highlight: true,
        validateMagnet({ magnet }:any) {
            return true
        },

        validateConnection({ sourceMagnet, targetMagnet }:any) {
            // 只能从输出连接桩创建连接
            // if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'from') {
            //     return false
            // }

            // // 只能连接到输入连接桩
            // if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'from') {
            //     return false
            // }

            return true
        },
    }
}

function getData(){
    const bpmnJson = viewerRef.value.bpmnJson
    return graphToBpmnJson(viewerRef.value.graph, bpmnJson)
}

function openInfo(){
    nodeEl.value.openInfo()
}

function openCabinet(){
    nodeEl.value.openFolderCabinet()
}

function openPermission(){
    nodeEl.value.openPermission()
}




defineExpose({
    init,
    getData
})

</script>

<template>
    <div class="bpmnEditorContainer">

    <BpmnViewer ref="viewerRef" :options="graphOptions" @graph-ready="graphReady">
        <div v-if="ready" class="toolbar">
            <div class="group">
                <BpmnHistory />
                <BpmnInfo  @click="openInfo" />
                <BpmnPermission  @click="openPermission" />
                <BpmnFolderCabinet  @click="openCabinet" />
            </div>
            <div class="group">
                
            </div>
            
        </div>
        <BpmnEdge v-if="ready" ref="edgeEl" />
        <BpmnNode v-if="ready" ref="nodeEl" />
        
    </BpmnViewer>

    <div class="actions">

        <slot name="actions" />
        
        </div>
    </div>
</template>

<style scoped lang="scss">

.bpmnEditorContainer{
    width:100%;
    height:100%;
    position: relative;
    display: grid;
    grid-template-rows: 1fr min-content;
}
.actions{
    padding: var(--app-space-xs);
}
.toolbar{
    position: absolute;
    left: var(--app-space-m);
    top: var(--app-space-m);
    z-index: 2;
    display: flex;
    flex-flow: column nowrap;
    justify-content: stretch;
    align-items: flex-start;
    gap: 0px;
    overflow: hidden;
    transition: all .2s ease-in-out;
    .group{
        box-shadow: var(--app-shadow-s);
        color: var(--app-grey-400);
        line-height: 0;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        border-radius: var(--app-border-radius-m);
        border: 1px solid var(--app-grey-800);
        gap: var(--app-space-xxs);
        gap: var(--app-space-xs);
        font-size: var(--app-font-size-l);
        padding: var(--app-space-xs);
        background: var(--app-grey-1000);
    }
    &:hover, &:focus-within{
        :deep(.label) {
            display: block !important;
        }
        :deep(.icon) {
            width: 100%;
        }
    }

    :deep(.icon){
        
        border-radius: 0;
        border: 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: var(--app-space-xs);
        &.disabled{
            color: var(--app-grey-700);
            cursor: not-allowed;
        }
        cursor: pointer;
        &:hover {
            color: var(--app-main-color);
        }
        .label{
            font-size: var(--app-font-size-s);
            display: none;
        }
    }
}

</style>
