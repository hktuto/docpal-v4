<script lang="ts" setup>
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { History } from '@antv/x6-plugin-history'
function init(bpmnXml :string, x6Json?:any){
    viewerRef.value.init(bpmnXml, x6Json)
}
const viewerRef = ref()
const ready = ref(false)



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
                console.log(args)
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
            if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'from') {
                return false
            }

            // 只能连接到输入连接桩
            if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'from') {
                return false
            }

            return true
        },
    }
}

defineExpose({
    init
})

</script>

<template>
    <BpmnViewer ref="viewerRef" :options="graphOptions" @graph-ready="graphReady">
        <div class="toolbar">
            <BpmnHistory v-if="ready"/>
        </div>
        <BpmnSidebar v-if="ready" />
        <BpmnEdge v-if="ready" />
        <BpmnNode v-if="ready" />
    </BpmnViewer>
</template>

<style scoped lang="scss">

.toolbar{
    position: absolute;
    left: var(--app-space-m);
    top: var(--app-space-m);
    z-index: 2;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: var(--app-space-xs);
    
}

</style>
