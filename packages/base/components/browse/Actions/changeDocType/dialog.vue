<script lang="ts" setup>
import {useEventListener} from '@vueuse/core'
import {clientApi} from 'api'

const props = defineProps<{
  doc: any,
}>()
const emits = defineEmits(['success'])

const {formatDate} = useTime()
const dialogOpened = ref(false)
const route = useRoute()

const state = reactive<any>({
  loading: false,
  docPath: '',
  doc: {},
  dispalyMeta: []
})
const MetaFormRef = ref()

async function iconClickHandler(doc: any) {
  dialogOpened.value = true
  state.docPath = doc.path
  const {data: docData} = await clientApi.api.postNuxeoDocument({idOrPath: doc.id})
  state.doc = docData
  // await clientApi.api.getTypesActive()
  const {data} = await clientApi.api.postTypesMetadatas({
    idOrPath: doc.type || doc.documentType || doc.docpalType
  })
  state.dispalyMeta = data
  await MetaFormRef.value.init(doc.type || doc.documentType || doc.docpalType, {
    isFolder: doc.isFolder
  })
  MetaFormRef.value.setData({...state.doc.properties, documentType: doc.type || doc.documentType || doc.docpalType})
  // open upload dialog
  setTimeout(() => {
    handleReset()
  })

}

async function handleSubmit() {
  try {
    const metaFormData = await MetaFormRef.value.getData()
    if (!metaFormData) return
    state.loading = true
    const params = {
      idOrPath: state.doc.id,
      oldDocPalType: state.doc.type,
      type: metaFormData.documentType,
      properties: metaFormData,
      // idOrPath: `${parentPath}/new Folder${timestamp}`,
    }
    delete params.properties.documentType
    const res = await clientApi.api.patchNuxeoDocumentChangeType(params)
    dialogOpened.value = false
    if (state.doc.id !== route.query.docId) {
      setTimeout(() => {
        const ev = new CustomEvent('docActionRefresh', {detail: props.doc})
        document.dispatchEvent(ev)
      })
    } else {
      emits('success', state.doc)
    }
  } catch (error) {
  }
  setTimeout(() => {
    state.loading = false
  }, 500)
}

function getVersion(doc) {
  const major_version = doc?.properties?.['uid:major_version'] || 0
  const minor_version = doc?.properties?.['uid:minor_version'] || 0
  const plus = doc.isCheckedOut ? '+' : ''
  return major_version + '.' + minor_version + plus
}

function getMetaValue(row) {
  if (!state.doc || !state.doc.properties || !state.doc.properties[row.metaData]) return ''
  switch (row.dataType) {
    case 'date':
      return formatDate(state.doc.properties[row.metaData])
  }

  return state.doc.properties[row.metaData]
}

function handleReset() {

}

onMounted(async () => {
  useEventListener(document, 'docActionChangeDocType', (event: any) => iconClickHandler(event.detail))
})
defineExpose({iconClickHandler})
</script>

<template>
  <el-dialog class="scroll-dialog" v-model="dialogOpened" append-to-body
             :title="`${$t('filePopover_changeDocType')} ${state.doc.name}`"
             :close-on-click-modal="false">
    <main>
      <div v-if="state.doc && state.doc.properties">
        <BrowseActionsChangeDocTypeCopyItem :label="$t('info_type')" :value="state.doc.type" :noCopy="true"/>
        <BrowseActionsChangeDocTypeCopyItem :label="$t('info_version')" :value="getVersion(state.doc)"/>
        <BrowseActionsChangeDocTypeCopyItem
          v-if="state.doc && state.doc.properties && state.doc.properties['file:content']"
          :label="$t('docInfo.fileExtension')" :value="state.doc?.properties['file:content']['mime-type']"/>
        <BrowseActionsChangeDocTypeCopyItem v-else :label="$t('docInfo.fileExtension')" value="-"/>
        <BrowseActionsChangeDocTypeCopyItem :label="$t('info_modified')" :value="formatDate(state.doc.modifiedDate)"/>
        <BrowseActionsChangeDocTypeCopyItem :label="$t('info_created')" :value="formatDate(state.doc.createdDate)"/>
        <BrowseActionsChangeDocTypeCopyItem :label="$t('info_by')" :value="state.doc.createdBy"/>
        <template v-if="state.dispalyMeta && state.dispalyMeta.length > 0 && state.doc.properties">
          <el-divider></el-divider>
          <BrowseActionsChangeDocTypeCopyItem v-for="item in state.dispalyMeta" :label="$t(item.metaData)"
                                              :value="getMetaValue(item)"/>
        </template>
      </div>
      <div class="border"></div>
      <MetaRenderForm2 ref="MetaFormRef" mode="changeDocType"></MetaRenderForm2>
    </main>
    <template #footer>
      <el-button id="Browse__ChangeDocumentType__Submit" :loading="state.loading" type="primary" @click="handleSubmit">
        {{ $t('submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: 30% min-content 1fr;
  gap: var(--app-space-xs);

  .border {
    border-right: 1px solid #ddd;
  }
}
</style>