
<script lang="ts" setup>
import { emitBus, EventType } from 'eventbus'
import { ElMessage } from 'element-plus'
import { useEventListener } from '@vueuse/core'
import { Loading } from '@element-plus/icons-vue';
import { ElNotification, ElMessageBox } from 'element-plus'

import { clientApi} from 'api'
const { t } = useI18n()
const emits = defineEmits(['success'])
const copyDocumentList = useCopyDocumnetList()

function copyItem(doc){
    console.log("copyItem", doc)
    copyDocumentList.value = [
        {
            type: 'copy',
            doc: doc
        }
    ]
    ElMessage({
            message: doc.name + " " + t('filePopover_copy') as string,
            type: 'success'
        })
}
function cutItem(doc){
    copyDocumentList.value = [
        {
            type: 'cut',
            doc: doc
        }
    ]
    ElMessage({
            message: doc.name + " " + t('filePopover_cut') as string,
            type: 'success'
        })
}
async function pasteItem(doc){
    const item = copyDocumentList.value[0]
    if(!item) return
    const copyItem = item.doc
    const param = [ 
        { idOrPath: copyItem.id }, 
        {idOrPath: doc.path}
    ]
    const { isDuplicate } = await duplicateNameFilter(doc.path, [{idOrPath: copyItem.id, name:copyItem.name }]);
    if (isDuplicate) {
        ElMessage({
            message: t('dpTip_duplicateFileName') as string,
            type: 'error'
        })
        return
    }
    const noti = ElNotification({
        title: t('filePopover_paste'),
        icon: Loading,
        dangerouslyUseHTMLString: true,
        message: `<div title="${copyItem.name}">${copyItem.name}</div>`,
        showClose: true,
        customClass: 'loading-notification',
        duration: 0,
        position: 'bottom-right'
    });
    try {
        if (item.type === 'copy')  await clientApi.api.postNuxeoDocumentCopy(param)
        else await clientApi.api.postNuxeoDocumentMove(param)
    } catch (error) {}
    noti.close()
    emitBus(EventType.FILE_NEED_REFRESH, {
        relatedIdOrPath: doc.id,
    })
}
onMounted(() => {
    useEventListener(document, 'docActionCopy', (event:any) => copyItem(event.detail))  
    useEventListener(document, 'docActionCut', (event:any) => cutItem(event.detail))  
    useEventListener(document, 'docActionPaste', (event:any) => pasteItem(event.detail))  
})
</script>