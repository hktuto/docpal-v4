<script lang="ts" setup>

import { useEventListener } from '@vueuse/core'
import { clientApi } from 'api'
const dialogOpend = ref(false)
const router = useRouter()

async function handleWatermark(doc: any) {
    let mimeType:any = '';
    if(!doc.properties){
        const data = await clientApi.api.postNuxeoDocument({idOrPath:doc.id});
         mimeType = getMimeTypeFromDocument(data)
    }else{
        mimeType = getMimeTypeFromDocument(doc)
    }
    if(!mimeType || (!mimeType.includes('image') && !mimeType.includes('pdf') && !mimeType.includes('video'))){
        dialogOpend.value = true;
    }else{
        router.push({
            path: '/browse/watermark',
            query: {
                docId: doc.id
            }
        })
    }
    // doc from props
}

onMounted(() => {
    useEventListener(document, 'docWatermark', (event: any) => handleWatermark(event.detail))
})

</script>

<template>
    <div></div>
    <ElDialog v-model="dialogOpend" >
        <div class="warning">
            {{  $t('error_watermark_mimetype') }}
        </div>
    </ElDialog>
</template>
