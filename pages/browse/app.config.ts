

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
                    icon: 'tabler:folder',
                    hoverIcon: 'tabler:folder-filled',
                    label: "Files",
                    inlineRender:true,
                    component: "LazyBrowseMenuTree",
                },
                {
                    id: 'collection',
                    icon: 'tabler:bookmark',
                    hoverIcon: 'tabler:bookmark-filled',
                    label: "Collection",
                    inlineRender:true,
                    component: "LazyBrowseMenuCollection",
                },
                {
                    id: 'trash',
                    icon: 'tabler:trash',
                    hoverIcon: 'tabler:trash-filled',
                    label: "Trash",
                    component: "LazyBrowseTrash",
                }
            ]
        },
    ]
})