const generateDocumentComponent = "LazyBpmnButtonGenerateDocument"
const booleanButtonComponent = 'LazyBpmnButtonBoolean'

export function getBpmnAddtionalElement(xml:any,taskDefinitionKey:string, taskDetail: any, formData:any) {
    const xmlJson = bpmnStringToJson(xml)
    const currentTask = xmlJson.flatObj[taskDefinitionKey]
    let signatureSetting:any = null
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
    if(currentTask.extensionElements && currentTask.extensionElements['docpal:signatureSetting']){
      console.log('currentTask.extensionElements', currentTask.extensionElements['docpal:signatureSetting'])
      signatureSetting = currentTask.extensionElements['docpal:signatureSetting']
      // 
    }
    return{
        buttons,
        components,
        signatureSetting
    }
}
