import { Cell,CellView, Graph } from "@antv/x6"
import {circleNodeStyle, squareNodeStyle} from "./bpmnElementHelper";

Graph.registerNode(
    'bpmn-node',
    {
        inherit: 'rect',
        ports: {
            groups: {
                from: {
                    position: 'top',
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: 'transparent',
                            fill: 'transparent',
                            r: 5,
                        },
                    },
                },
                to: {
                    position: 'bottom',
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: 'transparent',
                            fill: 'transparent',
                            r: 5,
                        },
                    },
                },
                left: {
                    position: 'left',
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: 'transparent',
                            fill: 'transparent',
                            r: 5,
                        },
                    },
                },
                right: {
                    position: 'right',
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: 'transparent',
                            fill: 'transparent',
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
            icon: string,
            label: string,
            dropData: any,
        }[]
        newNodeData:(id:string, label:string, data:any) => {
            id: string
            name: string
            type: BpmnElementType
            data: any
        },
        clickHandler: (args:{node:Cell, view:Cell}) => void,
        contextMenuComponent?: string | Function ,
    }
}

export const bpmnElement:BpmnElement = {
    startEvent:{
        nodeStyle:() => ({
            ...squareNodeStyle('#0099ff', "StartEvent", '/bpmn/icons/form.svg', 120,64 ),
            // ...circleNodeStyle('#0099ff', '/bpmn/icons/form.svg'),
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
        toolbar:[],
        newNodeData:(id,label,data) => ({
            id,
            name:label,
            type: BpmnElementType['startEvent'],
            data
        }),
        clickHandler:() => {},
        contextMenuComponent:'LazyBpmnContextStartEvent',
    },
    endEvent:{
        nodeStyle:() =>({
            ...squareNodeStyle('#ddd', "EndEvent", '/bpmn/icons/close.svg', 120,64 ),

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
        toolbar:[],
        
        newNodeData:(id,label,data) => ({
            id,
            name:label,
            type: BpmnElementType['endEvent'],
            data
        }),
        clickHandler:() => {},
        contextMenuComponent:'LazyBpmnContextEndEvent',

    },
    userTask:{
        nodeStyle:() =>({...squareNodeStyle('#0099ff', "UserTask", '/bpmn/icons/form.svg'),
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
                        id:'left',
                        group:'left',
                    },
                    {
                        id:'right',
                        group:'right',
                    },
                ]
            },
    }),
        embed:false,
        toolbar:[{
            icon:'/bpmn/icons/form.svg',
            label: "UserForm",
            dropData: (id:string) => ({
                id,
                ...bpmnElement.userTask.nodeStyle(),
                label: 'New User Task',
                data: bpmnElement.userTask.newNodeData(id, 'New User Task', {
                    ['attr_flowable:candidateGroups']: "",
                    ['attr_flowable:formFieldValidation']:true,
                    attr_id:id,
                    attr_name:'New User Task',
                    extensionElements: {
                        ['flowable:formProperty']:[],
                        ['modeler:activiti-idm-candidate-group']: {
                            'attr_xmlns:modeler': 'http://flowable.org/modeler',
                            '__cdata': 'true'
                        },
                        ['modeler:initiator-can-complete']: {
                            'attr_xmlns:modeler': 'http://flowable.org/modeler',
                            '__cdata': 'false'
                        },
                    },
                  
                })
            })
        }],
        newNodeData:(id,label,data) => ({
            id,
            name:label,
            type: BpmnElementType['userTask'],
            
            data
        }),
        clickHandler:() => {},
        contextMenuComponent:'LazyBpmnContextUserTask',
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
                    {
                        id:'left',
                        group:'left',
                    },
                    {
                        id:'right',
                        group:'right',
                    },
                ]
            },
        }),
        embed:false,
        toolbar:[{
            icon:'/bpmn/icons/check.svg',
            label: "exclusiveGateway",
            dropData:(id:string) => ({
                id,
                ...bpmnElement.exclusiveGateway.nodeStyle({}),
                label: 'new approval',
                data: bpmnElement.exclusiveGateway.newNodeData(id, 'New Approval', {
                    attr_id:id,
                })
            })

        }],
        newNodeData:(id,label,data) => ({
            id,
            type: BpmnElementType['exclusiveGateway'],
            name:label,
            data:{
                attr_id:id,
                ...data
            }
        }),
        clickHandler:() => {},
        contextMenuComponent:'LazyBpmnContextExclusiveGateway',

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
                    {
                        id:'left',
                        group:'left',
                    },
                    {
                        id:'right',
                        group:'right',
                    },
                ]
            },
        }),
        embed:false,
        toolbar:[
            {
                icon:'/bpmn/icons/clock.svg',
                label: 'boundaryEvent',
                dropData:(id:string) => ({
                    id,
                    ...bpmnElement.boundaryEvent.nodeStyle(),
                    data: bpmnElement.boundaryEvent.newNodeData(id, '', {
                        attr_id: id,
                        attr_attachedToRef: "",
                        attr_cancelActivity: false,
                        timerEventDefinition:{
                            timeDuration: 'P3D'
                        }
                    })
                })

            }
        ],
        newNodeData:(id,label,data) => ({
            id,
            type: BpmnElementType['boundaryEvent'],
            name:label,
            data
        }),
        clickHandler:() => {},
        contextMenuComponent:'LazyBpmnContextBoundaryEvent',

    },
    serviceTask:{
        nodeStyle:(item:any) => {
            let icon = '/bpmn/icons/document.svg'
            let color ='#7B61FF'
            let type = "ServiceTask"
            if(!item['attr_flowable:delegateExpression']){
                return squareNodeStyle('#7B61FF', "ServiceTask", icon)
            }
            switch(item['attr_flowable:delegateExpression']){
                case '${sendNotificationDelegate}':
                    icon = '/bpmn/icons/email.svg'
                    type = "Email"
                    color = '#36ce3c'
                    break;
                case '${generateDocumentDelegate}':
                    icon = '/bpmn/icons/document.svg'
                    type = "Document"
                    color = '#7B61FF'
                    break;
                case '${filingGenerateDocumentDelegate}':
                    icon = '/bpmn/icons/folder.svg'
                    type = "Filing"
                    color = '#7B61FF';
                    break;
            }
            return {
                ...squareNodeStyle(color, type, icon),
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
                            id:'left',
                            group:'left',
                        },
                        {
                            id:'right',
                            group:'right',
                        },
                    ]
                },
            }
        },
        embed:false,
        toolbar:[
            {
                icon:'/bpmn/icons/document.svg',
                label:'document',
                dropData:(id:string) => ({
                    id,
                    ...bpmnElement.serviceTask.nodeStyle({
                        ['attr_flowable:delegateExpression']:'${generateDocumentDelegate}',
                        extensionElements:{
                            ['flowable:field']:[
                                {
                                    attr_name: 'notificationType',
                                    'flowable:string': {
                                        "__cdata": ""
                                    }
                                }
                            ]
                        }
                    }),
                    label: 'New Document Generate',
                    data: bpmnElement.serviceTask.newNodeData(id, 'New Document Generate', {
                        attr_id:id,
                        attr_name:'New Document Generate',
                        ['attr_flowable:delegateExpression']:'${generateDocumentDelegate}',
                        extensionElements:{
                            ['flowable:field']:[
                                {
                                    attr_name: 'notificationType',
                                    'flowable:string': {
                                      "__cdata": ""
                                    }
                                }
                            ]
                        }
                    })
                })

            },
            {
                icon:'/bpmn/icons/email.svg',
                label: 'email',
                dropData:(id:string) => ({
                    id,
                    ...bpmnElement.serviceTask.nodeStyle({
                        ['attr_flowable:delegateExpression']:'${sendNotificationDelegate}'
                    }),
                    label: 'New Email',
                    data: bpmnElement.serviceTask.newNodeData(id, 'New Email', {
                        attr_id:id,
                        attr_name:'New Email',
                      ['attr_flowable:delegateExpression']:'${sendNotificationDelegate}',
                        ['attr_flowable:async']:true,
                        ['attr_flowable:exclusive']:false,
                      extensionElements:{
                          ['flowable:field']:[
                              {
                                  attr_name: 'notificationType',
                                  'flowable:string': {
                                    "__cdata": ""
                                  }
                              }
                          ]
                      }
                    })
                })

            },
            {
                icon:'/bpmn/icons/folder.svg',
                label: 'filing',
                dropData: (id:string) => ({
                    id,
                    ...bpmnElement.serviceTask.nodeStyle({
                            ['attr_flowable:delegateExpression']:'${filingGenerateDocumentDelegate}',
                            extensionElements:""
                        }),
                    label: 'New Filing',
                    data: bpmnElement.serviceTask.newNodeData(id, 'New Filing', {
                        attr_id:id,
                        attr_name:'New Filing',
                        ['attr_flowable:delegateExpression']:'${filingGenerateDocumentDelegate}',
                        extensionElements:""
                    })
                })

            }
        ],
        newNodeData:(id,label,data) => ({
            id,
            name:label,
            type: BpmnElementType['serviceTask'],
            
            data
        }),
        clickHandler:() => {},
        contextMenuComponent:(item:any) => {
            const type = item['attr_flowable:delegateExpression']
            if(!type) {
                return 'LazyBpmnContextServiceTask'
            }
            switch(type){
                case '${sendNotificationDelegate}':
                    return 'LazyBpmnContextEmail'
                case '${generateDocumentDelegate}':
                    return 'LazyBpmnContextDocument'
                case '${filingGenerateDocumentDelegate}':
                    return 'LazyBpmnContextFiling'
            }
        },

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
        toolbar:[],
        newNodeData:(id,label,data) => ({
            id,
            name:label,
            type: BpmnElementType['sequenceFlow'],
            
            data
        }),
        clickHandler:() => {}
    }
    
}



