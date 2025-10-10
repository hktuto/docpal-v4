<script lang="ts" setup>
import {Graph} from "@antv/x6";
import { Dnd } from '@antv/x6-plugin-dnd'
import {nodeSetting} from '../../../utils/cmmnX6Elements'

const localGraphRef = ref();
const dnd = ref();
const readOnly = ref(false)
function init(graph:Graph , isReadOnly = false){
    if(!graph) throw new Error("Graph is not defined when toolbar init")
    readOnly.value = isReadOnly
    localGraphRef.value = graph
    dnd.value = new Dnd({
        target: graph,
        validateNode: (node:Node,options) => {
            // if(!node.parent) return false
            nextTick(() => {
                reValidateDropNode(node,options)
            })
            return true
        }
    })
}

function reValidateDropNode(node,options) {
    // if node have no parent, remove the node
    if(!node.parent) {
        node.remove()
    }
    const parent = node.getParent()
    const parentType = parent?.data?.type;
    const nodeType = node.data.type;
    if(!parentType || !nodeType) {
        node.remove();
    }else{
        // resizeParent(node)
    }
    
    
}

const toolsInGroup = [
    {
        id:'group1',
        tools:[
            {name:"humanTask", setting:nodeSetting.humanTask },
            {name: "processTask", setting: nodeSetting.processTask },
            {name: "stage", setting: nodeSetting.stage },
            {name: "milestone", setting: nodeSetting.milestone },
            {name: "userEventListener", setting: nodeSetting.userEventListener },
            // {name: "caseTask", setting: nodeSetting.caseTask }
        ]
    },
    {
        id:'group2',
        tools:[
            {name:"entryCriterion", setting:nodeSetting.entryCriterion },
            {name: "exitCriterion", setting: nodeSetting.exitCriterion }
        ]
    }
]

type DragItemToGraph = {
    dragItemOption: any,
    dropItemStyle: any,
    ev: any
}
function dragItemToGraph({dragItemOption,dropItemStyle, ev}:DragItemToGraph) {
    const dragNode = localGraphRef.value.createNode(dragItemOption)
    dnd.value.options.getDragNode = (node:Node) => {
        return node
    }
    dnd.value.options.getDropNode = (node:Node) => {
        return node.clone({ keepId: true }).size(dropItemStyle.width, dropItemStyle.height)
    }
    
    dnd.value?.start(dragNode, ev)
}

defineExpose({
    init
})
</script>

<template>
    <div class="cmmnToolbarContainer">
        <div v-for="group in toolsInGroup" :key="group.id" class="group">
            <CmmnToolbarTool v-for="tool in group.tools" :key="tool.name" :type="tool.name" :setting="tool.setting" @mousedown="dragItemToGraph" :disabled="readOnly" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.cmmnToolbarContainer{
    position: absolute;
    top: var(--app-space-xs);
    left: var(--app-space-xs);
    z-index: 3;
    display: flex;
    flex-flow: column nowrap;
    gap: var(--app-space-xs);
    .group{
        --icon-color:#000;
        background: var(--app-grey-950);
        border-radius: 0.5rem;
        padding: 0.5rem;
        box-shadow: 0 0 0.5rem rgba(0,0,0,0.2);
        display: flex;
        flex-flow: column nowrap;
        gap: var(--app-space-xs);
    }
}
</style>
