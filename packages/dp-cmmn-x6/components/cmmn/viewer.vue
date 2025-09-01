<script lang="ts" setup>
import {nodeClickRule, registerGraphEvents} from "../../utils/cmmnLogic";
import {convertX6JsonToCmmnJson} from "../../utils/cmmnSaveHelper";

const props = withDefaults(defineProps<{
    
    options: any
    padding: number
}>(),{
    options:{},
    padding: 100
})
const { graph, caseId, setupCanvas ,getGraphJson } = useCmmnGraph();
const containerEl = ref()

function init(cmmnString:string,x6Json?: any){
    const options = Object.assign({
        container: containerEl.value,
        grid:true,
        background: {
        },
        autoResize: true,
        panning: {
            enabled: true,
            eventTypes: ['leftMouseDown', 'mouseWheel'],
        },
        embedding: {
            enabled: true,
        },
        mousewheel: {
            enabled: true,
            factor: 1.05,
            modifiers: ['ctrl', 'meta'],
        },
        interacting: false,
    }, props.options )
    setupCanvas(cmmnString, x6Json, options, props.padding);
    return { graph, caseId }
}


function save() {
    const { xml, json } = convertX6JsonToCmmnJson(graph.value, caseId.value)
    return { xml, json }
}
defineExpose({ getGraphJson, init, save })

</script>

<template>
    <div class="editorContainer">
        <div ref="containerEl" >

        </div>
    </div>
</template>

<style scoped lang="scss">
.editorContainer{
    width: 100%;
    height : 100%;
    border: 1px solid #eee;
    overflow: hidden;
    > * {
        width:100%;
        height:100%;
    }
}
</style>
