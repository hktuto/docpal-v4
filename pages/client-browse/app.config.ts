

export default defineAppConfig({
    menu:{
        "client-browse":{
            id: 'client-browse',
            name: 'client-browse',
            icon: 'dp-icon:browse-outline',
            hoverIcon: 'dp-icon:browse-fill',
            label: "file_browse",
            component: "LazyBrowsePage",
            props:{
                idOrPath:"/",
                filter:{}
            }
        }
    }
})