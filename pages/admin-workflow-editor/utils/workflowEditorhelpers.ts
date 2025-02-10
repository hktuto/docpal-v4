
import {adminApi } from 'api'


export async function saveWorkflowFormToNewVersion(xml:string, processKey:string, oldVersion:string, newVersion:string){
    if(!xml) {
        throw new Error('Graph is not found')
    }
    
    // convert xml to json 
    const allForm = await getAllFormFromXML(xml, processKey, oldVersion);
    console.log("allForm", allForm)
    await batchSaveForm(allForm, processKey, newVersion)
    console.log("xml", processKey, oldVersion, newVersion)

}
type BatchForms = {formId:string, json:string}[]
export async function getAllFormFromXML(xml:string, processKey:string, version:string):Promise<BatchForms> {
    const allFormsID:string[] = []
    // convert xml to json 
    const {json} = bpmnStringToJson(xml);
    const result:BatchForms = [];

    json.definitions.process.startEvent.forEach((startEvent:any) => {
        allFormsID.push(startEvent.attr_id)
    })
    json.definitions.process.userTask.forEach((userTask:any) => {
        allFormsID.push(userTask.attr_id)
    })
    json.definitions.process.endEvent.forEach((endEvent:any) => {
        allFormsID.push(endEvent.attr_id)
    })
    for await (const formId of allFormsID) {
        const response = await adminApi.api.getRelationQuery({
            processKey: processKey,
            userTaskId: formId,
            versionId: version
        });
        let json = "";
        if(!response || !response.data || response.data.length === 0){
            json = "{}"
        }else{
            json = response.data[0].jsonValue || ""
        }
        result.push({
            formId,
            json
        })  
    }
    // allFormsID.forEach(async(formId) => {
    //     const response = await adminApi.api.getRelationQuery({
    //         processKey: processKey,
    //         userTaskId: formId,
    //         versionId: version
    //     });
    //     let json = "";
    //     if(!response || !response.data || response.data.length === 0){
    //         json = "{}"
    //     }else{
    //         json = response.data[0].jsonValue || ""
    //     }
    //     result.push({
    //         formId,
    //         json
    //     })
    // })
    console.log("result", result.length, result)
    return result

}

export async function batchSaveForm(forms:BatchForms, processKey:string, version:string) {
    forms.forEach(async(form) => {
        

        const res = await adminApi.api.postRelationSave({
            processKey: processKey,
            userTaskId: form.formId,
            jsonValue: form.json,
            versionId: version
        })
        console.log("forms", form.formId, processKey, version, res)
    })
}