<template>
    <template v-if="!state.url" >
        <div v-if="id">{{$t('file.NoExist')}}</div>
    </template>
    <template v-else-if="state.fileType === 'application/pdf' && state.url" >
        <LazyReaderPdf v-bind="props" :no-annotation="!!annotations" ></LazyReaderPdf>
    </template>
    <template v-else-if="state.fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && state.url" >
        <LazyReaderExcel :src="state.url"></LazyReaderExcel>
    </template>
    <template v-else-if="state.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'">
        <LazyReaderDocx v-bind="props"></LazyReaderDocx>
    </template>
    <template v-else-if="state.fileType === 'application/vnd.ms-powerpoint' || state.fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'">
        <LazyReaderPpt :blob="blob" />
    </template>
    <template v-else-if="state.fileType === 'image/tiff' && state.url" >
        <LazyReaderTiff v-bind="props" ></LazyReaderTiff>
    </template>
    <template v-else-if="state.fileType === 'text/csv'" >
        <LazyReaderCsv v-bind="props"></LazyReaderCsv>
    </template>
     <template v-else-if="state.fileType.includes('text/')" >
        <LazyReaderText v-bind="props"></LazyReaderText>
    </template>
    <audio v-else-if="state.fileType === 'audio/mpeg'" controls>
        <source :src="state.url" :type="state.fileType" />
    </audio>
    <video v-else-if="state.fileType === 'video/mp4'" controls style="width: 100%">
        <source :src="state.url" :type="state.fileType" />
    </video>
    <LazyViewerPicture v-else-if="state.fileType.includes('image/')" :images="[state.url]"></LazyViewerPicture>
    <template v-else>
        <h2 class="noSupportContainer">
            {{ $t('msg_thisFormatFileIsNotSupported') }}
        </h2>
    </template>
</template>

<script lang="ts" setup>
type PdfJsOptions = {
    print: boolean,
    loadAnnotations: boolean,
    readOnly: boolean
}
const props = withDefaults(defineProps<{
    id: string,
    blob: Blob,
    name: string,
    annotations?: Map<string, any>,
    loading: Boolean,
    options: PdfJsOptions
}>(), {
    options:{
        print: false,
        loadAnnotations: false,
        readOnly: true
    }
})
const state = reactive({
    url: '',
    fileType: '',
})
function handleDownload() {
    downloadBlob(props.blob, props.name, props.blob.type)
}
watch(() => props.blob, (newBlob:Blob) => {
    if( !newBlob ) return
    state.fileType = newBlob.type
    const urlCreator = window.URL || window.webkitURL
    state.url = urlCreator.createObjectURL(newBlob)
}, { immediate: true })
defineExpose({ handleDownload })
</script>
