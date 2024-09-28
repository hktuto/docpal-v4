<script lang="ts" setup>
import {BPMN_PROVIDER, createError } from '#imports'
import { onActivated, onMounted } from 'vue';

const ignoreTypeList = ['endEvent']

const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')
    
}

const opened = ref(false);
const selectedNode = ref()
const editComponent = ref()
const nodeType = ref("")

function emptyClickHandler() {
    opened.value = false
    // 有動畫效果, 先延遲一段時間再關閉
    setTimeout(() => {
        selectedNode.value = null 
        editComponent.value = null
    }, 300)
}

function nodeClickHandler({e,x,y,view,node}:any) {
    if(ignoreTypeList.includes(node.data.type || "")) {
        return
    }
    selectedNode.value = node
    switch(node.data.type){
        case 'startEvent':
            nodeType.value = "Start"
            editComponent.value = resolveComponent('BpmnSidebarStartEvent')
            break;
        case 'endEvent':
            nodeType.value = "End"
            editComponent.value = resolveComponent('BpmnSidebarEndEvent')
            break;
        case 'userTask':
            nodeType.value = "User Task"
            editComponent.value = resolveComponent('BpmnSidebarUserTask')
            break;
        case 'exclusiveGateway':
            nodeType.value = "Exclusive Gateway"
            editComponent.value = resolveComponent('BpmnSidebarExclusiveGateway')
            break;
        case 'serviceTask':
            const delegate = node.data.data['attr_flowable:delegateExpression']
            if(delegate) {
                switch(delegate) {
                    case '${sendNotificationDelegate}':
                        nodeType.value = "Email"

                        editComponent.value = resolveComponent('BpmnSidebarEmail')
                        break;
                    case '${generateDocumentDelegate}':
                        nodeType.value = "Document"

                        editComponent.value = resolveComponent('BpmnSidebarDocument')
                        break;
                    case '${filingGenerateDocumentDelegate}':
                        nodeType.value = "Filing"
                        editComponent.value = resolveComponent('BpmnSidebarFiling')
                        break;
                }
            }
            break;
        case 'boundaryEvent':
            editComponent.value = resolveComponent('BpmnSidebarBoundaryEvent')
            break;
    };
    if(editComponent.value) {
        nextTick(() => {
            opened.value = true
        })
    }
}

function setupSidebar(){
    console.log("setup sidebar", graphProvider?.graph.value)
    graphProvider?.graph.value?.on('node:dblclick', nodeClickHandler)
    graphProvider?.graph.value?.on('blank:dblclick', emptyClickHandler)
}

onMounted(() => {
    setupSidebar()
})

</script>

<template>
    <div :class="{sidebarWrapper:true, opened}">
        <div class="tabHeader">
            <div class="label">
                {{ nodeType }}
            </div>
            <Icon name="lucide:panel-right-close" class="icon" @click="opened = !opened"/>
        </div>
        <div class="sideBarContainer">
            <component v-if="editComponent" :is="editComponent"  :node="selectedNode" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.sidebarWrapper{
    position: absolute;
    width: 100%;
    max-width: 600px;
    min-width: 280px;
    height: 100%;
    top: 0;
    right: 0;
    background: var(--app-grey-1000);
    border-left: 2px solid rgba(255,255,255,0.4);
    padding: var(--app-space-m);
    box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
    // backdrop-filter: blur(10px);
    transform: translateX(100%);
    overflow: hidden;
    display: grid;
    grid-template-rows: auto 1fr;
    will-change: auto;
    transition: all 0.3s ease-in-out;
    &.opened{
        transform: translateX(0);
    }
}
.sideBarContainer{
    position: relative;
    height: 100%;
    width: 100%;
    overflow: auto;
}
.tabHeader{
    font-size: var(--app-font-size-m);
    padding-block: var(--app-space-xs);
    border-bottom: 1px solid var(--app-grey-800);
    font-weight: 700;
    color: var(--app-grey-400);
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .icon{
        cursor: pointer;
    }
}
</style>