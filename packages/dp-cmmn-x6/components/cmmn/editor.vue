<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { Transform } from '@antv/x6-plugin-transform'
import {
    allowConnectToNode,
    cmmnDragRule, embeddingValidateRule,
    nodeResizingRule,
    registerGraphEvents
} from "../../utils/cmmnLogic";
import {convertX6JsonToCmmnJson} from "../../utils/cmmnSaveHelper";


const { graph, setupCanvas ,getGraphJson, centerGraph, caseNode,caseId, caseInformation } = useCmmnGraph();
const containerEl = ref()
const toolbarEl = ref()


///#region splitPanes
    const middleSize = ref(80)
    const rightSize = ref(20)
    const dragging = ref(false)
    function reCalcuate(){
        if( middleSize.value + rightSize.value < 100){
            middleSize.value = 100 - rightSize.value
            return;
        }
        if( middleSize.value + rightSize.value > 100) {
            middleSize.value = 100 - rightSize.value
        }
    }
//#endregion

const undoState = ref({
    canUndo: false,
    canRedo: false,
})
function init(cmmnString:string,x6Json?: any) {
    const options = {
        container: containerEl.value,
        grid:{
            visible: true,
            type: 'mesh',
            args: {
                color: '#eee',
                thickness: 1
            }
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
            enabled: true,
            validate: embeddingValidateRule
        },
        highlighting: {
            embedding: {
                name: 'stroke',
                args: {
                    padding: -1,
                    attrs: {
                        stroke: '#73d13d',
                    },
                },
            },
        },
        scroller: {
            enabled: true,
            pannable: true,
            pageVisible: true,
            pageBreak: false,
        },
        mousewheel: {
            enabled: true,
            factor: 1.05,
            modifiers: ['ctrl', 'meta'],
        },
        transforming: {
            clearAll: true,
            clearOnBlankMouseDown: true,
        },
        resizing: {
            enabled: true
        },
        translating: {
            restrict: cmmnDragRule
        },
        connecting:{
            allowBlank:false,
            snap: false,
            allowMulti:true,
            allowLoop:false,
            allowNode: allowConnectToNode
        }
    }

    
    setupCanvas(cmmnString, x6Json,options);
    graph.value.use(new Transform({
        resizing: {
            enabled: nodeResizingRule,
            minWidth: 5,
            minHeight: 50,
            orthogonal: false,
            restrict: false,
            preserveAspectRatio: false,
        },
    }),)
    // graph.value.use(
    //     new Selection({
    //         enabled: true,
    //         modifiers:['meta'],
    //         multiple: true,
    //         rubberband: true,
    //         movable: true,
    //         showNodeSelectionBox: true,
    //     }),
    // )
    registerGraphEvents(graph.value);
    
    toolbarEl.value.init(graph.value)
    dragging.value = false;
    

    // graph.value.use(
    //     new History({
    //         enabled: true,
    //     }),
    // )

    // graph.value.on('history:change', () => {
    //     undoState.value= {
    //         canRedo: graph.value.canRedo(),
    //         canUndo: graph.value.canUndo(),
    //     }
    // })
}


function onUndo(){
    graph.value.undo()
}
function onRedo(){
    graph.value.redo()
}

function save() {
    const {xml, json} = convertX6JsonToCmmnJson(graph.value,caseId.value)
    return { xml, json }
}



defineExpose({ getGraphJson, init, centerGraph, save })

</script>

<template>
    <div class="editorPanelContainer">
        <Splitpanes id="panesContainer" class="default-theme"  @resize="dragging = true" @resized="(e) => {dragging = false; middleSize = e[0].size ; rightSize = e[1].size}">
        
            <SplitpanesPanes
                class="main-center"
                id="mainCenter"
                v-model:size="middleSize"
                :defaultSize="70"
                parentId="panesContainer"
                :dragging="dragging"
                :minSizeInPixel="300"
            >
                
            </SplitpanesPanes>
            <SplitpanesPanes
                class="main-right"
                v-model:size="rightSize"
                :defaultSize="30"
                parentId="panesContainer"
                :minSizeInPixel="80"
                :dragging="dragging"
                toggle
                @toggled="reCalcuate"
            >
                <template #toggleButton>
                    
                    <SvgIcon src="/icons/setting.svg" />
                </template>
                <template #toggleText>
                    <div class="label">Properties</div>
                </template>
                <CmmnSidePanel :graph="graph" :caseNode="caseNode"  />
            </SplitpanesPanes>
        </Splitpanes>
        <div class="viewerContainer" >
            <div class="canvas" ref="containerEl"  >

            </div>
                <CmmnToolbar ref="toolbarEl" :graph="graph" />
                <CmmnNodeContextMenu :graph="graph" />
            <div class="bottom">
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.viewerContainer{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    display: grid;
    grid-template-rows: 1fr min-content;
    padding: calc( var(--app-padding) * 1.5);
    .bottom{
        position: absolute;
        bottom:0;
        left:0;
        right:0;
        background-color: var(--color-grey-0000);
        width:100%;
        padding: calc(var(--app-padding) * 2);
        border-top: 1px solid var(--color-grey-400);
        
    }
    
}
.main-center{
    background-color: transparent !important;
}
.main-right{
    background-color: var(--color-grey-0000);
    z-index:2;
}
.editorPanelContainer{
    width: 100%;
    height:100%;
    position: relative;
    overflow: hidden;
    
}
:deep{
    .splitpanes.default-theme .splitpanes__pane{
        background-color: var(--color-grey-0000);
    }
    .splitpanes__splitter{
        z-index: 2;
    }
}
.editorContainer{
    width: 100%;
    height : 100%;
    position: relative;
    overflow: hidden;
    .canvas{
        width:100%;
        height:100%;
    }
}
:deep{
    .splitpanes.default-theme .splitpanes__pane{
        background-color: var(--color-grey-0000);
    }
}
</style>