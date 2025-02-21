export const useAdditionalContext = (getForm:Function) => {

    const graphProvider = inject(BPMN_PROVIDER)
    const editorProvider = inject(EDITOR_PROVIDER);
    if(!graphProvider || !editorProvider) {
        throw createError('graph provider not found')
        
    }
    function setUpListener(){
        graphProvider?.graph.value?.on('history:undo', () => {
            getForm()
        })
        graphProvider?.graph.value?.on('history:redo', () => {
            getForm()
        })
    }
    
    onMounted(() => {
        setUpListener()
        getForm()
    })

}