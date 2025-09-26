import { Graph } from "@antv/x6";
import type {CMMN_JSON, FormAttributes, FormField, PlanItem} from "../utils/cmmn";
import {
    type CmmnConnector,
    NodeToFlatMap,
    cmmnToJson,
    createConnector,
    fitParentToChildSize,
    planItemToX6Node, loopThoughtCmmnJsonToCreateX6Nodes
} from "../utils/cmmnParser";
import {nodeSetting} from "../utils/cmmnX6Elements";
import {computed, ref} from "vue";

export const useCmmnGraph = () => {
    
    const graph = useState('graph', () => null);
    const caseId = useState<string>('caseId', () => null);
    const cmmnJson = useState<CMMN_JSON>('cmmnJson', () => null)
    
    
    const caseNode = computed(() => {
        if(!graph.value || !caseId.value) return null;
        return graph.value?.getCellById(caseId.value)
    })
    
    const caseInformation = computed(() => {
        if(!caseNode.value || !caseId.value ) return null;
        return caseNode.value?.data?.data?.casePlanModel?.extensionElements
    })

    const allNodeFlatMap = useState('nodeFlatMap',()=>({}))
    
    function setupCanvas(cmmnString: string, x6Json:any, option:Graph.Options, padding = 100) {
        if(graph.value) {
            graph.value.dispose();
            caseId.value = null;
        }
        if(!option.container) {
            throw new Error('Container is not found')
        }
        if(!cmmnString) {
            throw new Error('cmmnString is required')
        }
        // throw error if cmmnString is defined but typeof cmmnString is not string or object
        if(typeof cmmnString !== 'string') {
            throw new Error('cmmnString format is not string');
        }
        // throw error if x6Json is defined but typeof x6Json is not object
        if(x6Json && typeof x6Json !== 'object') {
            throw new Error('x6Json format is not object');
        }
        cmmnJson.value = cmmnToJson(cmmnString)
        const containerEl = option.container
        if(graph.value){
            graph.value.dispose();
        }
        graph.value = new Graph({
            container: containerEl,
            ...option
        });
        allNodeFlatMap.value = NodeToFlatMap(cmmnJson.value.definitions.case.casePlanModel)
        allNodeFlatMap.value[cmmnJson.value.definitions.case.attr_id] = {
            type:'case',
            data: {
                attr_id: cmmnJson.value.definitions.case.attr_id,
                attr_name: cmmnJson.value.definitions.case.attr_name,
                
                'flowable:initiatorVariableName': cmmnJson.value.definitions.case['attr_flowable:initiatorVariableName'],
                casePlanModel: {
                    "flowable:formFieldValidation": cmmnJson.value.definitions.case.casePlanModel["attr_flowable:formFieldValidation"],
                    
                    attr_id: cmmnJson.value.definitions.case.casePlanModel.attr_id,
                    attr_name:cmmnJson.value.definitions.case.casePlanModel.attr_name,

                    extensionElements: cmmnJson.value.definitions.case.casePlanModel.extensionElements
                }
            },
        }
        // setGraphFromCmmn(cmmnJson.value)
        if(x6Json && typeof x6Json === 'object') {
            console.log("x6Json", x6Json);
            setX6Json(x6Json, cmmnJson.value)
        }else {
            // check cmmnString type, if is string, then convert to CMMN_JSON
            setGraphFromCmmn(cmmnJson.value)
        }
        graph.value.zoomToFit({padding})
        
        
    }
    
    function centerGraph() {
        graph.value.centerContent();
    }
    
    function setX6Json(x6Json: any, cmmnJson:CMMN_JSON) {
        // loop all cell and update data from cmmnJson
        caseId.value = cmmnJson.definitions.case.attr_id

        // find caseId node
        const index = x6Json.cells.findIndex(cell => cell.id === cmmnJson.definitions.case.attr_id)
        if(index !== -1) {
            x6Json.cells[index].data.data = {...cmmnJson.definitions.case}
        }
        // console.log(x6Json.cells[index], cmmnJson.definitions.case);
        // x6Json.cells.forEach( cell => {
        //     const { type } = cell.data;
        //     let planItem = allNodeFlatMap.value[cell.id];
        //     if (allNodeFlatMap.value[`plan_${cell.id}`]) planItem = allNodeFlatMap.value[`plan_${cell.id}`]
        //     console.log(cell, type, cell.id, 'cell');
        //     if(!planItem) return 
        //     console.log(planItem);
            
        //     switch (type) {
        //         case 'case':
        //             cell.data = {
        //                 id: cmmnJson.definitions.case.attr_id,
        //                 label: cmmnJson.definitions.case.attr_name,
        //                 type: 'case',
        //                 data: {
        //                     attr_id: cmmnJson.definitions.case.attr_id,
        //                     attr_name: cmmnJson.definitions.case.attr_name,
        //                     casePlanModel: {
        //                         attr_id: cmmnJson.definitions.case.casePlanModel.attr_id,
        //                         attr_name:cmmnJson.definitions.case.casePlanModel.attr_name,

        //                         extensionElements: cmmnJson.definitions.case.casePlanModel.extensionElements
        //                     }
        //                 },
        //             }
        //             cell.id = cmmnJson.definitions.case.attr_id
        //             cell.attrs = {...cell.attrs , ...nodeSetting.case.nodeStyle.attrs}
        //             cell.attrs.text.text = cmmnJson.definitions.case.attr_name
        //             // console.log("case style", cell)
        //             break
        //         case 'stage':
        //             const item = allNodeFlatMap.value[planItem.data.attr_definitionRef]
        //             cell.data ={
        //                  type: 'stage',
        //                  data: item.data,
        //                 planItem : planItem.data
        //             }
        //             cell.attrs = nodeSetting.stage.nodeStyle.attrs
        //             break;
        //         case 'milestone':
        //             const milestoneItem = allNodeFlatMap.value[planItem.data.attr_definitionRef]
        //             cell.data = {
        //                 type: 'milestone',
        //                 data: milestoneItem.data,
        //                 planItem : planItem.data
        //             }
        //             cell.attrs = nodeSetting.milestone.nodeStyle.attrs

        //             break;
        //         case 'humanTask':
        //             const humanTaskItem = allNodeFlatMap.value[planItem.data.attr_definitionRef]
                    
        //             cell.data = {
        //                 type: 'humanTask',
        //                 data: humanTaskItem.data,
        //                 planItem : planItem.data
        //             }
        //             cell.attrs = nodeSetting.humanTask.nodeStyle.attrs

        //             break;
        //         case 'userEventListener':
        //             const userEventListenerItem = allNodeFlatMap.value[planItem.data.attr_definitionRef]
        //             cell.data = {
        //                 type: 'userEventListener',
        //                 data: userEventListenerItem.data,
        //                 planItem : planItem.data
        //             }
        //             cell.attrs = nodeSetting.userEventListener.nodeStyle.attrs

        //             break;
        //         case 'processTask':
        //             const processTaskItem = allNodeFlatMap.value[planItem.data.attr_definitionRef]
        //             cell.data = {
        //                 type: 'processTask',
        //                 data: processTaskItem.data,
        //                 planItem : planItem.data
        //             }
        //             cell.attrs = nodeSetting.processTask.nodeStyle.attrs

        //             break;
        //         case 'caseTask':
        //             const caseTaskItem = allNodeFlatMap.value[planItem.data.attr_definitionRef]
        //             cell.data = {
        //                 type: 'caseTask',
        //                 data: caseTaskItem.data,
        //                 planItem : planItem.data
        //             }
        //             cell.attrs = nodeSetting.caseTask.nodeStyle.attrs

        //             break;
        //         case 'entryCriterion':
        //             const entryPlanItem = allNodeFlatMap.value[cell.data.planItem.attr_id]
        //             let entryItem;
        //             if(cell.data?.planItem?.entryCriterion?.attr_sentryRef) {
        //                 entryItem = allNodeFlatMap.value[cell.data.planItem.entryCriterion.attr_sentryRef]
        //             }
        //             cell.data = {
        //                 type: "entryCriterion",
        //                 sentry: entryItem ? {type:'sentry', data:entryItem.data} : null,
        //                 planItem: entryPlanItem.data,
        //                 data: entryPlanItem.data.entryCriterion
        //             }
        //             cell.attrs = nodeSetting.entryCriterion.nodeStyle.attrs

        //             break;
        //         case 'exitCriterion':
        //             const exitPlanItem = allNodeFlatMap.value[cell.data.planItem.attr_id];
        //             console.log(cell)
        //             const sentryId = cell.data.planItem.exitCriterion?.attr_sentryRef || cell.data.sentry.data.attr_id
        //             const exitItem = allNodeFlatMap.value[sentryId];
        //             cell.data = {
        //                 type: "exitCriterion",
        //                 sentry: exitItem ? {type:"sentry",data:exitItem.data} : null,
        //                 planItem:exitPlanItem.data,
        //                 data: exitPlanItem.data.entryCriterion

        //             }
        //             cell.attrs = nodeSetting.exitCriterion.nodeStyle.attrs

        //             break;
        //         default:
        //             console.log(cell)
        //             break
                
        //     }
        // })
        graph.value.fromJSON(x6Json)
    }

    function setGraphFromCmmn(json: CMMN_JSON) {
        console.log("setGraphFromCmmn", json);
        // step1 create Case
        const padding = 64;
        const gap = 48 // padding for all node
        let caseSize = {
            width: padding,
            height: padding,
        }
        let connections:CmmnConnector[] = [

        ]
        // 生成所有 Node
        const style = nodeSetting.case.nodeStyle
        caseId.value = json.definitions.case.attr_id
        const caseNode = graph.value.addNode({
            ...style,
            id: json.definitions.case.attr_id,
            label: json.definitions.case.attr_name,
            
            data:{
                type: 'case',
                data: {
                    attr_id: json.definitions.case.attr_id,
                    attr_name: json.definitions.case.attr_name,
                    'flowable:initiatorVariableName': json.definitions.case['attr_flowable:initiatorVariableName'],
                    casePlanModel: {
                        "flowable:formFieldValidation": json.definitions.case.casePlanModel["attr_flowable:formFieldValidation"],
                        
                        attr_id: json.definitions.case.casePlanModel.attr_id,
                        attr_name:json.definitions.case.casePlanModel.attr_name,

                        extensionElements: json.definitions.case.casePlanModel.extensionElements
                    }
                },
            }
        })
        console.log("caseNode", caseNode)
        let level1Position = {
            x: padding,
            y: padding
        }
        connections = loopThoughtCmmnJsonToCreateX6Nodes(
            json.definitions.case.casePlanModel,
            graph.value,
            connections,
            caseNode,
            level1Position,
            padding,
            gap,
            allNodeFlatMap.value
        )

        
        // check if case has entry or exit criterion
        const { exitCriterion, entryCriterion } = json.definitions.case.casePlanModel
        if(exitCriterion) {
            const relatedSentry = allNodeFlatMap.value[exitCriterion.attr_sentryRef]
            const style = nodeSetting.exitCriterion.nodeStyle
            
            const exitCriterionNode = graph.value.addNode({
                ...style,
                id: exitCriterion.attr_id,
                zIndex: 2,
                label: relatedSentry?.data.attr_name,
                data:{
                    type: "exitCriterion",
                    planItem: null,
                    data: exitCriterion,
                    sentry: relatedSentry
                }
            })
            caseNode.addChild(exitCriterionNode)
            const size = caseNode.size();
            const entrySize = exitCriterionNode.size()
            exitCriterionNode.position(size.width + entrySize.width / 2, size.height / 2 - entrySize.height /2,{relative:true})
            connections.push(createConnector(exitCriterionNode.data, exitCriterionNode.id, exitCriterionNode.data.sentry.data.planItemOnPart.attr_sourceRef ))

        }
        if(entryCriterion){
            const relatedSentry = allNodeFlatMap.value[entryCriterion.attr_sentryRef]
            const style = nodeSetting.entryCriterion.nodeStyle
            
            const entryCriterionNode = graph.value.addNode({
                ...style,
                id: entryCriterion.attr_id,
                zIndex: 2,
                label: relatedSentry?.data.attr_name,
                data:{
                    type: "entryCriterion",
                    planItem: null,
                    data: entryCriterion,
                    sentry: relatedSentry
                }
            })
            caseNode.addChild(entryCriterionNode)
            const size = caseNode.size();
            const entrySize = entryCriterionNode.size()
            entryCriterionNode.position(0 - entrySize.width / 2, size.height / 2 - entrySize.height /2,{relative:true})
            connections.push(createConnector(entryCriterionNode.data, entryCriterionNode.id, entryCriterionNode.data.sentry.data.planItemOnPart.attr_sourceRef ))
            
        }
        
        // 生成連接點
        connections.forEach( connection => {
            graph.value.addEdge(connection)
        })
    }

    function getGraphJson() {
        const json = graph.value.toJSON();
       
        return json;
    }
    
    return {
        caseInformation,
        allNodeFlatMap,
        graph,
        caseId,
        caseNode,
        setupCanvas,
        getGraphJson,
        centerGraph
    }
}
