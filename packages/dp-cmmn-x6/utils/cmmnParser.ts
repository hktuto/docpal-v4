// import { HumanTask } from './cmmn.d';
import {XMLBuilder, XMLParser} from 'fast-xml-parser';
import type {CMMN_JSON, PlanItem, Stage} from "./cmmn";
import {Graph, Node} from '@antv/x6';
import {nodeSetting} from './cmmnX6Elements'


export const cmmnToJson = (cmmnString:string): CMMN_JSON => {
    // 如果 cmmnString 是 JSON, 直接返回
    if(typeof cmmnString !== 'string') throw new Error('cmmnString format is not correct');
    
    // 開始轉換 xml string 為 CMMN_JSON
    const parser = new XMLParser( {
        ignoreAttributes: false,
        attributeNamePrefix : "attr_",
        cdataPropName:     "__cdata",
        allowBooleanAttributes: true,
        parseAttributeValue: true
    });
    const json = parser.parse(cmmnString) as CMMN_JSON | any
    // 移除不要的 cmmndi:CMMNDI 
    if(json.definitions['cmmndi:CMMNDI']) {
        delete json.definitions['cmmndi:CMMNDI'];
    }
    // 把所有有可能是 array 東西 都轉成 array。
    json.definitions.case.casePlanModel = normalizeJson(json.definitions.case.casePlanModel)
    if(json.definitions.case.casePlanModel.extensionElements){
        json.definitions.case.casePlanModel.extensionElements = normalizeToArray(json.definitions.case.casePlanModel.extensionElements, 'docpal:attributes')
        json.definitions.case.casePlanModel.extensionElements = normalizeToArray(json.definitions.case.casePlanModel.extensionElements, 'docpal:data_filter')
        json.definitions.case.casePlanModel.extensionElements = normalizeToArray(json.definitions.case.casePlanModel.extensionElements, 'docpal:form')
        
        json.definitions.case.casePlanModel.extensionElements['docpal:attributes'].forEach( (item) => {
            item = normalizeToArray(item, 'field')
        })
        json.definitions.case.casePlanModel.extensionElements['docpal:data_filter'].forEach( (item) => {
            item = normalizeToArray(item, 'filed_condition')
        })
        json.definitions.case.casePlanModel.extensionElements['docpal:form'].forEach( (item) => {
            item = normalizeToArray(item, 'field')
        })
    }else{
        json.definitions.case.casePlanModel.extensionElements = {
            "docpal:attributes":[],
            "docpal:form":[]
        }
        
        // json.definitions.case.casePlanModel.extensionElements['docpal:form'] = []
    }
    console.log("step 1, convert xml to json" , json)
    return json


    
}

function normalizeJson(json:any){
    json = normalizeToArray(json, 'planItem')
    json = normalizeToArray(json, 'humanTask')
    json = normalizeToArray(json, 'stage')
    json = normalizeToArray(json, 'sentry')
    json = normalizeToArray(json, 'milestone')
    json = normalizeToArray(json, 'processTask')
    json = normalizeToArray(json, 'caseTask')
    json = normalizeToArray(json, 'userEventListener')
    json.humanTask.forEach( item => {
        item.extensionElements = normalizeToArray(item.extensionElements, 'docpal:attributes')
        item.extensionElements = normalizeToArray(item.extensionElements, 'docpal:form')
        item.extensionElements['docpal:attributes'].forEach( (field) => {
            field = normalizeToArray(field, 'field')
        })
        item.extensionElements['docpal:form'].forEach( (field) => {
            field = normalizeToArray(field, 'field')
        })
    })
    json.stage.forEach( stage => {
        stage = normalizeJson(stage);
    })
    return json

}

const normalizeToArray = (obj:any = {}, key:string):any[] => {
    if(!obj || !obj[key]) {
        if(!obj) obj = {}
        obj[key] = []
    }else if(!Array.isArray(obj[key])) {
        obj[key] = [obj[key]]
    }
    return obj
}

export const jsonToCmmn =  (json:CMMN_JSON):string => {
    // step 1 , convert json to xml
    const builder = new XMLBuilder(
        {
            ignoreAttributes: false,
            attributeNamePrefix : "attr_",
            cdataPropName:     "__cdata",
            // @ts-ignore
            allowBooleanAttributes: true,
            suppressBooleanAttributes: false
        }
    );
    const step1json =  builder.build(json);
    // step2, parse xml 
    let xmlDom = new DOMParser().parseFromString(step1json, 'text/xml');
    loopAndReorderXmlDom(xmlDom.getElementsByTagName('casePlanModel')[0]);
    const resultJson = step1json.replace(/\<case.*?\<\/case\>/, xmlDom.documentElement.innerHTML)
    return resultJson
}

function loopAndReorderXmlDom(doc:Element){
    let allChildren = doc.children
    for(let i = 0; i < allChildren.length; i++) {
        let child = allChildren[i]
        if(child.tagName === 'sentry') {
            doc.insertBefore(child, doc.children[0])
        }
        if(child.tagName === 'stage') {
            loopAndReorderXmlDom(child)
        }
    }
    for(let i = 0; i < allChildren.length; i++) {
        let child = allChildren[i]
        if(child.tagName === 'planItem') {
            const itemControl = child.getElementsByTagName('itemControl')
            itemControl.forEach((item:any) => {
                const hasRepetition = item.getElementsByTagName('repetitionRule')
                const hasManualActivation = item.getElementsByTagName('manualActivationRule')
                console.log(hasRepetition, hasManualActivation)
                if(hasRepetition.length > 0 && hasManualActivation.length > 0) {
                    item.insertBefore(hasRepetition[0], item.children[0])
                }
            })
            doc.insertBefore(child, doc.children[0])
        }
    }
    for(let i = 0; i < allChildren.length; i++) {
        let child = allChildren[i]
        if(child.tagName === 'extensionElements') {
            doc.insertBefore(child, doc.children[0])
        }
    }
    // got all sentry
    const sentries = doc.getElementsByTagName('sentry');
    if(sentries && sentries.length >0){
        for( let sentry of sentries) {
            const planItemOnPart = sentry.getElementsByTagName('planItemOnPart');
            const ifPart = sentry.getElementsByTagName('ifPart')
            // if planItemOnPart and ifPart is not empty, move planItemOnPart before ifPart
            if(planItemOnPart.length >0 && ifPart.length > 0) {
                sentry.insertBefore(planItemOnPart[0], sentry.children[0])
            }
        }
    }
}


export const NodeToFlatMap = (cmmnJson:any, result={}):any =>{
    const types = ['humanTask','milestone','sentry','processTask','userEventListener','caseTask','planItem']
    
    types.forEach( type => {
        
        if(cmmnJson[type] && cmmnJson[type].length > 0) {
            for( let i = 0; i < cmmnJson[type].length; i++) {
                result[cmmnJson[type][i].attr_id] = {
                    type:type,
                    data:cmmnJson[type][i]
                }
            }
        }
    })
    if(cmmnJson.stage && cmmnJson.stage.length >0) {
        cmmnJson.stage.forEach( stage => {
            result[stage.attr_id] = {
                type:'stage',
                data:stage
            }
            result = NodeToFlatMap(stage, result)
        })
    }
    return result;
}

type NodeOption = {
    x:number,
    y:number,
    label:string,
    zIndex:number,
    id: string,
}
// remove soon, replace with NodeToFlatMap
export const planItemToX6Node = (graph:Graph ,allNodeMap:any, planItem:PlanItem, option: NodeOption):{
    node:Node,
    definition:any,
    exitCriterion?:any
    entryCriterion?:any
} => {
    //從所有item裡找到 planItem 的 definition item;
    const planDefinitionItem = allNodeMap[planItem.attr_definitionRef];
    if(!planDefinitionItem) {
        console.log(planItem)
        throw new Error('planDefinitionItem not found : ')
    }
    // 設定 node 的基本style
    let nodeStyle 
    if(planDefinitionItem && nodeSetting[planDefinitionItem.type]) nodeStyle = nodeSetting[planDefinitionItem.type].nodeStyle
    if(!nodeStyle) {
        throw new Error('nodeStyle not found : '+ planDefinitionItem)
    }
    // 生成 Node, 結合 nodeStyle 和 option
    const Node = graph.addNode({
        ...nodeStyle,
        ...option,
        data:{
            ...planDefinitionItem,
            planItem
        }
    });


    // 看看 planItem 有沒有 Criterion
    let exitCriterion
    let entryCriterion
    if(planItem.exitCriterion) {
        // 新增一個 子Node 在 Node 裡，是放Criterion的。
        const relatedSentry = allNodeMap[planItem.exitCriterion.attr_sentryRef]
        const style = nodeSetting.exitCriterion.nodeStyle
        exitCriterion = graph.addNode({
            ...style,
            id: planItem.exitCriterion.attr_id,
            zIndex:option.zIndex+1,
            label: relatedSentry?.data.attr_name,
            data:{
                type: "exitCriterion",
                planItem: planItem,
                data: planItem.exitCriterion,
                sentry: relatedSentry
            }
        })
        Node.addChild(exitCriterion)
        const size = Node.size();
        const exitSize = exitCriterion.size()
        exitCriterion.position(size.width + exitSize.width / 2, size.height / 2 + exitSize.height / 2,{relative:true})
    }
    if(planItem.entryCriterion) {
        // 新增一個 子Node 在 Node 裡，是放Criterion的Z。
        const relatedSentry = allNodeMap[planItem.entryCriterion.attr_sentryRef]
        const style = nodeSetting.entryCriterion.nodeStyle
        
        entryCriterion = graph.addNode({
            ...style,
            id: planItem.entryCriterion.attr_id,
            zIndex:option.zIndex+1,
            label: relatedSentry?.data.attr_name,
            data:{
                type: "entryCriterion",
                planItem: planItem,
                data: planItem.entryCriterion,
                sentry: relatedSentry
            }
        })
        Node.addChild(entryCriterion)
        const size = Node.size();
        const entrySize = entryCriterion.size()
        entryCriterion.position(0 - entrySize.width / 2, size.height / 2 - entrySize.height /2,{relative:true})
    }

    return {
        node:Node,
        definition: planDefinitionItem,
        exitCriterion,
        entryCriterion
    };
    
}

export type CmmnConnector = {shape:any, source:any,target:any,data:any, router:any, connector:any, attrs:any }
export const createConnector = (data:any, targetId:string, sourceId:string):CmmnConnector => {
    return {
        shape: 'edge',
        source: {
            cell: sourceId || ""
        },
        target: {
            cell: targetId,
            connectionPoint: {
                name: 'boundary',
                args: {
                    sticky: true,
                },
            },
        },
        data: {type: "edge"},
        router: {name: 'manhattan'},
        connector: {name: 'rounded'},
        attrs: {
            line: {
                stroke: '#000',
                strokeDasharray: "2,5",
            }
        },

    };
}

export const fitParentToChildSize = (parentNode:Node, padding = 0) => {
    const fitChildType = ['case' , 'stage']
    if(fitChildType.includes(parentNode.data.type)) {
        parentNode.fit({padding});
    }
    
    // 看看 child 有沒有 entry 或 exit, 有的話，修改 entry 和 exit 的位置
    const children = parentNode.getChildren();
    children?.forEach( (child:any) => {
        if(!child.data || !child.data.type) {
            return;
        }
        if(child.data.type === 'entryCriterion') {
            const size = parentNode.size();
            const childSize = child.size();
            child.position(0 - childSize.width / 2, size.height / 2 - childSize.height /2,{relative:true})

            return
        }
        if(child.data.type === 'exitCriterion') {
            const size = parentNode.size();
            const childSize = child.size()

            child.position(size.width - childSize.width / 2, size.height / 2 + childSize.height / 2,{relative:true})

        }
    })
}

export const loopThoughtCmmnJsonToCreateX6Nodes = (
    json: any, 
    graph:Graph, 
    connections:CmmnConnector[], 
    parentNode:Node,
    parentPosition = {x:0,y:0},
    defaultPadding:number, 
    defaultGap:number= 48,
    allNodeFlatMap:any
) => {
    let topLevelPosition = {
        x: parentPosition.x + defaultPadding,
        y: parentPosition.y + defaultPadding,
    }
    // step 1 loop all planItem
    for( let i = 0; i < json.planItem.length ; i++) {
        const planItem = json.planItem[i];
        let { 
            node, 
            definition, 
            exitCriterion, 
            entryCriterion
        } = planItemToX6Node(
            graph,
            allNodeFlatMap,
            planItem,
            {
                x: topLevelPosition.x,
                y: topLevelPosition.y,
                label:planItem.attr_name,
                zIndex:2,
                id: planItem.attr_id,
            });
        parentNode.addChild(node);
        if(exitCriterion){
            const data = exitCriterion.getData()
            if(data.sentry.data.planItemOnPart) {
                console.log()
                if(Array.isArray(data.sentry.data.planItemOnPart)){
                    data.sentry.data.planItemOnPart.forEach( (onPart) => {
                        connections.push(createConnector(data, exitCriterion.id, onPart.attr_sourceRef ))
                    })
                }else{
                    connections.push(createConnector(data, exitCriterion.id, data.sentry.data.planItemOnPart.attr_sourceRef ))
                }
            }
        }
        if(entryCriterion){
            const data = entryCriterion.getData()
            if(data.sentry.data.planItemOnPart) {
                if(Array.isArray(data.sentry.data.planItemOnPart)){
                    data.sentry.data.planItemOnPart.forEach( (onPart) => {
                        connections.push(createConnector(data, entryCriterion.id, onPart.attr_sourceRef ))
                    })
                }else{
                    connections.push(createConnector(data, entryCriterion.id, data.sentry.data.planItemOnPart.attr_sourceRef ))
                }
            }
        }
        if(definition && definition.type === 'stage') {
            connections = loopThoughtCmmnJsonToCreateX6Nodes(
                definition.data,
                graph,
                connections,
                node,
                topLevelPosition,
                defaultPadding,
                defaultGap,
                allNodeFlatMap
            )
        }
        fitParentToChildSize(node,defaultPadding)
        const childSize = node.size()
        if(i === 0) {
            topLevelPosition.x += childSize.width + defaultGap
        }else if(i % 2 === 1) {
            topLevelPosition.x += childSize.width + defaultGap
        }else{
            topLevelPosition.y += childSize.height + defaultGap
        }
    }
    // check if entry
    fitParentToChildSize(parentNode,defaultPadding)
    return connections
}
