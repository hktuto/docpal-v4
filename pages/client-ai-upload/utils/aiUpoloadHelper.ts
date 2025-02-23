type AiUploadDetail = {
    id: string,
    status: string
}
export const createAiUploadDetail = (params:AiUploadDetail) => {
    return {
        id: 'ai-upload-detial-' + params.id,
        name: 'ai-upload-detial-'+params.id,
        label: "AIUpload",
        component: "LazyAiUploadDetail",
        props: {
            id: params.id,
            status: params.status
        }
    }
}

export const goAiUploadDetail = () => {
    return {
        id: 'client-ai-upload',
            name: 'client-ai-upload',
            icon: 'lucide:cloud-upload',
            hoverIcon: 'lucide:cloud-upload',
            label: "AIUpload",
            component: "LazyAiUpload",
            props:{
                
            }
        }
}