<script lang="ts" setup>

function init(bpmnXml :string, x6Json?:any){
    viewerRef.value.init(bpmnXml, x6Json)
}
const viewerRef = ref()
const ready = ref(false)

function graphReady(){
    ready.value = true
}
const graphOptions = {
    interacting:true,
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
        <BpmnSidebar v-if="ready" />
        <BpmnEdge v-if="ready" />
    </BpmnViewer>
</template>
