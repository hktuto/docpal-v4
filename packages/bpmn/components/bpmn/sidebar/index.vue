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
            editComponent.value = resolveComponent('BpmnSidebarStartEvent')
            break;
        case 'endEvent':
            editComponent.value = resolveComponent('BpmnSidebarEndEvent')
            break;
        case 'userTask':
            editComponent.value = resolveComponent('BpmnSidebarUserTask')
            break;
        case 'exclusiveGateway':
            editComponent.value = resolveComponent('BpmnSidebarExclusiveGateway')
            break;
        case 'serviceTask':
            const delegate = node.data.data['attr_flowable:delegateExpression']
            if(delegate) {
                switch(delegate) {
                    case '${sendNotificationDelegate}':
                        editComponent.value = resolveComponent('BpmnSidebarEmail')
                        break;
                    case '${generateDocumentDelegate}':
                        editComponent.value = resolveComponent('BpmnSidebarDocument')
                        break;
                    case '${filingGenerateDocumentDelegate}':
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
    <div :class="{sidebarWrapperr:true, opened}">
        <div class="tabHeader">
            header
            <Icon name="lucide:move"   />
        </div>
        <div class="sideBarContainer">
            <component :is="editComponent" v-if="editComponent" :node="selectedNode" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.sidebarWrapperr{
    position: absolute;
    width: 320px;
    height: 100%;
    top: 0;
    right: 0;
    background: rgba(243, 245, 247, 0.6);
    border: 2px solid rgba(255,255,255,1);
    padding: var(--app-space-m);
    // box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
    backdrop-filter: blur(20px);
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
    overflow: auto;
}
.tabHeader{
    font-size: var(--app-font-size-m);
}
</style>