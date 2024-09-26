import { Cell,CellView, Graph } from "@antv/x6"
import {circleNodeStyle, squareNodeStyle} from "./bpmnElementHelper";

Graph.registerNode(
    'bpmn-node',
    {
        inherit: 'rect',
        ports: {
            groups: {
                from: {
                    position: 'left',
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: '#8f8f8f',
                            r: 5,
                        },
                    },
                },
                to: {
                    position: 'right',
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: '#8f8f8f',
                            r: 5,
                        },
                    },
                },
                top: {
                    position: 'top',
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: '#8f8f8f',
                            r: 5,
                        },
                    },
                },
                bottom: {
                    position: 'bottom',
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: '#8f8f8f',
                            r: 5,
                        },
                    },
                }
            },
        },
    },
    true,
)
export enum BpmnElementType {
    startEvent = 'startEvent',
    endEvent = 'endEvent',
    userTask = 'userTask',
    exclusiveGateway = 'exclusiveGateway',
    serviceTask = 'serviceTask',
    boundaryEvent = 'boundaryEvent',
    // scriptTask = 'scriptTask',
    sequenceFlow = 'sequenceFlow', // sequenceFlow must be in last, otherwise , create edge may not work
}

export type BpmnElement = {
    [key in BpmnElementType]: {
        nodeStyle:any,
        embed?:boolean,
        embeddingValidateRule?: (args:{child:Cell,parent:Cell,childView:CellView, parentView:CellView}) => boolean
        connectable?:boolean
        connectRule?: (args:{child:Cell,parent:Cell,childView:CellView, parentView:CellView}) => boolean,
        toolbar: {
            enable: boolean,
            group?:string,
            icon?: string,
            i18nLabelKey?: string
        }
        newNodeData:(id:string, label:string, data:any) => {
            id: string
            name: string
            type: BpmnElementType
            data: any
        },
        clickHandler: (args:{node:Cell, view:Cell}) => void
    }
}

export const bpmnElement:BpmnElement = {
    startEvent:{
        nodeStyle:() => ({
            ...circleNodeStyle('#0099ff', '/bpmn/icons/form.svg'),
            shape:'bpmn-node',
            ports: {
                items:[
                    {
                        id: 'to',
                        group: 'to',
                    },
                ]
            },
        }),
        embed:false,
        toolbar:{
            enable:false,
        },
        newNodeData:(id,label,data) => ({
            id,
            name:label,
            type: BpmnElementType['startEvent'],
            data
        }),
        clickHandler:() => {}
    },
    endEvent:{
        nodeStyle:() =>({
            ...circleNodeStyle('#eee', '/bpmn/icons/close.svg'),
            shape:'bpmn-node',
            ports: {
                items:[
                    {
                        id: 'from',
                        group: 'from',
                    },
                ]
            },
    }),
        embed:false,
        toolbar:{
            enable:false,
        },
        
        newNodeData:(id,label,data) => ({
            id,
            name:label,
            type: BpmnElementType['endEvent'],
            data
        }),
        clickHandler:() => {}
    },
    userTask:{
        nodeStyle:() =>({...squareNodeStyle('#0099ff', '/bpmn/icons/form.svg'),
            shape:'bpmn-node',
            ports: {
                items:[
                    {
                        id: 'from',
                        group: 'from',
                    },
                    {
                        id: 'to',
                        group: 'to',
                    },
                    {
                        id:'top',
                        group:'top',
                    },
                    {
                        id:'bottom',
                        group:'bottom',
                    },
                ]
            },
    }),
        embed:false,
        toolbar:{
            enable:false,
        },
        newNodeData:(id,label,data) => ({
            id,
            name:label,
            type: BpmnElementType['userTask'],
            
            data
        }),
        clickHandler:() => {}
    },
    exclusiveGateway:{
        nodeStyle:(item:any) => ({
            ...circleNodeStyle('#0099ff', '/bpmn/icons/check.svg'),
            shape:'bpmn-node',
            ports: {
                items:[
                    {
                        id: 'from',
                        group: 'from',
                    },
                    {
                        id: 'to',
                        group: 'to',
                    },
                ]
            },
        }),
        embed:false,
        toolbar:{
            enable:false,
        },
        newNodeData:(id,label,data) => ({
            id,
            type: BpmnElementType['exclusiveGateway'],
            name:label,
            data:{
                attr_id:id,
                ...data
            }
        }),
        clickHandler:() => {}
    },
    boundaryEvent:{
        nodeStyle:(item:any) => ({
            
            ... circleNodeStyle('#eee', '/bpmn/icons/clock.svg'),
            shape:'bpmn-node',
            ports: {
                items:[
                    {
                        id: 'from',
                        group: 'from',
                    },
                    {
                        id: 'to',
                        group: 'to',
                    },
                ]
            },
        }),
        embed:false,
        toolbar:{
            enable:false,
        },
        newNodeData:(id,label,data) => ({
            id,
            type: BpmnElementType['boundaryEvent'],
            name:label,
            data
        }),
        clickHandler:() => {}
    },
    serviceTask:{
        nodeStyle:(item:any) => {
            let icon = '/bpmn/icons/document.svg'
            let color ='#7B61FF'
            if(!item['attr_flowable:delegateExpression']){
                return squareNodeStyle('#7B61FF', icon)
            }
            switch(item['attr_flowable:delegateExpression']){
                case '${sendNotificationDelegate}':
                    icon = '/bpmn/icons/email.svg'
                    color = '#36ce3c'
                    break;
                case '${generateDocumentDelegate}':
                    icon = '/bpmn/icons/document.svg'
                    color = '#7B61FF'
                    break;
                case '${filingGenerateDocumentDelegate}':
                    icon = '/bpmn/icons/folder.svg'
                    color = '#7B61FF';
                    break;
            }
            return {
                ...squareNodeStyle(color, icon),
                shape:'bpmn-node',
                ports: {
                    items:[
                        {
                            id: 'from',
                            group: 'from',
                        },
                        {
                            id: 'to',
                            group: 'to',
                        },
                    ]
                },
            }
        },
        embed:false,
        toolbar:{
            enable:false,
        },
        newNodeData:(id,label,data) => ({
            id,
            name:label,
            type: BpmnElementType['serviceTask'],
            
            data
        }),
        clickHandler:() => {}
    },
    // scriptTask:{
    //     nodeStyle:squareNodeStyle('#29CC6A', '/bpmn/icons/email.svg'),
    //     embed:false,
    //     toolbar:{
    //         enable:false,
    //     },
    //     newNodeData:(id,label,data) => ({
    //         id,
    //         name:label,
    //         data
    //     }),
    //     clickHandler:() => {}
    // },
    sequenceFlow:{
        nodeStyle:() => ({}),
        embed:false,
        toolbar:{
            enable:false,
        },
        newNodeData:(id,label,data) => ({
            id,
            name:label,
            type: BpmnElementType['sequenceFlow'],
            
            data
        }),
        clickHandler:() => {}
    }
    
}



