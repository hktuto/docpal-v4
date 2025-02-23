<template>
     <div class="pageContainer">
        <div class="flex__50 padding">
            <VersionHeader :doc="oldVersion" :canRestore="true" />
            <!-- <VersionHerader :doc="oldVersion" </VersionHerader> -->
            <VersionHeader :doc="newVersion"></VersionHeader>
          </div>
            
         <main v-if="newVersion">
          <!-- <Collapse v-model="activeNames">
              <CollapseItem title="info" name="1">
              <InfoDiff ref="infoDiff" :newVersion="newVersion" :oldVersion="oldVersion"></InfoDiff>
              </CollapseItem>
          </Collapse> -->
            <h3 class="">{{$t('common_info')}}</h3>
            <InfoDiff ref="infoDiff" :newVersion="newVersion" :oldVersion="oldVersion"></InfoDiff>
            <h3 class="">{{$t('common_file')}}</h3>
            <div class="flex__50 viewersContainer">
                <Reader ref="ReaderRef" v-bind="state.previewOldFile" ></Reader>
                <Reader ref="ReaderRef" v-bind="state.previewNewFile" ></Reader>
                <!-- <PdfViewer :doc="oldVersion"  /> -->
                <!-- <PdfViewer :doc="newVersion"  /> -->
            </div>
          </main>
     </div>
</template>


<script lang="ts" setup>
import {clientApi } from 'api'

const newVersion = ref<Document>()
const oldVersion = ref<Document>()
const activeNames = ref(['1'])
const infoDiff = ref()

const routerProvider = inject(MenuRouterKey)

const props = defineProps<{
    id: string,
    oldVersion: string
}>()

const state = reactive({
    title: '',
    backPath: '/browse',
    previewOldFile: {
      blob: null,
      name: '',
      id: '',
      loading: false,
      options: {
          noDownload: true,
          print: false,
          loadAnnotations: false,
          readOnly: true
      }
    },
    previewNewFile: {
      blob: null,
      name: '',
      id: '',
      loading: false,
      options: {
          noDownload: true,
          print: false,
          loadAnnotations: false,
          readOnly: true
      }
    }
})
const init = async(path) => {
    const idOrPath = path
}

const close = () => {
  const newItem = createDetailPageParams({
    idOrPath: newVersion.value.path,
    docName: newVersion.value.name,
    showHeaderAction: true,
    ...newVersion.value
  })
  routerProvider?.navigateTo(newItem)
}
async function getPreviewFile (previewFile, id) {
    previewFile.loading = true
    try {
        previewFile.blob = await clientApi.api.postNuxeoDocumentPreview(id,{
          format: 'blob',
          timeout: 0,
          headers: {
              key: 'preview'
          }
        })
    } catch (error) {
    }
    previewFile.loading = false
}
onMounted( async() => {
    init(props.id as string);
    newVersion.value = await clientApi.api.postNuxeoDocument({ idOrPath: props.id as string }).then(res => res.data)
    state.title = newVersion.value.name
    state.backPath = `/browse/?path=${newVersion.value.path}`
    oldVersion.value = await clientApi.api.postNuxeoGetspecificversion({
        idOrPath: props.id,
        versionNum: props.oldVersion
    }).then(res => res.data)
    getPreviewFile(state.previewNewFile, newVersion.value.id)
    getPreviewFile(state.previewOldFile, oldVersion.value.id)
    nextTick(() => {
        infoDiff.value.handleData()
    })
})
</script>

<style lang="scss" setup>
.pageContainer{
  width: 100%;
  height: 100%;
  padding: var(--app-space-xs);

  position: relative;
  display: grid;
  grid-template-rows: min-content 1fr;
}
.viewersContainer{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  height: 100%;
  flex: 1 0 auto;
}
h3{
  margin: 0;
}
main {
  overflow: auto;
  display: flex;
    flex-flow: column nowrap;
    height: 100%;
}
.code-diff-view{
      flex: 1 0 auto;
}
.i__back {
  color: var(--color-grey-400);
  font-size: 1.2rem;
  cursor: pointer;
}
.flex__50 {
  display: flex;
  &>div {
    width: 48%;
    margin-right: 2%;
  }
  :deep .pdfContainer {
    height: calc(100vh - 170px);
    min-height: 300px;
  }
  :deep .preview__container {
    display: unset;
  }
}
</style>
