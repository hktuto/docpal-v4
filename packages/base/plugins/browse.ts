

import BrowseActionsEmptyDelete from '../components/browse/Actions/EmptyDelete.vue'
import BrowseActionsPaste from '../components/browse/Actions/paste.vue'
import BrowseActionsNewFolder from '../components/browse/Actions/newFolder.vue'
import BrowseActionsUploadDoc from '../components/browse/Actions/uploadDoc.vue'
import BrowseActionsRename from '../components/browse/Actions/rename.vue'
import BrowseActionsNewFileDialog from '../components/browse/Actions/newFile/dialog.vue'
import BrowseActionsWatermark from '../components/browse/Actions/WatermarkBtn.vue'

// import SharePublicButton from '../components/global/sharePublicButton.vue'

export default defineNuxtPlugin(() => {
    const { globalSlots } = useGlobalSetting()
    globalSlots.value.push(
    //     {
    //     name: 'sharePublicButton',
    //     component: SharePublicButton,
    //     order: 100,
    // },
    {
        name: 'emptyDelete',
        component: BrowseActionsEmptyDelete,
        order: 100,
    },{
        name: 'paste',
        component: BrowseActionsPaste,
        order: 100,
    },{
        name: 'newFolder',
        component: BrowseActionsNewFolder,
        order: 100,
    },{
        name: 'uploadDoc',
        component: BrowseActionsUploadDoc,
        order: 100,
    },{
        name: 'rename',
        component: BrowseActionsRename,
        order: 100,
    },{
        name: 'newFileDialog',
        component: BrowseActionsNewFileDialog,
        order: 100,
    },{
        name: 'watermark',
        component: BrowseActionsWatermark,
        order: 100,
    })
})