<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes'
import * as mime from 'mime-types'
import { clientApi } from 'api'
import { getMimeTypeFromDocument } from '#imports'
import { EventType, useEventBus } from 'eventbus'
const props = withDefaults(
  defineProps<{
    idOrPath: string
    showHeaderAction?: boolean
    showInfo: boolean
    commentId: string
    home: any
  }>(),
  {
    idOrPath: '',
    showHeaderAction: true,
    showInfo: false,
    commentId: '',
    home: ''
  }
)
const { idOrPath, commentId } = toRefs(props)
const itemRefs = ref({})
defineOptions({
  name: 'BrowseDetailDead'
})

const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)

if (!tabProvider || !routerProvider) {
  throw createError('provider not found')
}
const infoOpened = ref(false)
const docDetail = ref()
const docPermission = ref()

const loading = ref(false)
async function getDetail() {
  loading.value = true
  docDetail.value = null
  docPermission.value = null
  const userId = useUserId()
  const { doc, permission } = await getDocDetail(idOrPath.value, userId.value)
  // if doc is Folder, redirect to browse page
  if (doc.isFolder) {
    const newItem = createBrowseListPageParams({
      idOrPath: doc.id
    })
    routerProvider?.navigateTo(newItem)
    return
  }
  docDetail.value = doc
  docPermission.value = permission
  loading.value = false
  const newItem = createBrowseListPageParams({
    idOrPath: doc.parentRef
  })
  routerProvider?.addToHistory(newItem)
}
const isPdf = ref(false)
const readerType = computed(() => {
  try {
    isPdf.value = false

    if (!docDetail.value) {
      loading.value = true
      return resolveComponent('LazyOtherPlayer')
    }
    const mimeType = getMimeTypeFromDocument(docDetail.value)
    if (!mimeType) return resolveComponent('LazyPdfViewer') // set to pdf for testing
    // check if it is excel

    if (canCollaboraEdit(mimeType)) {
      return resolveComponent('LazyCollaboraViewer')
    }
    if (mimeType.includes('text/html')) {
      return resolveComponent('LazyHtmlViewer')
    }
    if (mimeType.includes('tiff')) {
      return resolveComponent('LazyTiffViewer')
    }
    if (mimeType === 'image/bmp' || mimeType === 'image/gif') {
      return resolveComponent('LazyImageViewer')
    }
    if (mimeType.includes('image')) {
      return resolveComponent('LazyPdfViewer')
    }
    if (
      mimeType.includes('pdf') ||
      mimeType.includes('document') ||
      mimeType.includes('text') ||
      mimeType.includes('photoshop') ||
      mimeType.includes('psd') ||
      mimeType.includes('illustrator') ||
      mimeType.includes('text')
    ) {
      isPdf.value = true
      return resolveComponent('LazyPdfViewer')
    }
    if (mimeType.includes('video') || mimeType.includes('audio')) {
      return resolveComponent('LazyVideoPlayer')
    }
    return resolveComponent('LazyOtherPlayer')
  } catch (error) {
    console.log('canCollaboraEdit', error)
    return resolveComponent('LazyOtherPlayer')
  }
})
function closePreview({ detail }: any) {
  if (!detail) return
  if (detail.id === docDetail.value.id) {
    const newItem = createBrowseListPageParams({
      idOrPath: docDetail.value.parentRef
    })
    routerProvider?.navigateTo(newItem)
  }
}
function itemDeleted() {
  const newItem = createBrowseListPageParams({
    idOrPath: docDetail.value.parentRef
  })
  routerProvider?.navigateTo(newItem)
}
const PreviewRef = ref()
function handleRefresh(needRefresh: boolean = true) {
  getDetail()
  if (PreviewRef.value && needRefresh) {
    if (PreviewRef.value.refresh) PreviewRef.value.refresh()
  }
}

const BrowseActionsAiDrawerRef = ref()
function handleOpenAiDrawer() {
  BrowseActionsAiDrawerRef.value.open()
}

function mobileActionsOpenedChanged(bool: boolean) {
  mobileActionOpened.value = bool
}

const detailActions = computed(() => {
  if (!docDetail.value || !docPermission.value) return {}
  return ActionsFilter(actions, docPermission.value, 'showInDetail')
})

function goParent() {
  const newItem = createBrowseListPageParams({
    idOrPath: docDetail.value.parentRef
  })
  routerProvider?.navigateTo(newItem, false, true)
}

useEventListener(document, 'closeFilePreview', closePreview)

function switchFile(newFileId: string) {
  routerProvider?.updateProps({ idOrPath: newFileId })
}

watch(
  [idOrPath, commentId],
  (newVal, oldVal) => {
    getDetail()
    if (newVal && newVal[1]) {
      infoOpened.value = true
    } else if (oldVal && oldVal[1]) {
      infoOpened.value = false
    }
  },
  {
    immediate: true
  }
)

const minSize = ref(20)
const pageContainerRef = ref()
function calMinWidth() {
  // panel size is 280px, check the percentage of window width
  const pageContainer = pageContainerRef.value?.getBoundingClientRect() as any
  minSize.value = Number(((400 / pageContainer.width) * 100).toFixed(0))
}
const bus = useEventBus(EventType.FILE_NEED_REFRESH)
bus.on(({ relatedIdOrPath, highlightIdOrPath }: any) => {
  if (relatedIdOrPath === idOrPath.value) getDetail()
})

onMounted(calMinWidth)

useEventListener(window, 'resize', calMinWidth)
</script>

<template>
  <div ref="pageContainerRef" class="pageContainer">
    <splitpanes>
      <Pane>
        <div v-if="docDetail" class="detailContainer">
          <div class="header">
            <div class="fileNameContainer">
              <div class="fileName">
                <ElTooltip :content="$t('common_back')" placement="top">
                  <Icon name="tabler:arrow-back" @click="goParent" />
                </ElTooltip>
                <BrowseDetailFileNamePicker :docId="docDetail.id" :title="docDetail.name" :parentRef="docDetail.parentRef" @itemClick="switchFile" />
                <el-tag
                  v-if="docDetail.properties && docDetail.properties['file:content'] && docDetail.properties['file:content']['mime-type']"
                  class="doc-extension"
                  effect="dark"
                  >{{ mime.extension(docDetail.properties['file:content']['mime-type']) }}</el-tag
                >
              </div>
            </div>
            <div class="actions">
              <template v-if="showHeaderAction">
                <CollapseMenu @openedChange="mobileActionsOpenedChanged">
                  <template #default="{ collapse }">
                    <template v-for="(group, key) in detailActions" :key="key">
                      <template v-for="item in group" :key="item.name">
                        <component
                          :is="item.component"
                          :doc="docDetail"
                          :ref="(el) => (itemRefs[item.name] = el)"
                          :permission="docPermission"
                          :isPdf="isPdf"
                          @success="handleRefresh"
                          @delete="itemDeleted"
                          @openAiDrawer="handleOpenAiDrawer"
                          :hideAfterClick="item.hideAfterClick !== false"
                        />
                      </template>
                      <div :class="{ actionDivider: true, collapse }"></div>
                    </template>
                  </template>
                </CollapseMenu>

                <BrowseActionsInfo :doc="docDetail" :permission="docPermission" @itemClicked="infoOpened = !infoOpened" />
                <div :class="{ actionDivider: true, collapse }"></div>
              </template>
            </div>
          </div>
          <div class="content">
            <BrowsePreview
              :docDetail="docDetail"
              :docPermission="docPermission"
              :editMode="editMode"
              :editable="AllowTo({ feature: 'ReadWrite', permission: docPermission })"
              :loadAnnotations="true && allowFeature('DOC_ANNOTATION')"
              :print="docPermission.print && allowFeature('DOC_PRINT')"
              :readOnly="!AllowTo({ feature: 'ReadWrite', docPermission }) || !allowFeature('DOC_ANNOTATION')"
            />
            <!-- <div v-if="loading || !docDetail || !docDetail.properties" class="noSupportContainer" >
                        {{ $t('common_loading') }}
                    </div>
                <template v-else>
                    <div v-if="readerType" :class="{preview:true, mobileActionOpened}" >
                        <component 
                            :is="readerType" 
                            ref="PreviewRef" 
                            :docId="docDetail.id"
                            :doc="docDetail" :editMode="editMode"
                            fileType="NUXEO" 
                            :readonly="true" 
                            :editable="AllowTo({feature:'ReadWrite', permission:docPermission })"
                            :options="{loadAnnotations:true  && allowFeature('DOC_ANNOTATION'), print: docPermission.print && allowFeature('DOC_PRINT'), readOnly: !AllowTo({feature:'ReadWrite', docPermission }) || !allowFeature('DOC_ANNOTATION')}"
                            @saved="() => handleRefresh(false)"
                        /> 
                        <BrowseAiPopover v-if="appStore.licenseFeatures.ASK_AI"  :doc="docDetail"></BrowseAiPopover>
                    </div> 
                    <h2 v-else class="noSupportContainer" >
                        {{ $t('msg_thisFormatFileIsNotSupported') }}
                    </h2> 
                </template> -->
            <div class="info">
              <BrowseInfo
                v-if="showInfo"
                :doc="docDetail"
                :commentId="commentId"
                :permission="docPermission"
                :infoOpened="infoOpened"
                :hidePreview="true"
                @close="infoOpened = false"
                @refresh="handleRefresh"
              />
            </div>
          </div>
        </div>
      </Pane>
      <Pane v-if="infoOpened" :min-size="minSize" :size="minSize">
        <BrowseInfo
          :doc="docDetail"
          :permission="docPermission"
          :infoOpened="infoOpened"
          :commentId="commentId"
          @close="infoOpened = false"
          @refresh="handleRefresh"
        />
      </Pane>
    </splitpanes>
  </div>
</template>

<style lang="scss" scoped>
.pageContainer {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: var(--app-space-s);
}
.detailContainer {
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.header {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: var(--app-space-s);
  color: var(--app-grey-000);
  align-content: center;
  .actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: calc(var(--app-space-s) / 2);
  }
  @media (max-width: 640px) {
    .actions {
      flex-flow: row nowrap;
    }
  }
}
.content {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr min-content;
  // overflow: hidden;
  position: relative;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    .info {
      position: absolute;
      z-index: 2;
      top: var(--app-space-xs);
      left: var(--app-space-xs);
      width: calc(100% - var(--app-space-xs) * 2);
      height: calc(100% - var(--app-space-xs) * 2);
    }
  }
  .info {
    transition: width 0.2s ease-in-out;
    overflow: hidden;
  }
}
.noSupportContainer,
:deep .noSupportContainer {
  color: var(--app-grey-000);
  display: flex;
  justify-content: center;
  align-items: center;
}
.fileNameContainer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: calc(var(--app-space-xs) / 2);
}
.fileName {
  font-size: var(--el-font-size-large);
  text-align: left;
  word-break: break-all;
  display: flex;
  gap: var(--app-space-xs);
  align-items: center;
}

:deep {
  .actionIconContainer {
    font-size: var(--icon-size);
    background: var(--app-grey-150);
    padding: 8px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--app-grey-950);
    cursor: pointer;
    &:hover {
      background: var(--app-grey-200);
    }
  }
}
</style>
