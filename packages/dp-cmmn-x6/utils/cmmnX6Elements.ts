import {Cell, CellView, Edge, Graph} from "@antv/x6";
import type {CaseItemType} from "./cmmn";
import {embeddingValidateRule} from "./cmmnLogic";
import {
    makeTaskStyle,
    type NodeSetting,
    taskSize,
    eventSize,
    criterionSize,
    type ConnectionRuleArgs,
    createClickButton
} from "./cmmnX6ElementHelper";




export const nodeSetting:NodeSetting = {
    case:{
        nodeStyle: {
            width: 640,
            height: 480,
            zIndex:1,
            attrs:{
                body: {
                    stroke: '#ddd',
                    strokeWidth: 1,
                    fill: '#fff',
                    rx: 8,
                    ry: 8,
                    refWidth: 1,
                    refHeight: 1,
                    filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.2))'
                },
                label:{
                    textAnchor: 'left',
                    textVerticalAnchor: 'top',
                    fontSize: 20,
                    refX: 0.01,
                    refY: 0.01,
                    refWidth: 1,
                    textWrap: {
                        width: -10,      // 宽度减少 10px
                        ellipsis: true,  // 文本超出显示范围时，自动添加省略号
                        breakWord: true, // 是否截断单词
                    }
                }
            }
        },
        embed:true,
        embeddingValidateRule:(args) => true,
        connectable:true,
        connectRule: (args) => true,
        showInToolBar:false,
        newNodeData(id, planId, label) {
            return {
                type: 'case',
                data:{
                    attr_id:id,
                    attr_name: label,
                    "flowable:initiatorVariableName":"initiator",
                    casePlanModel: {
                        attr_id: 'plan_' + id,
                        attr_name: 'plan ' + label,
                        'flowable:formFieldValidation':"true",
                        extensionElements: {
                            "docpal:attributes":[],
                            "docpal:form":[]
                        }
                    }
                }
            }
        },
        clickHandler:(args) => {}
    },
    stage: {
        nodeStyle: {
            width: 100,
            height: 100,
            attrs: {
                body: {
                    stroke: '#8f8f8f',
                    strokeDasharray: "5,5",
                    strokeWidth: 1,
                    fill: '#fff',
                    rx: 4,
                    ry: 4,
                },
                label: {
                    textAnchor: 'left',
                    textVerticalAnchor: 'top',
                    refX: 0.01,
                    refY: 0.01,
                    textWrap: {
                        width: -10,      // 宽度减少 10px
                        ellipsis: true,  // 文本超出显示范围时，自动添加省略号
                        breakWord: true, // 是否截断单词
                    }
                }
            }
        },
        embed: true,
        embeddingValidateRule: (arg) => {
            const {type:childType} = arg.child.getData() as any
            const {type:parentType} = arg.parent.getData() as any
            if(!childType || !parentType ) return false
            if(parentType === 'case') {
                return true
            }
            // stage can only have one stage as child
            if(parentType === 'stage') {
                const parentParent = arg.parent.getParent()
                if(parentParent) {
                    if(loopParentToFind(parentParent, 'stage')) {
                        return false
                    }
                }
                
                const parentChild = arg.parent.getChildren()
                if (parentChild) {
                    const nodeId = arg.child.id
                    
                    parentChild.forEach((child) => {
                        if (child.data && child.data.type === 'stage' && child.id !== nodeId) {
                            const childChildren = child.getChildren();
                            if(childChildren) {
                                childChildren.forEach((childChild) => {
                                    if(childChild.data.type === 'stage') {
                                        console.log("child child is stage")
                                        return false
                                    }
                                })
                            }
                            
                        }
                    })
                    return true
                }
                return true;
            }
            return false
        },
        connectable: true,
        connectRule: (args) => true,
        showInToolBar: true,
        toolBarIcon: '/cmmn/icon/stage.svg',
        toolBarLabel: 'caseManagement.casePlanItem.stage',
        toolDraggable: true,
        nodeDragStyle: {
            cursor: 'move'
        },
        newNodeData:(id, planId, label) => {
            return {
                type: 'stage',
                data:{
                    attr_id:id,
                    attr_name: label,
                },
                planItem:{
                    attr_id: 'plan_' + id,
                    attr_name: 'plan ' + label,
                    attr_definitionRef: id,
                    extensionElements: {}
                }
            }
        },
        clickHandler: ({node}:any) => {
            createClickButton(node);
        }
    },
    humanTask:{
        nodeStyle: {...makeTaskStyle('#0099FF', '/cmmn/icon/user-icon.svg')},
        embed: true,
        embeddingValidateRule(arg) {
            
            const {type:childType} = arg.child.getData() as any
            const {type:parentType} = arg.parent.getData() as any
            if(!childType || !parentType ) return false
            const containerReturnList = ['exitCriterion','exitCriterion']
            const notContainerReturnList = ['case','stage']
            if(containerReturnList.includes(parentType) || !notContainerReturnList.includes(parentType)){
                return false
            }
            
            return true     
        },
        connectable:true,
        connectRule: (args) => true,
        showInToolBar: true,
        toolBarIcon: '/cmmn/icon/user.svg',
        toolBarLabel: 'caseManagement.casePlanItem.humanTask',
        toolDraggable: true,
        nodeDragStyle: {
            cursor: 'move'
        },
        newNodeData:(id, planId, label) => {
            return {
                type: 'humanTask',
                data:{
                    attr_id:id,
                    attr_name: label,
                    'attr_flowable:assignee': "",
                    'attr_flowable:formFieldValidation' : true,
                    extensionElements:{}
                },
                planItem:{
                    attr_id: 'plan_' + id,
                    attr_name: 'plan ' + label,
                    attr_definitionRef: id,
                    extensionElements: {}
                }
            }
        },
        clickHandler: ({node}:any) => { createClickButton(node);}
    },
    // caseTask:{
    //     nodeStyle: {...makeTaskStyle('#E48F4C', '/cmmn/icon/caseTask-icon.svg')},
    //     embed: true,
    //     embeddingValidateRule(arg) {
    //         const {type:childType} = arg.child.getData() as any
    //         const {type:parentType} = arg.parent.getData() as any
    //         if(!childType || !parentType ) return false
    //         const containerReturnList = ['exitCriterion','exitCriterion']
    //         const notContainerReturnList = ['case','stage']
    //         if(containerReturnList.includes(parentType) || !notContainerReturnList.includes(parentType)){
    //             return false
    //         }
    //        
    //         return true
    //     },
    //     connectable:true,
    //     connectRule: (args) => true,
    //     showInToolBar: true,
    //     toolBarIcon: '/cmmn/icon/caseTask.svg',
    //     toolBarLabel: 'caseManagement.casePlanItem.caseTask',
    //     toolDraggable: true,
    //     nodeDragStyle: {
    //         cursor: 'move'
    //     },
    //     newNodeData:(id, planId, label) => {
    //         return {
    //             type: 'caseTask',
    //             data:{
    //                 attr_id:id,
    //                 attr_name: label,
    //                 extensionElements:{}
    //             },
    //             planItem:{
    //                 attr_id: 'plan_' + id,
    //                 attr_name: 'plan ' + label,
    //                 attr_definitionRef: id,
    //                 extensionElements: {}
    //             }
    //         }
    //     },
    //     clickHandler: ({node}) => { createClickButton(node);}
    // },
    milestone:{
        nodeStyle: {...makeTaskStyle('#7B61FF', '/cmmn/icon/milestone-icon.svg')},
        embed: true,
        embeddingValidateRule(arg) {
            const {type:childType} = arg.child.getData() as any
            const {type:parentType} = arg.parent.getData() as any
            if(!childType || !parentType ) return false
            const containerReturnList = ['exitCriterion','exitCriterion']
            const notContainerReturnList = ['case','stage']
            if(containerReturnList.includes(parentType) || !notContainerReturnList.includes(parentType)){
                return false
            }

            return true    
        },
        connectable:true,
        connectRule: (args) => true,
        showInToolBar: true,
        toolBarIcon: '/cmmn/icon/milestone.svg',
        toolBarLabel: 'caseManagement.casePlanItem.milestone',
        toolDraggable: true,
        nodeDragStyle: {
            cursor: 'move'
        },
        newNodeData:(id, planId, label) => {
            return {
                type: 'milestone',
                data:{
                    attr_id:id,
                    attr_name: label,
                },
                planItem:{
                    attr_id: 'plan_' + id,
                    attr_name: 'plan ' + label,
                    attr_definitionRef: id,
                    extensionElements: {}
                }
            }
        },
        clickHandler: ({node}:any) => { createClickButton(node);}
    },
    processTask:{
        nodeStyle: {...makeTaskStyle('#29CC6A', '/cmmn/icon/workflow-icon.svg')},
        embed: false,
        embeddingValidateRule: (args) => {
            const {type:childType} = args.child.getData() as any
            const {type:parentType} = args.parent.getData() as any
            if(!childType || !parentType ) return false
            const containerReturnList = ['exitCriterion','exitCriterion']
            const notContainerReturnList = ['case','stage']
            if(containerReturnList.includes(parentType) || !notContainerReturnList.includes(parentType)){
                console.log("embed into processTask")
                return false
            }

            return true
        },
        connectable:true,
        connectRule: (args) => true,
        showInToolBar: true,
        toolBarIcon: '/cmmn/icon/workflow.svg',
        toolBarLabel: 'caseManagement.casePlanItem.processTask',
        toolDraggable: true,
        nodeDragStyle: {
            cursor: 'move'
        },
        newNodeData:(id, planId, label) => {
            return {
                type: 'processTask',
                data:{
                    "attr_flowable:fallbackToDefaultTenant": false,
                    attr_id:id,
                    attr_name: label,
                    extensionElements:{
                        "flowable:in": [],
                        "flowable:out": [],
                        'flowable:planItemLifecycleListener':{
                            attr_sourceState:'active',
                            attr_targetState: 'completed',
                            attr_delegateExpression: '${cmmnProcessTaskLifecycleListener}'
                        }
                    },
                    processRefExpression:{
                        "__cdata":""
                    }
                },
                planItem:{
                    attr_id: 'plan_' + id,
                    attr_name: 'plan ' + label,
                    attr_definitionRef: id,
                    extensionElements: {}
                }
            }
        },
        clickHandler: ({node}:any) => { createClickButton(node);}
    },
    userEventListener:{
        nodeStyle: { ...makeTaskStyle('#FFDA61', '/cmmn/icon/event-icon.svg')},
            
        embed: false,
        embeddingValidateRule: (args) => {
            const {type:childType} = args.child.getData() as any
            const {type:parentType} = args.parent.getData() as any
            if(!childType || !parentType ) return false
            const containerReturnList = ['exitCriterion','exitCriterion']
            const notContainerReturnList = ['case','stage']
            if(containerReturnList.includes(parentType) || !notContainerReturnList.includes(parentType)){
                return false
            }

            return true
        },
        connectable:true,
        connectRule: (args) => true,
        showInToolBar: true,
        toolBarIcon: '/cmmn/icon/event.svg',
        toolBarLabel: 'caseManagement.casePlanItem.userEventListener',
        toolDraggable: true,
        nodeDragStyle: {
            cursor: 'move'
        },
        newNodeData:(id, planId, label) => {
            return {
                type: 'userEventListener',
                data:{
                    "attr_flowable:availableCondition": "",
                    attr_id:id,
                    attr_name: label,
                },
                planItem:{
                    attr_id: 'plan_' + id,
                    attr_name: 'plan ' + label,
                    attr_definitionRef: id,
                    extensionElements: {}
                }
            }
        },
        clickHandler: ({node}:any) => { createClickButton(node);}
    },
    exitCriterion:{
        nodeStyle: {
            width:criterionSize,
            height:criterionSize,
            attrs:{
                body: {
                    stroke: '#266CD6',
                    strokeWidth: 1,
                    fill: '#fff',
                    rx: 20,
                    ry: 20,
                },
                image: {
                    'xlink:href': '/cmmn/icon/exit-icon.svg',
                    refWidth: 0.6,
                    refHeight: 0.6,
                    refX: 0.2,
                    refY: 0.2
                },
            },
            markup: [
                {
                    tagName: 'rect',
                    selector: 'body',
                },
                {
                    tagName: 'image',
                    selector: 'image',
                },
            ],
        },
        embed: true,
        embeddingValidateRule(arg) {
            const {type} = arg.child.getData() as any
            const {type : parentType} = arg.parent.getData() as any
            
            if(!type) return false
            
            if (parentType === 'exitCriterion' || parentType === 'entryCriterion'){
                return false
            }
            console.log("parent", arg.parent, "child", arg.child)
            return cannotEmbedSameNodeType(arg.parent, arg.child, 1)     
        },
        connectable:true,
        connectRule: (args) => true,
        showInToolBar: true,
        toolBarIcon: '/cmmn/icon/exit.svg',
        toolBarLabel: 'caseManagement.casePlanItem.exitCriterion',
        toolDraggable: true,
        newNodeData:(id, planId, label) => {
            return {
                type: 'exitCriterion',
                data:{
                    "attr_flowable:availableCondition": "",
                    attr_id:id,
                    attr_name: label,
                    attr_sentryRef: 'sentry_'+ id,
                },
                planItem:{
                    attr_id: 'plan_' + id,
                    attr_name: 'plan ' + label,
                    attr_definitionRef: id,
                    extensionElements: {}
                },
                sentry:{
                    type:"sentry",
                    data: {
                        attr_id: 'sentry_'+id,
                        attr_name: 'sentry_'+id,
                        
                    }
                }
            }
        },
        clickHandler: ({node}:any) => { createClickButton(node);}
        
    },
    entryCriterion:{
        nodeStyle: {
            width: criterionSize,
            height: criterionSize,
            attrs: {
                body: {
                    stroke: '#266CD6',
                    strokeWidth: 1,
                    fill: '#fff',
                    rx: 20,
                    ry: 20,
                },
                image: {
                    'xlink:href': '/cmmn/icon/entry-icon.svg',
                    refWidth: 0.6,
                    refHeight: 0.6,
                    refX: 0.2,
                    refY: 0.2
                },
            },
            markup: [
                {
                    tagName: 'rect',
                    selector: 'body',
                },
                {
                    tagName: 'image',
                    selector: 'image',
                },
            ],
        },
        embed: true,
        embeddingValidateRule(arg) {
            const {type} = arg.child.getData() as any
            const {type : parentType} = arg.parent.getData() as any

            if(!type) return false
            if(parentType === 'exitCriterion' || parentType === 'entryCriterion'){
                return false
            }
            
            return cannotEmbedSameNodeType(arg.parent, arg.child, 1)
        },
        connectable: true,
        connectRule: (args) => true,
        showInToolBar: true,
        toolBarIcon: '/cmmn/icon/entry.svg',
        toolBarLabel: 'caseManagement.casePlanItem.enterCriterion',
        newNodeData:(id, planId, label) => {
            return {
                type: 'entryCriterion',
                data:{
                    "attr_flowable:availableCondition": "",
                    attr_id:id,
                    attr_name: label,
                    attr_sentryRef: 'sentry_'+ id,
                },
                planItem:{
                    attr_id: 'plan_' + id,
                    attr_name: 'plan ' + label,
                    attr_definitionRef: id,
                    extensionElements: {}
                },
                sentry:{
                    type:"sentry",
                    data: {
                        attr_id: 'sentry_' + id,
                        attr_name: id,
                    }
                }
            }
        },
        toolDraggable: true,
        clickHandler: ({node}:any) => { createClickButton(node);}
    }
}


function loopParentToFind(node:Cell, type:string){
    if(node.isNode()){
        const {type: nodeType} = node.data
        if(nodeType === type){
            return true
        }
    }
    const parent = node.getParent()
    if(parent){
        return loopParentToFind(parent, type)
    }
    return false
}
// embed helper 
function cannotEmbedSameNodeType(parent:Cell, child:Cell, count:number = 0) {
    const {type} = child.getData();
    let totalSameTypeCount = 0;
    const parentChild = parent.getChildren()
    if(!parentChild) {
        return true
    }
    parentChild.forEach((childItem) => {
        if(childItem.data && childItem.data.type === type && child.id !== childItem.id){
            console.log("cannot embed same type", type,parent, childItem, child)
            totalSameTypeCount += 1
        }
    })
    return totalSameTypeCount < count
}



Graph.registerEdgeTool('circle-source-arrowhead', {
    inherit: 'source-arrowhead',
    tagName: 'circle',
    attrs: {
        r: 10,
        fill: '#000',
        cursor: 'move',
    },
})
Graph.registerEdgeTool('circle-target-arrowhead', {
    inherit: 'target-arrowhead',
    tagName: 'circle',
    attrs: {
        r: 10,
        fill: '#000',
        cursor: 'move',
    },
})
