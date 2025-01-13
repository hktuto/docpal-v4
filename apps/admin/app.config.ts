
export default defineAppConfig({
    appMenu:[
        {
            name:"",
            icon: "tabler:align-box-right-bottom",
            hoverIcon: "tabler:align-box-right-bottom-filled",
            label:"adminMenu.User",
            children:[
                {
                    name:"admin-user"
                },
                {
                    name:"admin-group"
                }
            ]
        },
        {
            name:"admin-bulk-import"
        },
        {
            label: "adminMenu.shareInternal",
            icon: "lucide:file-symlink",
            hoverIcon: "lucide:file-symlink",
            children:[
                {
                    name: 'admin-internal-share'
                },
                {
                    name: 'admin-external-share'
                }
            ]

        },
        {
            label: "adminMenu.browse",
            icon: "lucide:file-symlink",
            hoverIcon: "lucide:file-symlink",
            children:[
                {
                    name:"admin-smart-folder"
                },
                {
                    name:"admin-document-type"
                },
                {
                    name:"admin-folder-cabinet"
                },
                {
                    name: "admin-dam"
                }
            ]
        },
        {
            name:"admin-watermark"
        },
        {
            label: "adminMenu.workflow",
            icon:"dp-icon:flow-outline",
            children:[
                {
                    name:"admin-workflow-manage"
                },
                {
                    name:"admin-workflow-retry"
                },
                {
                    name:"admin-workflow-editor"
                },
            ]
        },
        {
            label:"adminMenu.dashboard",
            icon: "material-symbols:dashboard-customize-outline-rounded",
            children:[
                {
                    name:"admin-dashboard"
                },
                {
                    name:"admin-work-panel"
                }
            ]
        },
        {
            label:"adminMenu.templateManagement",
            icon: "dp-icon:flow-outline",
            children:[
                {
                    name: "admin-document-template"
                },
                {
                    name: "admin-email-template"
                }
            ]
        },
        {
            label:"adminMenu.policy",
            icon: "dp-icon:flow-outline",
            children:[
                {
                    name: "admin-hold-policies"
                },
                {
                    name: "admin-retention-policies"
                }
            ]
        },
        {
            name:"admin-master-table"
        },
        {
            label:"adminMenu.log",
            icon: "dp-icon:flow-outline",
            children:[
                {
                    name: "admin-log-manage"
                },
                {
                    name: "admin-audit"
                },
                {
                    name: "admin-docker-log"
                },
                {
                    name: 'admin-message-queue'
                },
                {
                    name: "admin-mail-config"
                }
            ]
        },
        {
            name:'admin-azure'
        },
        {
            name:"admin-case-management"
        },
        {
            name:"admin-easy-form"
        },
        {
            name:"admin-external-connection"
        },

        
    ]
})