import {XMLParser} from "fast-xml-parser";
import type {Cell, Graph} from '@antv/x6'
import type { BPMNJSON } from "./bpmnType";
import { BpmnElementType, bpmnElement } from "./bpmnElement";


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
    for( let value of Object.values(BpmnElementType)) {
        
        json.definitions.process[value] = normalizeToArray(json.definitions.process[value], value as string)
        json.definitions.process[value].forEach( (item: { attr_id: string | number; }) => {
            flatObj[item.attr_id] = {
                type: value,
                ...item
            }
        })
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
                            source: {cell:item.attr_attachedToRef, port:'top'},
                            target: {cell:item.attr_id, port: 'from'},
                            connector: {
                                name: 'rounded',
                                args: {
                                  radius: 20,
                                },
                              },
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
                        label: item.conditionExpression ? item.conditionExpression.__cdata === '${approved}' ? 'Approved' : "Reject" : "",
                        source: {cell: item.attr_sourceRef, port: 'to'},
                        target: {cell: item.attr_targetRef, port: 'from'},
                        connector: {
                            name: 'rounded',
                            args: {
                              radius: 20,
                            },
                          },
                        data: nodeSetting.newNodeData(item.attr_id, item.attr_name, item),
                    })
                }
                
                result.edges.push({
                    ...nodeSetting.nodeStyle(item),
                    id: item.attr_id,
                    label: item.conditionExpression ? item.conditionExpression.__cdata === '${approved}' ? 'Approved' : "Reject" : "",
                    source: {cell:item.attr_sourceRef, port:'to'},
                    target: {cell:item.attr_targetRef, port:'from'},
                    connector: {
                        name: 'rounded',
                        args: {
                          radius: 20,
                        },
                      },
                    data: nodeSetting.newNodeData(item.attr_id, item.attr_name, item),
                })
                
            }
        })
    }
    return result
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