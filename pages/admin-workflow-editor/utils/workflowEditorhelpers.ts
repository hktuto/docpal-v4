import { Graph } from '@antv/x6';
export async function saveWorkflowFormToNewVersion(graph:Graph, oldVersion:string, newVersion:string){
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
    console.log("allFormsID", allFormsID)

}