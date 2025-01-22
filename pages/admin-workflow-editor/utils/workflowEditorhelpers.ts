
import {adminApi } from 'api'


export async function saveWorkflowFormToNewVersion(xml:string, processKey:string, oldVersion:string, newVersion:string){
    if(!xml) {
        throw new Error('Graph is not found')
    }
    const allFormsID:string[] = []
    // convert xml to json 
    const allForm = await getAllFormFromXML(xml, processKey, oldVersion);
    await batchSaveForm(allForm, processKey, newVersion)
    // loop all form and get form object and save to new version
    // allFormsID.forEach(async(formId) => {
    //     const response = await adminApi.api.getRelationQuery({
    //         processKey: processKey,
    //         userTaskId: formId,
    //         versionId: oldVersion
    //     });
    //     console.log(response)
    //     let json;
    //     if(!response || !response.data || response.data.length === 0){
    //         json = "{}"
    //     }else{
    //         json = response.data[0].jsonValue
    //     }
    //     await adminApi.api.postRelationSave({
    //         processKey: processKey,
    //         userTaskId: formId,
    //         jsonValue: json,
    //         versionId: newVersion
    //     })
    // })
    // console.log("allFormsID", allFormsID)

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

    allFormsID.forEach(async(formId) => {
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
    })
    return result

}

export async function batchSaveForm(forms:BatchForms, processKey:string, version:string) {
    forms.forEach(async(form) => {
        await adminApi.api.postRelationSave({
            processKey: processKey,
            userTaskId: form.formId,
            jsonValue: form.json,
            versionId: version
        })
    })
}