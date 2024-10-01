

export default defineAppConfig({
    menu:[
        {
            id: 'browse',
            icon: 'dp-icon:browse-outline',
            hoverIcon: 'dp-icon:browse-fill',
            label: "Browse",
            component: "LazyBrowsePage",
            children: [
                {
                    id: 'recent',
                    icon: 'lucide:folder',
                    label: "Files",
                    inlineRender:true,
                    component: "LazyBrowseMenuTree",
                },
                {
                    id: 'collection',
                    icon: 'lucide:folder-heart',
                    label: "Collection",
                    inlineRender:true,
                    component: "LazyBrowseMenuCollection",
                },
                {
                    id: 'trash',
                    icon: 'lucide:trash',
                    label: "Trash",
                    inlineRender:true,
                    component: "LazyBrowseMenuTrash",
                }
            ]
        },
    ]
})