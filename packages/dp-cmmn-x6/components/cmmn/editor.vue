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
import { History } from '@antv/x6-plugin-history'
// import {CaseManagementEditorKey} from "#imports";

const { graph, setupCanvas ,getGraphJson, centerGraph, caseNode, caseId, caseInformation } = useCmmnGraph();
const containerEl = ref()
const toolbarEl = ref()
const emits = defineEmits(['historyChange'])

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

const readOnly = ref(false)
const versionId = ref()
function init(cmmnString:string,x6Json?: any, isReadOnly = false, version?: string) {
    if(version) {
        versionId.value = version
    }
    if(graph.value) {
        graph.value.dispose()
    }
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
            color: 'var(--app-grey-950)',
        },
        autoResize: true,
        panning: {
            enabled: true,
            eventTypes: ['leftMouseDown', 'mouseWheel'],
        },
        embedding: {
            enabled: !isReadOnly,
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
      interacting: !isReadOnly ? true : () => {
          return {
            nodeMovable: false,
            edgeMovable: false,
            edgeLabelMovable: false,
            arrowheadMovable: false,
            vertexMovable: false,
            vertexDeletable: false,
            vertexAddable: false
          }
        } ,
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
            enabled: !isReadOnly
        },
        translating: {
            enabled: !isReadOnly,
            restrict: !isReadOnly ? cmmnDragRule : true
        },
        connecting:{
            enabled: !isReadOnly,
            allowBlank:false,
            snap: false,
            allowMulti: true,
            allowLoop: false,
            allowNode: allowConnectToNode
        }
    }

    dragging.value = false;
    setupCanvas(cmmnString, x6Json,options);
    readOnly.value = isReadOnly
    toolbarEl.value.init(graph.value, isReadOnly)
    if(!isReadOnly){


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

        graph.value.use(
            new History({
                enabled: !readonly.value,
                beforeAddCommand:(event:any, args:any) => {
                    const ignoreKeys = ['tools', 'ports']
                    if(ignoreKeys.includes(args.key)) return false
                }
            }),
        )

        graph.value.on('history:change', () => {
            undoState.value= {
                canRedo: graph.value.canRedo(),
                canUndo: graph.value.canUndo(),
            }
            emits('historyChange')

            // save draft
        })
        graph.value.cleanHistory()

    }

    registerGraphEvents(graph.value);
    
}


function onUndo(){
    graph.value.undo()
}
function onRedo(){
    graph.value.redo()
}

function save() {
    // todo : add all information to start human task
    const {xml, json} = convertX6JsonToCmmnJson(graph.value,caseId.value)
    console.log("save", xml)
    return { xml, json }
}

 const allInfo = computed(() => {
    const caseNode = graph.value.getCellById(caseId.value)
    if(!caseNode) return []
    const casePlanModel = caseNode.data.data.casePlanModel ? caseNode.data.data.casePlanModel : caseNode.data.data.data.casePlanModel
    if(!casePlanModel) return []
    const field = [...casePlanModel.extensionElements['docpal:form'][0]?.field] || []
    field.push({
        attr_id: 'folderCabinetId',
        attr_name: " Folder Cabinet Id"
    })
    // add default field
    return field.map(item => ({
            ...item,
            label: item.attr_name,
            value: item.attr_id
        }))
})

provide(CaseManagementEditorKey, {
    readOnly,
    graph,
    allInfo,
    versionId
})




defineExpose({ getGraphJson, init, centerGraph, save, graph })

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
                <CmmnToolbar  ref="toolbarEl" :graph="graph"  />
                <CmmnNodeContextMenu v-if="!readOnly" :graph="graph" />
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
    padding: calc( var(--app-space-xs) * 1.5);
    .bottom{
        position: absolute;
        bottom:0;
        left:0;
        right:0;
        background-color: var(--app-grey-950);
        width:100%;
        padding: calc(var(--app-space-xs) * 2);
        border-top: 1px solid var(--app-grey-800);
        
    }
    
}
.main-center{
    background-color: transparent !important;
}
.main-right{
    background-color: var(--app-grey-950);
    z-index:2;
}
.editorPanelContainer{
    width: 100%;
    height:100%;
    position: relative;
    overflow: hidden;
    :deep(.splitpanes){
        min-width: initial !important;
    }
}
:deep(.splitpanes.default-theme .splitpanes__pane){
  background-color: var(--app-grey-950);
}
:deep(.splitpanes__splitter){
        z-index: 2;
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

</style>
