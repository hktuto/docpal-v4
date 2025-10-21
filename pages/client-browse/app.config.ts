

export default defineAppConfig({
    menu: {
        "client-browse": {
            id: 'client-browse',
            name: 'client-browse',
            icon: 'dp-icon:browse-outline',
            hoverIcon: 'dp-icon:browse-fill',
            label: "file_browse",
            component: "LazyBrowsePage",
            feature: "BROWSE", 
            props: {
                idOrPath: "root",
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
            feature: "COLLECTION",
            props: {
                idOrPath: "/",
                filter: {}
            }
        },
        "client-fileRequest": {
            id: 'client-fileRequest',
            name: 'client-fileRequest',
            icon: 'lucide:file-symlink',
            hoverIcon: 'lucide:file-symlink',
            label: "file_uploads",
            component: "LazyUploadRequestPage",
            feature: "UPLOAD_REQUEST",
            props: {
                idOrPath: "/",
                filter: {}
            }
        }
    }
})
