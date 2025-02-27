export default defineAppConfig({
    menu:{
        "client-ai-upload":{
            id: 'client-ai-upload',
            name: 'client-ai-upload',
            icon: 'lucide:cloud-upload',
            hoverIcon: 'lucide:cloud-upload',
            label: "clientAIUpload",
            component: "LazyAiUpload",
            feature: "BROWSE",
            props:{
                
            }
        },
    }
})


