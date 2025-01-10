
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
            name:"",
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
            name:"",
            label: "adminMenu.share",
            icon: "lucide:file-symlink",
            hoverIcon: "lucide:file-symlink",
        }
    ]
})