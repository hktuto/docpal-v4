import {clientApi} from 'api'

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
                    isList:true,
                    component: "LazyBrowseMenuCollection",
                    props:{
                        getListFunction:clientApi.collectionNuxeo.getCollection,
                        listResultMappingFunction:(data:any) => {
                            return data.entryList.map((item:any) => {
                                return {
                                    name: item.name,
                                    id: item.id,
                                    tabData: {
                                        id: item.id,
                                        label: item.name,
                                        icon: 'tabler:bookmark-filled',
                                        component: 'LazyCollectionDetail',
                                        props: {
                                            collectionId: item.id
                                        }
                                    }
                                } 
                            })
                        },
                        generatePreviewData:(item:any) => {
                            return item.tabData
                        },
                        generatePageData:(item:any) => {
                            return item.tabData
                        },  
                    }
                },
                {
                    id: 'trash',
                    icon: 'tabler:trash',
                    hoverIcon: 'tabler:trash-filled',
                    label: "Trash",
                    component: "LazyTrashPage",
                    canDrop: (args:any) => {
                        if(args.source.data.type === 'collection' || args.source.data.type === 'file') {
                            return true
                        }
                        return false
                    },
                    onDropItself: (args:any) => {
                        console.log(args)
                    },
                }
            ]
        },
    ]
})