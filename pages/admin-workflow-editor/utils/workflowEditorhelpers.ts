import { Graph } from '@antv/x6';
import {adminApi } from 'api'
export async function saveWorkflowFormToNewVersion(graph:Graph,processKey:string, oldVersion:string, newVersion:string){
    if(!graph) {
        throw new Error('Graph is not found')
    }
    const allFormsID:string[] = []
    // get all forms id from graph
    graph.getNodes().forEach((node:any) => {
        const data = node.getData()
        const includedType = ['startEvent', 'userTask', 'end']
        if(includedType.includes(data.type) && data && data.data && data.data.extensionElements && data.data.extensionElements['flowable:formProperty']) {
            allFormsID.push(data.data.attr_id);
            console.log('form id', data)
        }
    })
    // loop all form and get form object and save to new version
    allFormsID.forEach(async(formId) => {
        const response = await adminApi.api.getRelationQuery({
            processKey: processKey,
            userTaskId: formId,
            versionId: oldVersion
        });
        console.log(response)
        let json;
        if(!response || !response.data || response.data.length === 0){
            json = {}
        }
        json = JSON.parse(response.data[0].jsonValue || "{}")
        await adminApi.api.postRelationSave({
            processKey: processKey,
            userTaskId: formId,
            jsonValue: JSON.stringify(json),
            versionId: newVersion
        })
    })
    console.log("allFormsID", allFormsID)

}