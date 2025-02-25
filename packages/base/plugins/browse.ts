

import BrowseActionsEmptyDelete from '../components/browse/Actions/EmptyDelete.vue'
import BrowseActionsPaste from '../components/browse/Actions/paste.vue'
import BrowseActionsNewFolder from '../components/browse/Actions/newFolder.vue'
import BrowseActionsUploadDoc from '../components/browse/Actions/uploadDoc.vue'
import BrowseActionsRename from '../components/browse/Actions/rename.vue'
import BrowseActionsNewFileDialog from '../components/browse/Actions/newFile/dialog.vue'
import BrowseActionsWatermark from '../components/browse/Actions/WatermarkBtn.vue'
import UploadDrawer from '../components/uploadStructure/index.vue'
import ShareBtn from "../components/browse/share/publicButton.vue";
import InternalShareDialog from '../components/browse/info/Acl/EditDialog.vue'
import ChangeDocTypeDialog from '../components/browse/Actions/changeDocType/dialog.vue'
import watermarkDialog from '../components/browse/Actions/watermark.vue'
// import SharePublicButton from '../components/global/sharePublicButton.vue'
export default defineNuxtPlugin(() => {
    const { globalSlots } = useGlobalSetting()
    globalSlots.value.push(
    {
        name: 'emptyDelete',
        component: BrowseActionsEmptyDelete,
        show: false,
        order: 100,
    },{
        name: 'paste',
        component: BrowseActionsPaste,
        show: false,
        order: 100,
    },{
        name: 'newFolder',
        component: BrowseActionsNewFolder,
        show: false,
        order: 100,
    },{
        name: 'uploadDoc',
        component: BrowseActionsUploadDoc,
        show: false,
        order: 100,
    },{
        name: 'rename',
        component: BrowseActionsRename,
        show: false,
        order: 100,
    },{
        name: 'newFileDialog',
        component: BrowseActionsNewFileDialog,
        show: false,
        order: 100,
    },{
        name: 'watermark',
        component: BrowseActionsWatermark,
        show: true,
        order: 100,
    },{
        name:"uploadDrawer",
        component: UploadDrawer,
        show: true,
        order: 100,
    },{
        name: 'share',
        component: ShareBtn,
        show: true,
        order: 1,
    },{
        name: 'internalShareDialog',
        component: InternalShareDialog,
        show: true,
        order: 1,
    },{
        name: 'changeDocTypeDialog',
        component: ChangeDocTypeDialog,
        show: true,
        order: 1,
    },{
        name: 'watermarkDialog',
        component: watermarkDialog,
        show: true,
        order: 1,
    })
})