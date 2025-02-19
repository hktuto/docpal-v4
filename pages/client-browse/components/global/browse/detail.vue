<script lang="ts" setup>
import { clientApi } from 'api'
const props = defeineProps<{
    idOrPath: string,
    showHeaderAction?: boolean,
    home: any,
}>();
const { idOrPath } = toRefs(props)

const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
const selectedItem = ref<any[]>([])
if(!tabProvider || !routerProvider) {
    throw createError('provider not found')
}
const infoOpened = ref(false)
const docDetail = ref()
const docPermission = ref()

const loading = ref(false);
async function getDetail() {
    loading.value = true
    docDetail.value = null
    docPermission.value = null
    selectedList.value = []
    const userId = useUserId()
    const { doc, permission } = await getDocDetail(idOrPath.value, userId.value);
    docDetail.value = doc
    docPermission.value = permission
    loading.value = false
}

const readerType = computed(() => {
    try {
        isPdf.value = false
        if(!docDetail.value){
          loading.value =true;
          return resolveComponent('LazyOtherPlayer');
        } 
        const mimeType = getMimeTypeFromDocument(docDetail.value);
        if(!mimeType) return resolveComponent('LazyPdfViewer'); // set to pdf for testing
        // check if it is excel
        if(canCollaboraEdit(mimeType)){
            return resolveComponent('LazyCollaboraViewer')
        }
        if(mimeType.includes('text/html')) {
            return resolveComponent('LazyHtmlViewer');
        }
        if(mimeType.includes('tiff')) {
            return resolveComponent('LazyTiffViewer');
        }
        if(mimeType.includes('image')) {
            return resolveComponent('LazyPdfViewer');
        }
        if( mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text') || mimeType.includes('photoshop') || mimeType.includes('psd') || mimeType.includes('illustrator') || mimeType.includes('text')) {
            isPdf.value = true
            return resolveComponent('LazyPdfViewer');
        }
        if(mimeType.includes('video') || mimeType.includes('audio')) {
            return resolveComponent('LazyVideoPlayer');
        }
        return resolveComponent('LazyOtherPlayer');
    } catch (error) {
        return resolveComponent('LazyOtherPlayer')
    }
});
const PreviewRef = ref()
function handleRefresh(needRefresh:boolean = true) {
    getDoc()
    if(PreviewRef.value && needRefresh) {
        if(PreviewRef.value.refresh) PreviewRef.value.refresh()
    }
}

const BrowseActionsAiDrawerRef = ref()
function handleOpenAiDrawer() {
    BrowseActionsAiDrawerRef.value.open()
}

function mobileActionsOpenedChanged(bool:boolean) {
    mobileActionOpened.value = bool
}

const detailActions = computed(()=> {
    if(!doc.value || !permission.value) return {}
    return ActionsFilter(actions, permission.value, 'showInDetail')
})

watch(idOrPath, () => {
    getDoc()
},{
    immediate:true,
})

</script>

<template>
    <div class="pageContainer" >
        {{docDetail}}
        <template v-if="docDetail">
            <div class="header">

                <div class="fileNameContainer">
                    <div class="fileName">
                        {{ docDetail.name }}
                        <el-tag v-if="docDetail.properties && docDetail.properties['file:content'] && docDetail.properties['file:content']['mime-type']" class="doc-extension" effect="dark">{{ mime.extension(doc.properties['file:content']['mime-type']) }}</el-tag>
                    </div>
                </div>
                <div class="actions">
                    <template v-if="showHeaderAction" >
                        <CollapseMenu @openedChange="mobileActionsOpenedChanged">
                            <template #default="{collapse}">
                            <template v-for="(group,key) in detailActions" :key="key">
                                <template v-for="item in group" :key="item.name">
                                <component :is="item.component" :doc="doc" :ref="(el) => itemRefs[item.name] = el" :permission="permission"  
                                    :isPdf="isPdf"
                                    @success="handleRefresh" 
                                    @delete="itemDeleted" 
                                    @openAiDrawer="handleOpenAiDrawer"
                                    :hideAfterClick="item.hideAfterClick !== false" />
                                </template>
                                <div :class="{actionDivider:true, collapse}"></div>
                            </template>
                            
                            </template>
                        </CollapseMenu>
                        
                        <BrowseActionsInfo  :doc="doc"  @click="infoOpened = !infoOpened"/>
                        <div  :class="{actionDivider:true, collapse}"></div>
                    </template>
                </div>
            </div>
            <div class="content">
                <div v-if="loading || !docDetail || !docDetail.properties" class="noSupportContainer" >
                    {{ $t('common_loading') }}
                </div>
              <template v-else>
                <div v-if="readerType" :class="{preview:true, mobileActionOpened}" >
                    <component 
                        :is="readerType" 
                        ref="PreviewRef" 
                        :docId="docDetail.id"
                        :doc="docDetail" :editMode="options.editMode"
                        fileType="NUXEO" 
                        :readonly="true" 
                        :editable="AllowTo({feature:'ReadWrite', permission })"
                        :options="{loadAnnotations:true  && allowFeature('DOC_ANNOTATION'), print: permission.print && allowFeature('DOC_PRINT'), readOnly: !AllowTo({feature:'ReadWrite', permission }) || !allowFeature('DOC_ANNOTATION')}"
                        @saved="() => handleRefresh(false)"
                    />
                    <!-- <BrowseAiPopover v-if="appStore.licenseFeatures.ASK_AI"  :doc="docDetail"></BrowseAiPopover> -->
                </div>
                <h2 v-else class="noSupportContainer" >
                    {{ $t('msg_thisFormatFileIsNotSupported') }}
                </h2>
              </template>
                <div class="info">
                    <BrowseInfo v-if="options.showInfo" :doc="doc" :commentId="options.commentId" :permission="permission" :infoOpened="infoOpened" :hidePreview="true" @close="infoOpened = false"
                        @refresh="handleRefresh"  />
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: var(--app-space-s);
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-template-columns: 1fr;
    gap: var(--app-space-s);
}
.header{
    display: grid;
    grid-template-columns: 1fr min-content;
    gap: var(--app-space-s);
    padding-inline: var(--el-component-size-small);
    padding-top: var(--app-space-s);
    color: var(--color-grey-000);
    align-content: center;
    .actions {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: calc(var(--app-space-s) / 2 );
    }
    @media(max-width: 640px) {
        .actions {
            flex-flow: row nowrap;
        }
    }
}
.content{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr min-content;
    padding: var(--el-component-size-small);
    overflow: hidden;
    position: relative;
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        .info {
            position: absolute;
            z-index: 2;
            top: var(--app-padding);
            left: var(--app-padding);
            width: calc( 100% - var(--app-padding) * 2);
            height: calc( 100% - var(--app-padding) * 2);
        }
    }
    .info {
        transition: width .2s ease-in-out;
        overflow: hidden;
    }
  
}
.noSupportContainer, :deep .noSupportContainer {
    color: var(--color-grey-000);
    display: flex;
    justify-content: center;
    align-items: center;
}
.fileNameContainer {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: calc(var(--app-padding) / 2 );
}
.fileName{
    font-size: var(--el-font-size-large);
    text-align: left;
    color: #fff !important;
    word-break: break-all;
    display: flex;
    gap: var(--app-padding);
    align-items: center;
}

:deep {
    .actionIconContainer{
        font-size: var(--icon-size);
        background: var(--color-grey-150);
        padding: 8px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        color: var(--color-grey-950);
        cursor: pointer;
        &:hover{
            background: var(--color-grey-200);
        }
    }
}
</style>