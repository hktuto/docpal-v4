<script lang="ts" setup>
import {BPMN_PROVIDER, createError } from '#imports'
import { onActivated, onMounted } from 'vue';


const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')
    
}

function setupEdge(){

    graphProvider?.graph.value?.on('edge:mouseenter', ({cell}:any) => {
        // cell.setRouter('normal')
        cell.addTools([
            {
                name: 'vertices',
                args: {
                    attrs: { fill: '#666' },
                },
            },
            'segments',
            {
                name: 'target-arrowhead',
                args: {
                    attrs: {
                        fill: 'red',
                    },
                },
            },
            {
                name:'source-arrowhead',
                args:{
                    attrs: {
                        fill: 'black',
                    },
                }
            },
            {
                name: 'button-remove',
                args:{
                    distance: -20
                }
            }
        ])
    })

    graphProvider?.graph.value?.on('edge:mouseleave', ({cell}:any) => {
        cell.removeTools()
    })

    graphProvider?.graph.value?.on("edge:connected", ({edge, isNew}) => {
        const source = edge.getSourceCell()
        if(!source) return;
        // #region exclusiveGateway 
        const allNodeConnected = graphProvider?.graph.value?.getConnectedEdges(source)
        if(!allNodeConnected || allNodeConnected.length === 0) {
                return;
        }
        if(source.data.type === 'exclusiveGateway') {
            let newData = {...edge.data};
            let label = "Approved";
            allNodeConnected.forEach( connectedEdge => {
                if(connectedEdge.id !== edge.id && connectedEdge.data && connectedEdge.data?.data?.conditionExpression &&
                    connectedEdge.data?.data?.conditionExpression?.__cdata) {

                    const approveField = connectedEdge.data.data.conditionExpression.__cdata.replace('${','').replace('}','').replace('!','')
                    
                    if(connectedEdge.data.data.conditionExpression.__cdata.includes('!')) {
                        newData.data = {
                            conditionExpression:{
                                    ['attr_xsi:type']:"tFormalExpression",
                                    __cdata: '${' + approveField + '}'
                                }
                        }
                        
                    }else{
                        newData.data = {
                            conditionExpression:{
                                    ['attr_xsi:type']:"tFormalExpression",
                                    __cdata: '${!' + approveField + '}'
                                }
                        }
                        label = 'Rejected';
                    }
                    
                }
            })
            
            if(!edge.data || !edge.data.data) {
                newData.data = {
                    conditionExpression:{
                        ['attr_xsi:type']:"tFormalExpression",
                        __cdata: '${approve}'
                    }
                }
            }
            graphProvider.graph.value?.startBatch('updateEdge')
            edge.setRouter('manhattan')
            edge.setData(newData, {overwrite:true, deep:true})
            edge.setLabels(label)
            graphProvider.graph.value?.stopBatch('updateEdge')
            return
        }
        // #endregion
        if(source.data.type === 'serviceTask' && source.data.data['attr_flowable:delegateExpression'] === '${conditionValidateDelegate}')  {
            let newData = {...edge.data};
            let label = "Approved";
            
            // 如果是新的連線，先看看 allNodeConnected 有沒有 conditionValidateDelegate
            if(isNew){
                const hasApprovEdge = allNodeConnected.find((connectedEdge:any) => 
                    connectedEdge.data?.data?.conditionExpression?.__cdata && 
                    connectedEdge.data?.data?.conditionExpression?.__cdata === '${conditionResult}');
                console.log("conditionValidateDelegate isNew", isNew, hasApprovEdge, allNodeConnected);
                    newData.data = {
                        conditionExpression:{
                            ['attr_xsi:type']:"tFormalExpression",
                            __cdata: hasApprovEdge ? '${!conditionResult}' : '${conditionResult}'
                        }
                    }
                    label = hasApprovEdge ? "Rejected" : "Approved" ;
            }
            
            
            console.log("newData", newData);
            graphProvider.graph.value?.startBatch('updateEdge')
            edge.setRouter('manhattan')
            edge.setData(newData, {overwrite:true, deep:true})
            edge.setLabels(label)
            graphProvider.graph.value?.stopBatch('updateEdge')
            return
        }

        // other edge
        if(isNew){
            console.log("new edge", edge);
            edge.data = {
                data:{
                    attr_id: `edge-${edge.id}`,
                    attr_sourceRef: edge.source.cell,
                    attr_targetRef: edge.target.cell
                }
            }
            edge.setRouter('manhattan')
        }
    })
}

onMounted(() => {
    setupEdge()
})


</script>


<template>
<div></div>
</template>
