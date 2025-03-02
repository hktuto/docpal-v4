<script setup lang="ts">
import { useMouse } from '@vueuse/core'
import { EventType, useEventBus} from 'eventbus'
import { clientApi } from 'api'
const openBus = useEventBus(EventType.FILE_PREVIEW_OPEN)
const closeBus = useEventBus(EventType.FILE_PREVIEW_CLOSE)
openBus.on(open)
closeBus.on(close)

const opened = ref(false);

const loading = ref(false);
const docDetail = ref();
const docPermission = ref();
const previewImgUrl = ref('')
const { x, y } = useMouse()
let openTimeoutFn:any;
let closeTimeoutFn:any;
const openDelay = 1000;
const closeDelay = 500;
const previewSize = ref(500);
const position = ref({
    x: 0,
    y: 0,
    width: previewSize.value,
    height: previewSize.value
})

async function getDocPreview() {
    loading.value = true
    try{
        const idOrPath = docDetail.value.id
        const item = document.querySelector(`.vxe-table--body-wrapper tr[rowId="${docDetail.value._X_ROW_KEY}"]`)
        const {x, y, height, width} = item.getBoundingClientRect()
        position.value.x = x + 60;
        position.value.y = y + (height-20) + previewSize.value > window.innerHeight ? y - previewSize.value + 20 : y + (height-20)
        const blob = await clientApi.api.postNuxeoDocumentThumbnail({idOrPath},{
            format:'blob',
            timeout: 0,
            headers:{
                'noThrowError' : "true"
            }
        }) as any
        if (!!blob) {
            const urlCreator = window.URL || window.webkitURL
            previewImgUrl.value = urlCreator.createObjectURL(blob)
        }else{
            previewImgUrl.value = ""
        }
    }catch(err){
        previewImgUrl.value = ""
    }finally{
        loading.value = false
    }
}

async function getDetail(idOrPath:string) {
    loading.value = true
    docDetail.value = null
    docPermission.value = null
    const userId = useUserId()
    const { doc, permission } = await getDocDetail(idOrPath, userId.value);
    docDetail.value = doc
    docPermission.value = permission
    loading.value = false
}
async function imgLoaded(img) {
    const {width, height} = img
    const maxHeight = position.value.x > (window.innerHeight / 2)
    // position.value.width = width
    // position.value.height = height
    // position.value.y = position.value.y + height > window.innerHeight ? position.value.y - height + 20 : position.value.y + (height-20)
    
}
async function open(doc:any) {
   
    if(doc.isFolder) {
        if(openTimeoutFn) {
            clearTimeout(openTimeoutFn)
           
        }
        docDetail.value = null
        previewImgUrl.value = ""
        openTimeoutFn = null,
        opened.value = false
        return;
    }
    if(docDetail.value?.id === doc.id && opened.value) {
        return;
    }
    docDetail.value = doc
    if(closeTimeoutFn) {
        clearTimeout(closeTimeoutFn)
        closeTimeoutFn = null
    }
    if(opened.value) {
        await getDocPreview()
    }
    if(!openTimeoutFn){
        openTimeoutFn = setTimeout(async() => {
            if(closeTimeoutFn) return;
            await getDocPreview()
            opened.value = true
            openTimeoutFn = null
        }, openDelay)
    }
    // check mouse position and set postion
   
    
    // getDetail(idOrPath)
}
const isFocus = ref(false)
function close(){
    nextTick(() => {
        if(isFocus.value) {
            if(closeTimeoutFn) {
                clearTimeout(closeTimeoutFn);
                closeTimeoutFn = null;
            }
            return;
        }
        if(openTimeoutFn){
            console.log("clean openTimeout")
            clearTimeout(openTimeoutFn)
            openTimeoutFn = null
        }
        if(!closeTimeoutFn){
            closeTimeoutFn = setTimeout(() => {
                opened.value = false
                docDetail.value = null
                previewImgUrl.value = ""
                closeTimeoutFn = null
            }, closeDelay)
        }
    })
}
function imgError(event:any) {
    event.target.src = '/icons/file-general.svg'
}
onUnmounted(() => {
    openBus.off(open)
    closeBus.off(close)
})

defineExpose({
    open,
    close
})


</script>

<template>
    <div :class="{popPreviewContainer:true, opened}" 
        :style="`--x:${position.x}px;--y:${position.y}px;--width:${position.width}px;--height:${position.height}px`"
        @mouseleave="() => {isFocus =false; close()}"
        @mouseenter="() => {isFocus = true; console.log('enter')}"
        >
       <div v-loading="loading" class="imgContainer" >
            <template v-if="previewImgUrl">
                <img  :src="previewImgUrl" class="thumbnail" @error="imgError" @load="imgLoaded" />
            </template>
       </div>
        <!-- <BrowsePreview
            v-if="opened"
            :docDetail="docDetail"
            :docPermission="docPermission"
            :editMode="false"
            :editable="false"
            :loadAnnotations="true && allowFeature('DOC_ANNOTATION')"
            :print="false"
            :readOnly="true"
        /> -->
    </div>
</template>

<style lang="scss" scoped>
.popPreviewContainer{
    width:0px;
    height:0px;
    position: fixed;
    z-index: 10;
    pointer-events: none;
    transition: all .2s ease-in-out;
    background: var(--app-grey-1000);
    padding: 0;
    &.opened{
        left:var(--x);
        top:var(--y);
        width: var(--width);
        height: var(--height);
        pointer-events: initial;
        padding: var(--app-space-xs);
        border-radius: var(--app-border-radius-m);
        box-shadow: 0 0 10px var(--app-grey-900);
    }
}
.imgContainer{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
   
    img{
        width: 100%;
        object-fit: contain;
    }
}
</style>