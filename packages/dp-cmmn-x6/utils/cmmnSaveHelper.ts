import {Cell, Graph} from "@antv/x6";
import type {Case, CaseTask, CMMN_JSON, HumanTask, Milestone, ProcessTask, Stage, UserEventListener} from "./cmmn";
import {jsonToCmmn} from "./cmmnParser";
import {getExtentionProperties} from "./cmmnConfig";

export const convertX6JsonToCmmnJson = (graph:Graph ,caseId:string):{xml:string,json:any} => {
    // get all nodes and edge
    const caseNode =  graph.getCellById(caseId);
    const cmmnJson: CMMN_JSON = {
        '?xml':{
            attr_version: '1.0',
            attr_encoding: 'UTF-8',
        },
        definitions: {
            "attr_xmlns":"http://www.omg.org/spec/CMMN/20151109/MODEL",
            "attr_xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance",
            "attr_xmlns:flowable":"http://flowable.org/cmmn",
            "attr_xmlns:cmmndi":"http://www.omg.org/spec/CMMN/20151109/CMMNDI",
            'attr_xmlns:dc':"http://www.omg.org/spec/CMMN/20151109/DC",
            'attr_xmlns:di':"http://www.omg.org/spec/CMMN/20151109/DI",
            attr_targetNamespace:"Business_CaseModel", 
            "attr_xmlns:docpal":"http://www.w3.org/1999/xhtml",
            attr_exporter:"Flowable Open Source Modeler",
            attr_exporterVersion:"6.8.0",
            case: {
                attr_id: caseNode?.data?.data?.attr_id,
                attr_name: caseNode?.data?.data?.attr_name,
                casePlanModel: {
                    attr_id: caseNode?.data?.data?.casePlanModel?.attr_id,
                    attr_name: caseNode?.data?.data?.casePlanModel?.attr_name,
                    extensionElements: caseNode?.data?.data?.casePlanModel?.extensionElements,
                    planItem:[],
                    stage:[],
                    humanTask:[],
                    sentry:[],
                    milestone:[],
                    processTask:[],
                    userEventListener:[],
                    caseTask:[]
                }
            }
        }
    }
    
    // get children of case
    cmmnJson.definitions.case.casePlanModel = loopNodeChild(cmmnJson.definitions.case.casePlanModel, caseNode);
    // add all form info to start human task
    // const allFormField = 
    const caseInformation = getExtentionProperties(caseNode.data.data.casePlanModel, 'docpal:form')
    // find human task with 'start'
    graph.getNodes().forEach((node) => {
        
        if(node.data.type === 'humanTask' ) {
            // add caseInformation to human task
            const time = new Date().getTime();
            node.setData({
                ...node.data,
                data:{
                    ...node.data.data,
                    extensionElements: {
                        ...node.data.data.extensionElements,
                        'docpal:form': [
                            {
                                attr_casetable: caseId,
                                attr_id : 'docpal_form_' + time,
                                attr_name : 'docpal_form_' + time,
                                field: [...caseInformation.map(c => ({
                                    attr_displayField: c.displayField,
                                    attr_documentType: c.documentType,
                                    attr_filterList: c.filterList,
                                    attr_id: c.id,
                                    attr_masterTable: c.masterTable,
                                    attr_name: c.name,
                                    attr_type: c.type,
                                    attr_vocabulary: c.vocabulary
                                }))]
                            }
                        ]
                    }
                }
            },{
                overwrite:true,
                deep:true
            })

        }
    })
    // 
    const children = caseNode?.getChildren();
    if(!children) return {
        json:graph.toJSON(),
        xml:jsonToCmmn(cmmnJson)
    }
    children.forEach( child => {
        if(child.data.type === 'exitCriterion') {
            cmmnJson.definitions.case.casePlanModel.exitCriterion = child.data.data
            // check if sentry is null
            cmmnJson.definitions.case.casePlanModel.sentry = [
                child.data.sentry.data
            ]
        }

        if(child.data.type === 'entryCriterion') {
            cmmnJson.definitions.case.casePlanModel.entryCriterion = child.data.data
            cmmnJson.definitions.case.casePlanModel.sentry = [
                child.data.sentry.data
            ]
        }
    })
    const x6Json = graph.toJSON();
    return {
        json:x6Json,
        xml:jsonToCmmn(cmmnJson)
    };
}

function loopNodeChild(cmmnJson:any, node:Cell) {
    const children = node?.getChildren();
    if( node.data.type === 'stage' ) {
        const stageData = node.getData();
        
        let newStageObj:Stage = {
            attr_id: stageData.data.attr_id,
            attr_name: stageData.data.attr_name,
            planItem :[],
            stage :[],
            humanTask :[],
            sentry :[],
            milestone:[],
            processTask:[],
            userEventListener:[],
            caseTask:[]
        } ;
        const stageChild = node.getChildren()
        if(stageChild && stageChild.length > 0) {
            
            stageChild.forEach((stageChildItem:any) => {

                newStageObj = loopNodeChild(newStageObj, stageChildItem);
            })
        }
    }
    if(children && children.length > 0) {
        children.forEach((child:any) => {
            const data = child.getData();
            
            // add planItem
            if(!data || !data.type) return
            switch (data.type) {
                case "stage" :
                    
                    let newStageObj:Stage = {
                        attr_id: data.data.attr_id,
                        attr_name: data.data.attr_name,
                        planItem :[],
                        stage :[],
                        humanTask :[],
                        sentry :[],
                        milestone:[],
                        processTask:[],
                        userEventListener:[],
                        caseTask:[]
                    } ;
                    newStageObj = loopNodeChild(newStageObj, child);
                    // const stageChild = child.getChildren()
                    //
                    // if(stageChild && stageChild.length > 0) {
                    //    
                    //     stageChild.forEach((stageChildItem:any) => {
                    //        
                    //         newStageObj = loopNodeChild(newStageObj, stageChildItem);
                    //         console.log("stageChildItem", newStageObj, stageChildItem)
                    //     })
                    // }
                    
                    
                    cmmnJson.stage.push(newStageObj);
                    
                    break;
                case 'humanTask' :
                    let newHumanTaskObj:HumanTask = {
                        'attr_flowable:assignee': data.data['attr_flowable:assignee'] || '${creator}',
                        'attr_flowable:formFieldValidation' : data.data['attr_flowable:formFieldValidation'],
                        attr_id: data.data.attr_id,
                        attr_name: data.data.attr_name,
                        extensionElements: data.data.extensionElements
                    }
                    cmmnJson.humanTask.push(newHumanTaskObj);
                    break;
                case 'caseTask' :
                    let newCaseTask:CaseTask = {
                        attr_id: data.data.attr_id,
                        attr_name: data.data.attr_name,
                        caseRefExpression: data.data.caseRefExpression,
                        extensionElements: data.data.extensionElements
                    }
                    cmmnJson.caseTask.push(newCaseTask);
                    break;
                case 'milestone' :
                    let newMilestone:Milestone = {
                        attr_id: data.data.attr_id,
                        attr_name: data.data.attr_name,
                    }
                    cmmnJson.milestone.push(newMilestone);
                    break;
                case 'processTask' :
                    let newProcessTask:ProcessTask = {
                        attr_id: data.data.attr_id,
                        attr_name: data.data.attr_name,
                        'attr_flowable:fallbackToDefaultTenant' : data.data['attr_flowable:fallbackToDefaultTenant'],
                        extensionElements: data.data.extensionElements,
                        processRefExpression: data.data.processRefExpression
                    }
                    cmmnJson.processTask.push(newProcessTask);
                    break;
                case 'userEventListener':
                    let newUserEventListener: UserEventListener = {
                        attr_id: data.data.attr_id,
                        attr_name: data.data.attr_name,
                        "attr_flowable:availableCondition": data.data['attr_flowable:availableCondition']
                    }
                    cmmnJson.userEventListener.push(newUserEventListener);
                    break;
                case 'exitCriterion':
                    break;
                case 'entryCriterion' :
                    break;
                case 'edge':
                    break;
                default:
                    break;
            }
            
            cmmnJson = createPlanItem(cmmnJson, child);
        })
    }
    
    return cmmnJson
}

function createPlanItem(cmmnJson: any, node:Cell) {
    const data = node.getData();
    
    if(!data.planItem || !node.isNode() || data.type === "exitCriterion" || data.type === 'entryCriterion') return cmmnJson;
    let newPlanItem:any;
    if(data.planItem){
        newPlanItem = {
            attr_id: data.planItem.attr_id,
            attr_name: data.planItem.attr_name,
            attr_definitionRef: data.planItem.attr_definitionRef
        }
        if(data.planItem.itemControl){
            newPlanItem.itemControl = data.planItem.itemControl
        }
        // check if planItem have entryCriterion || exitCriterion

    }
    const allchildren = node.getChildren()
    if(allchildren && allchildren.length > 0) {
        allchildren.forEach( (children) => {
            let newSentry;
            if(children.getData().type === 'exitCriterion') {
                newPlanItem.exitCriterion = children.getData().data
                if(children.getData().sentry ) {
                    console.log("children.getData().sentry", children.getData().sentry)
                    newSentry = children.getData().sentry.data
                }
            }
            if(children.getData().type === 'entryCriterion') {
                newPlanItem.entryCriterion = children.getData().data
                if(children.getData().sentry) {
                    console.log("children.getData().sentry", children.getData().sentry)

                    newSentry = children.getData().sentry.data
                }
            }
            if(newSentry){
                cmmnJson.sentry.push(newSentry);
            }
        })
    }
    if(newPlanItem) {
        cmmnJson.planItem.push(newPlanItem);
    }
    
    return cmmnJson;
}
