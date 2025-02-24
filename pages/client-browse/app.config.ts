

export default defineAppConfig({
    menu: {
        "client-browse": {
            id: 'client-browse',
            name: 'client-browse',
            icon: 'dp-icon:browse-outline',
            hoverIcon: 'dp-icon:browse-fill',
            label: "file_browse",
            component: "LazyBrowsePage",
            props: {
                idOrPath: "/",
                filter: {}
            }
        },
        "client-collections": {
            id: 'client-collections',
            name: 'client-collections',
            icon: 'icon-park-outline:layers',
            hoverIcon: 'icon-park-twotone:layers',
            label: "file_collections",
            component: "LazyCollectionPage",
            props: {
                idOrPath: "/",
                filter: {}
            }
        },
        "client-fileRequest": {
            id: 'client-fileRequest',
            name: 'client-fileRequest',
            icon: 'uil:upload',
            hoverIcon: 'uil:upload',
            label: "file_uploads",
            component: "LazyUploadRequestPage",
            props: {
                idOrPath: "/",
                filter: {}
            }
        }
    }
})