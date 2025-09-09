import {XMLParser, XMLBuilder} from "fast-xml-parser";
import type {Cell, Graph} from '@antv/x6'
import type { BPMNJSON } from "./bpmnType";
import { BpmnElementType, bpmnElement } from "./bpmnElement";


export const nodeXmltoJson = function(nodeXml: string) {
    const parser = new XMLParser( {
        ignoreAttributes: false,
        attributeNamePrefix : "attr_",
        cdataPropName:     "__cdata",
        allowBooleanAttributes: true,
        parseAttributeValue: true
    });
    let json = parser.parse(nodeXml)

    return json
}

export const bpmnStringToJson = function(bpmnString: string) {
    const parser = new XMLParser( {
        ignoreAttributes: false,
        attributeNamePrefix : "attr_",
        cdataPropName:     "__cdata",
        allowBooleanAttributes: true,
        parseAttributeValue: true
    });
    let json = parser.parse(bpmnString) as BPMNJSON
    json.definitions['attr_xmlns:folderCabinetMapping'] = 'http://www.w3.org/1999/xhtml'
    json.definitions['attr_xmlns:permissions'] = 'http://www.w3.org/1999/xhtml'
    // remove template from process
    if(json.definitions.process.attr_template) {
        delete json.definitions.process.attr_template
    }
    let flatObj:any = {}
    // check if process has start and end event
    if(!json.definitions.process.startEvent || json.definitions.process.startEvent.length === 0) {
        json.definitions.process.startEvent = [{
            attr_id: 'startEvent',
            attr_name: 'Start Event',
            extensionElements: {
            }
        }]
    }
    if(!json.definitions.process.endEvent || json.definitions.process.endEvent.length === 0) {
        json.definitions.process.endEvent = [{
            attr_id: 'endEvent',
            attr_name: 'End Event',
            extensionElements: {
            }
        }]
    }
    for( let value of Object.values(BpmnElementType)) {
        
        json.definitions.process[value] = normalizeToArray(json.definitions.process[value], value as string)
        json.definitions.process[value].forEach( (item: { attr_id: string | number; }) => {
            flatObj[item.attr_id] = {
                type: value,
                ...item
            }
        })
    }
    if(!json.definitions.process.extensionElements) {
        json.definitions.process.extensionElements = {}
    }
    if(json.definitions.process.extensionElements['flowable:folderCabinetMapping']){
        
        json.definitions.process.extensionElements['flowable:folderCabinetMapping'] = normalizeToArray(json.definitions.process.extensionElements['flowable:folderCabinetMapping'], 'flowable:folderCabinetMapping')
        for(let item of json.definitions.process.extensionElements['flowable:folderCabinetMapping']){
            item.field = normalizeToArray(item.field, 'flowable:field')
        }
    }
    
   
    return {json, flatObj}
}

export const jsonToX6Node = function(json:BPMNJSON, flatObj: any) {
    const result = {
        nodes: [],
        edges: []
    } as {
        nodes: any[],
        edges: any[]
    }
    for( let value of Object.values(BpmnElementType)){
        //step 1 check if value is sequenceFlow
        let isEdge = value === 'sequenceFlow';
        if(!bpmnElement[value]) {
            throw new Error(`${value} setting not found`)
        }
        const nodeSetting = bpmnElement[value];
        json.definitions.process[value].forEach((item:any) => {
            if(!isEdge){
                if(!item.attr_id){
                    console.log(item, value);
                }else{
                    const node = {
                        ...nodeSetting.nodeStyle(item),
                        id: item.attr_id,
                        label: item.attr_name,
                        source: item.attr_sourceRef,
                        target: item.attr_targetRef,
                        data: nodeSetting.newNodeData(item.attr_id, item.attr_name, item)
                    }
                    if(value === 'boundaryEvent'){
                        
                        node.parent = item.attr_attachedToRef
                        const parentNode = result.nodes.find((n:any) => n.id === item.attr_attachedToRef)
                        result.edges.push({
                            id: item.attr_attachedToRef + '_' + item.attr_id,
                            label:"",
                            source: {cell:item.attr_attachedToRef, port:'right'},
                            target: {cell:item.attr_id, port: 'left'},
                            connector: {
                                name: 'rounded',
                                args: {
                                  radius: 20,
                                },
                              },
                              router:"manhattan",
                            data: {
                                type:'linkToBoundary',
                                attachedToRef: item.attr_attachedToRef
                            },
                        })
                    }
                    result.nodes.push(node)
                }
            }else{
                //userTask-1722908469185
                if(flatObj[item.attr_sourceRef] && flatObj[item.attr_targetRef]) {
                    result.edges.push({
                        ...nodeSetting.nodeStyle(item),
                        id: item.attr_id,
                        label: item.conditionExpression ? item.conditionExpression.__cdata.includes('!') ? 'false' : "true" : "",
                        source: {cell: item.attr_sourceRef, port: 'to'},
                        target: {cell: item.attr_targetRef, port: 'from'},
                        connector: {
                            name: 'rounded',
                            args: {
                              radius: 20,
                            },
                          },
                          router:"manhattan",
                        data: nodeSetting.newNodeData(item.attr_id, item.attr_name, item),
                    })
                }
                
                result.edges.push({
                    ...nodeSetting.nodeStyle(item),
                    id: item.attr_id,
                    label: item.conditionExpression ? item.conditionExpression.__cdata.includes('!') ? 'false' : "true" : "",
                    source: {cell:item.attr_sourceRef, port:'to'},
                    target: {cell:item.attr_targetRef, port:'from'},
                    connector: {
                        name: 'rounded',
                        args: {
                          radius: 20,
                        },
                      },
                      router:"manhattan",
                    data: nodeSetting.newNodeData(item.attr_id, item.attr_name, item),
                })
                
            }
        })
    }

    result.nodes.push({
        id: json.definitions.process.attr_id,
        shape:'invisible-node',
        data:{
            type: 'process',
            id: json.definitions.process.attr_id,
            name: json.definitions.process.attr_name,
            data: {
                attr_id: json.definitions.process.attr_id,
                attr_name: json.definitions.process.attr_name,
                extensionElements: json.definitions.process.extensionElements
            }
        }
    })

    return result
}

/**
 * normal and check x6Json
 * @param x6Json 
 * @param bpmnJson 
 */
export const checkX6Json = function(x6Json:any, bpmnJson:BPMNJSON){
    // check if process node exist
    const processId = bpmnJson.definitions.process.attr_id;
    if(!x6Json || !x6Json.cells) {
        x6Json.cells = []
    }
    x6Json.cells.forEach((node:any) => {
        
        if(node.shape === 'edge' && node.labels && !node.labels[0])  {
            console.log("node.labels", node.labels)
            delete node.labels
            // delete node.labels
        }
    })
    if(!x6Json.cells.find((node:any) => node.id === processId)) {
        x6Json.cells.push({
            id: processId,
            shape:'invisible-node',
            label: bpmnJson.definitions.process.attr_name,
            data: {
                type: 'process',
                id: processId,
                name: bpmnJson.definitions.process.attr_name,
                data: {
                    attr_id: bpmnJson.definitions.process.attr_id,
                    attr_name: bpmnJson.definitions.process.attr_name,
                    extensionElements: bpmnJson.definitions.process.extensionElements
                }
            }
        })
    }
    return x6Json;
}


export const getAllFormFieldFromGraph = (graph:Graph) => {
    let fields:any = {};
    graph.getNodes().forEach((node:Cell) => {
        const data = node.getData()
        const includedType = ['startEvent', 'userTask']
        
        if(includedType.includes(data.type) && data && data.data && data.data.extensionElements && data.data.extensionElements['flowable:formProperty']) {
            if(!Array.isArray(data.data.extensionElements['flowable:formProperty'])) {
                data.data.extensionElements['flowable:formProperty'] = [data.data.extensionElements['flowable:formProperty']]
            }
            data.data.extensionElements['flowable:formProperty'].forEach((item:any) => {
                fields[item.attr_id] = item
            })
            
        }
        
    })
    return fields
}

export const graphToBpmnJson = (graph:Graph, bpmnJson:any) => {
    const json = {
        definitions: {
            attr_xmlns:"http://www.omg.org/spec/BPMN/20100524/MODEL",
            ['attr_xmlns:xsi']:"http://www.w3.org/2001/XMLSchema-instance",
            ['attr_xmlns:xsd']:"http://www.w3.org/2001/XMLSchema",
            ['attr_xmlns:flowable']:"http://flowable.org/bpmn",
            ['attr_xmlns:bpmndi']:"http://www.omg.org/spec/BPMN/20100524/DI",
            ['attr_xmlns:omgdc']:"http://www.omg.org/spec/DD/20100524/DC",
            ['attr_xmlns:omgdi']:"http://www.omg.org/spec/DD/20100524/DI",
            ['attr_xmlns:folderCabinetMapping']:"http://www.w3.org/1999/xhtml",
            ['attr_xmlns:permissions']:"http://www.w3.org/1999/xhtml",
            ['attr_xmlns:docpal']:"http://flowable.org/bpmn",
            attr_typeLanguage:"http://www.w3.org/2001/XMLSchema",
            attr_expressionLanguage:"http://www.w3.org/1999/XPath",
            attr_targetNamespace:"business_processes",
            attr_exporter:"Flowable Open Source Modeler",
            attr_exporterVersion:"6.7.2",
            process: {
                attr_id: bpmnJson.definitions.process.attr_id,
                attr_isExecutable:true,
                attr_name:  bpmnJson.definitions.process.attr_name,
                extensionElements: bpmnJson.definitions.process.extensionElements,
            }
        }
    }
    if(bpmnJson.definitions.process['attr_flowable:candidateGroups']) {
        json.definitions.process['attr_flowable:candidateGroups'] = bpmnJson.definitions.process['attr_flowable:candidateGroups']
    }
    const nodes = graph.getNodes()
    const edges = graph.getEdges()
    nodes.forEach( node => {

        // 如果是 process 节点，不用 insertNodeToBpmn, 因為是 Process 的 data 是整個 workflow 的数据
        if(node.getData().type !== 'process') {
            insertNodeToBpmn(graph, json, node)
        }else{
            
            const processData = node.getData()
            json.definitions.process = {
                ...json.definitions.process,
                ...processData.data
            }
        }
    })
    edges.forEach( edge => {
        insertEdgeToBpmn(graph, json, edge)
    })
    const xml = jsonToBpmn(json)
    return {
        xml,
        json,
        x6Json: graph.toJSON()
    }
}



export const insertNodeToBpmn = (graph:Graph, bpmnJson:any, node) => {
    const data = node.getData()
    if(!bpmnJson.definitions.process[data.type]){
        bpmnJson.definitions.process[data.type] = data.data
    }else if(!Array.isArray(bpmnJson.definitions.process[data.type])) {
        bpmnJson.definitions.process[data.type] = [bpmnJson.definitions.process[data.type], data.data]
    }else{
        bpmnJson.definitions.process[data.type].push(data.data)
    }
    
}

export const insertEdgeToBpmn = (graph:Graph, bpmnJson:any, edge) => {
    const data = edge.getData()
    if(!bpmnJson.definitions.process.sequenceFlow){
        bpmnJson.definitions.process.sequenceFlow = []
    }
    // check if edge target is a boundaryEvent, if np push edge to bpmn
    const targetNode = graph.getCellById(edge.target.cell)
    if(targetNode.getData().type === 'boundaryEvent'){
        return
    }
    let edgeId = edge.id;
    // check if edge.id is start with number, is yes, add "sid-" in beginning
    if(!edgeId.startsWith('sid-')) {
        edgeId = 'sid-' + edge.id
    }
    const newEdge = {
        attr_id: 'edge-'+edge.id,
        attr_sourceRef: edge.source.cell,
        attr_targetRef: edge.target.cell,
    }
    if(data && data.data && data.data.conditionExpression) {
        newEdge.conditionExpression = data.data.conditionExpression
    }
    bpmnJson.definitions.process.sequenceFlow.push(newEdge)
}

export const jsonToBpmn = (json:any) => {
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
    // let xmlDom = new DOMParser().parseFromString(step1json, 'text/xml');
    return step1json
}



/**
 * 
 * Ture any key in Obj in to array
 * @param obj
 * @param key
 */
const normalizeToArray = (obj:any, key?:string):any[] => {
    if(!obj ) {
        return []
    }else if(!Array.isArray(obj)) {
         return [obj]
    }
    return obj
}
    


