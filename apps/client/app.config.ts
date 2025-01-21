export default defineAppConfig({
    // appMenu:[
    //     {
    //         name:'client-browse'
    //     },
    //     {
    //         name:'client-search'
    //     },
    //     {
    //         name:'client-master-table'
    //     },
    //     {
    //         name:'client-folder-cabinet'
    //     }
    // ],
    appMenu: [
        {
            name: "client-browse"
        },
        {
            name: "client-search"
        },
        {
            label:"file_uploads",
            icon: "dp-icon:flow-outline",
            children: [
                {
                    name: "clientAIUpload"
                },
                {
                    name: "client-fileRequest"
                }
            ]
        },
        {
            label:"file_share_module",
            icon: "dp-icon:flow-outline",
            children: [
                {
                    name: "client-share"
                },
                {
                    name: "client-share-me"
                },
                {
                    name: "client-share-other"
                }
            ]
        },
        {
            name: "client-collections"
        },
        {
            name: "client-smartFolder"
        },
        {
            name: "client-folder-cabinet"
        },
        {
            name: "client-workflow"
        },
        {
            label:"retention_policies",
            icon: "dp-icon:flow-outline",
            children: [
                {
                    name: "client-retention"
                },
                {
                    name: "client-holdPolicies"
                }
            ]
        },
        {
            label:"DASHBOARD",
            icon: "dp-icon:flow-outline",
            children: [
                {
                    name: "client-work-panel"
                },
                {
                    name: "client-dashboard"
                }
            ]
        },
        {
            name: "client-master-table"
        },
        {
            name: "client-trash"
        },
        {
            name: "client-case"
        }
    ]
})