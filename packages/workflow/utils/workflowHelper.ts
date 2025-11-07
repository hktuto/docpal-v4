import { clientApi } from "api"
const generateDocumentComponent = "LazyBpmnButtonGenerateDocument"
const booleanButtonComponent = 'LazyBpmnButtonBoolean'
import { generateData, replaceVariables } from "docpal-document-editor/src/utils"

export async function getBpmnAddtionalElement(xml:any,taskDefinitionKey:string, taskDetail: any, formData:any) {
    const xmlJson = bpmnStringToJson(xml)
    const currentTask = xmlJson.flatObj[taskDefinitionKey]
    let signatureSetting:any = null
    let buttonSetting:any
    // check generate document button 
    let buttons:any[] = []
    let components:any[] = []
    if(!currentTask || !currentTask.extensionElements) return {buttons,components}
    const generateDocumentComponent = "LazyBpmnButtonGenerateDocument"
    if(currentTask.extensionElements && currentTask.extensionElements['docpal:previewDocumentButton']){
        if(Array.isArray(currentTask.extensionElements['docpal:previewDocumentButton'])){
            currentTask.extensionElements['docpal:previewDocumentButton'].forEach((item:any) => {
                buttons.push({
                    props: {
                        ...item,
                        xml,
                        formData,
                        taskDetail
                    },
                    component: generateDocumentComponent
                })
            })
        }else{
            buttons.push({
                props: {
                   ...currentTask.extensionElements['docpal:previewDocumentButton'],
                   xml,
                   formData,
                   taskDetail
                },
                component: generateDocumentComponent
            })
        }
    }
    if(currentTask.extensionElements && currentTask.extensionElements['docpal:booleanButton']){
        if(Array.isArray(currentTask.extensionElements['docpal:booleanButton'])){
            currentTask.extensionElements['docpal:booleanButton'].forEach((item:any) => {
                buttons.push({
                    props: {
                        ...item,
                        xml,
                        formData,
                        taskDetail
                    },
                    component: booleanButtonComponent
                })
            })
        }else{
            buttons.push({
                props: {
                   ...currentTask.extensionElements['docpal:booleanButton'],
                   xml,
                   formData,
                   taskDetail
                },
                component: booleanButtonComponent
            })
        }
    }
    // TODO : get buttonSetting
    if(currentTask.extensionElements && currentTask.extensionElements['docpal:signatureSetting']){
      // if docpal:signatureSetting' is in current Task , that mean it is a signature task
      // step 1 , get signature setting from task
      const signatureSettingFromTask =  currentTask.extensionElements['docpal:signatureSetting']
      // step 2, get target template setting from workflow xml
      const signatureTask = xmlJson.flatObj[signatureSettingFromTask.attr_documentStepId]
      // step 3, we only store template step id into docpal:signatureSetting, so need to get the template id from template task
      const templateId = signatureTask.extensionElements['flowable:field'].find((item: any) => item.attr_name === 'templateId')?.['flowable:expression'].__cdata
      // step 4, get all variable from template task and convert to workflow to template mapping
      const variablesString = signatureTask.extensionElements['flowable:field'].find((item: any) => item.attr_name === 'variables')?.['flowable:expression'].__cdata
      const variables = JSON.parse(variablesString)
      const workflowToTemplateMapping = Object.keys(variables).reduce((prev: any, key: string) => {
        prev[key] = variables[key].replace('${variables:get(', '').replace(')}', '')
        return prev
      }, {})
      // step 5, get which workflow information to store signature
      const currentStepSignatureKey = variables[signatureSettingFromTask.attr_signature]
      const workflowKeyToStoreSignature = currentStepSignatureKey.replace('${variables:get(', '').replace(')}', '')
      // step 6, get template detail and setting json
      const {data:detail} = await clientApi.api.getNuxeoTemplateTemplateid(templateId)
      let json = await clientApi.api.postNuxeoDocumentPreview({idOrPath:detail.documentId},{
        format: 'blob'
      }).then(async(res) => {const t = await res.text(); return JSON.parse(t)})
      // replace signature variable
      // convert workflow variable to template variable

      const newVariables = generateData({}, json)
      let templateDetail = {...json}
      const content = templateDetail.json.content.content

      templateDetail.json.content.content = replaceVariables(content, newVariables.variables)
      // const json.json.content = replaceVariables(json.json.content, newVariables)
      // finally, store signature setting
      signatureSetting = {
        templateDetail,
        workflowKeyToStoreSignature,
        workflowToTemplateMapping,
        templateId,
      }
      console.log('signatureSetting', signatureSetting)
      // get 
    }
    return{
       buttonSetting,
        buttons,
        components,
        signatureSetting
    }
}
